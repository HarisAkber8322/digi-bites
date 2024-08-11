"use client";
import { makeAutoObservable } from "mobx";
import axios from "axios";
import React from "react";

export interface Review {
    user_id: string | undefined;
    rating: number;
    review: string;
}
export interface Favorite {
    user_id: string | undefined;
    favorite: boolean;
}
export interface Product {
    _id: string;
    name: string;
    price: number;
    description: string;
    category: string;
    image: string;
    stock: number;
    reviews: Review[];
    average_rating: number;
    ratings_count: number;
    created_at: Date;
    updated_at: Date;
}

class ProductStore {
    products: Product[] = [];
    totalCount: number = 0;
    totalPages: number = 0;
    currentPage: number = 1;
    loading: boolean = false;
    error: string | null = null;
    constructor() {
        makeAutoObservable(this);
        this.fetchProducts();
        // this.fetchUserFavorites();
    }

    async fetchProducts(page: number = 1, query: string = "", sortOrder: "asc" | "desc" = "asc") {
        this.loading = true;
        this.error = null;

        try {
            const response = await axios.get(`http://localhost:3001/api/products`, {
                params: {
                    page,
                    q: query,
                    sort: sortOrder
                }
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
            const response = await axios.get(`http://localhost:3001/api/products/${productId}`);
            const product = response.data as Product;

            const index = this.products.findIndex(p => p._id === productId);
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

    async addReview(productId: string, review: Review) {
        this.loading = true;
        this.error = null;
        try {
            const response = await axios.post(`http://localhost:3001/api/products/${productId}/reviews`, review);

            const index = this.products.findIndex(p => p._id === productId);
            if (index > -1) {
                this.products[index].reviews.push(response.data);
                this.updateProductRating(productId);
            }
        } catch (err) {
            console.error("Error adding review:", err);
            this.error = "Failed to add review";
        } finally {
            this.loading = false;
        }
    }

    private updateProductRating(productId: string) {
        const product = this.products.find(p => p._id === productId);
        if (product) {
            const totalRatings = product.reviews.reduce((sum, review) => sum + review.rating, 0);
            const averageRating = product.reviews.length > 0 ? totalRatings / product.reviews.length : 0;

            product.average_rating = averageRating;
            product.ratings_count = product.reviews.length;

            axios.put(`http://localhost:3001/api/products/${productId}`, {
                average_rating: averageRating,
                ratings_count: product.reviews.length
            }).catch(err => {
                console.error("Error updating product rating:", err);
            });
        }
    }
}

const productStore = new ProductStore();
const ProductStoreContext = React.createContext(productStore);

const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <ProductStoreContext.Provider value={productStore}>
            {children}
        </ProductStoreContext.Provider>
    );
};

export default ProductStoreContext;
export { ProductProvider };
