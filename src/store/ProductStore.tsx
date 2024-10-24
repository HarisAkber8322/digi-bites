"use client";
import { makeAutoObservable, runInAction } from "mobx";
import axios from "axios";
import React from "react";
import { useRouter } from "next/router";

export interface Ratings {
  user_id: string | undefined;
  rating: number;
}

export interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  image: string;
  stock: number;
  ratings: Array<{
    user_id: string;
    rating: number;
  }>;
  created_at: string; // or Date if you prefer
  updated_at: string; // or Date if you prefer
  average_rating?: number; // Optional field, as it might be computed
  ratings_count?: number;
  recommended: false;
}

class ProductStore {
  favorites: any;
  toggleFavorite(product: Product) {
    throw new Error("Method not implemented.");
  }
  products: Product[] = [];
  totalCount: number = 0;
  totalPages: number = 0;
  currentPage: number = 1;
  loading: boolean = false;
  error: string | null = null;
  router: ReturnType<typeof useRouter> | null = null;
  product: Product | null | undefined;
  constructor() {
    makeAutoObservable(this);
    this.fetchProducts();
  }
  async addProduct(product: Omit<Product, "_id">) {
    this.loading = true;
    this.error = null;

    try {
      const response = await axios.post(
        "http://localhost:3001/api/products",
        product,
      );

      const newProduct = response.data as Product;
      // Add the new product to the store
      this.products.push(newProduct);

      if (response.status === 201) {
        this.changePage("/admin/product-listing");
      }
    } catch (err) {
      console.error("Error adding product:", err);
      this.error = "Failed to add product";
    } finally {
      this.loading = false;
    }
  }

  isProductDuplicate(name: string): boolean {
    return this.products.some(
      (product) => product.name.toLowerCase() === name.toLowerCase(),
    );
  }

  async fetchProducts(
    page: number = 1,
    query: string = "",
    sortOrder: "asc" | "desc" = "asc",
  ) {
    this.loading = true;
    this.error = null;

    try {
      const response = await axios.get(`http://localhost:3001/api/products`, {
        params: {
          page,
          q: query,
          sort: sortOrder,
        },
      });

      this.products = response.data.products;
      this.totalCount = response.data.totalCount;
      this.totalPages = response.data.totalPages;
      this.currentPage = page;
    } catch (err) {
      console.error("Error fetching products:", err);
      this.error = "Failed to fetch products";
    } finally {
      this.loading = false;
    }
  }

  async fetchProductById(productId: string): Promise<Product | null> {
    this.loading = true;
    this.error = null;

    try {
      const response = await axios.get(
        `http://localhost:3001/api/products/${productId}`,
      );
      const product = response.data as Product;

      // Calculate average rating if not included in the response
      if (product.ratings.length > 0) {
        const totalRating = product.ratings.reduce(
          (acc, rating) => acc + rating.rating,
          0,
        );
        product.average_rating = totalRating / product.ratings.length;
      } else {
        product.average_rating = 0;
      }

      // Update the product list
      const index = this.products.findIndex((p) => p._id === productId);
      if (index > -1) {
        this.products[index] = product;
      } else {
        this.products.push(product);
      }

      return product;
    } catch (err) {
      console.error("Error fetching product:", err);
      this.error = "Failed to fetch product";
      return null;
    } finally {
      this.loading = false;
    }
  }

  changePage(url: string) {
    // Implement page redirection logic here, e.g., using `window.location` or a routing library
    window.location.href = url;
  }
  async deleteProduct(productId: string) {
    try {
      const response = await axios.delete(
        `http://localhost:3001/api/products/${productId}`,
      );

      if (response.status === 200) {
        // Directly update the observable state
        this.products = this.products.filter(
          (product) => product._id !== productId,
        );
        console.log("Product deleted successfully");
      } else {
        console.error("Failed to delete product");
      }
    } catch (err) {
      console.error("Error deleting product:", err);
    }
  }
  async toggleRecommended(productId: string) {
    try {
      const response = await axios.patch(
        `http://localhost:3001/api/products/${productId}/recommended`,
      );
      if (response.status === 200) {
        const updatedProduct = response.data.product;
        console.log("Updated Product from Server:", updatedProduct); // Debug log
        runInAction(() => {
          this.products = this.products.map((product) =>
            product._id === productId ? updatedProduct : product,
          );
        });
        console.log("Product recommendation status updated successfully");
      } else {
        console.error("Failed to update product recommendation status");
      }
    } catch (err) {
      console.error("Error updating product recommendation status:", err);
    }
  }
  async fetchProductBySlug(slug: string) {
    try {
      const response = await axios.get(`/api/products/slug/${slug}`);
      runInAction(() => {
        this.product = response.data;
      });
    } catch (error) {
      console.error("Error fetching product by slug:", error);
      runInAction(() => {
        this.product = null;
      });
    }
  }
}

export const productStore = new ProductStore();
const ProductStoreContext = React.createContext(productStore);

const ProductProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <ProductStoreContext.Provider value={productStore}>
      {children}
    </ProductStoreContext.Provider>
  );
};

export default ProductStoreContext;
export { ProductProvider };
