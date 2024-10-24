import { GetServerSideProps } from "next";
import axios from "axios";
import { Product } from "@/store/ProductStore"; // Adjust the import path as needed

interface ProductPageProps {
  product: Product | null;
  error?: string; // Add an error prop to handle errors
}

const ProductPage: React.FC<ProductPageProps> = ({ product, error }) => {
  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>{product.name}</h1>
      <img src={product.image} alt={product.name} style={{ width: "200px" }} />
      <p>
        <strong>Price:</strong> ${product.price}
      </p>
      <p>
        <strong>Description:</strong> {product.description}
      </p>
      <p>
        <strong>Recommended:</strong> {product.recommended ? "Yes" : "No"}
      </p>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<ProductPageProps> = async (
  context,
) => {
  const { slug } = context.query;

  if (!slug || typeof slug !== "string") {
    return {
      props: {
        product: null,
        error: "Invalid slug",
      },
    };
  }

  try {
    const apiUrl = process.env.API_URL || "http://localhost:3001"; // Use environment variable for API URL
    const response = await axios.get(`${apiUrl}/api/products/slug/${slug}`);
    const product = response.data as Product;

    return {
      props: {
        product,
      },
    };
  } catch (error) {
    console.error("Error fetching product by slug:", error);
    return {
      props: {
        product: null,
        error: "Product not found or internal server error",
      },
    };
  }
};

export default ProductPage;
