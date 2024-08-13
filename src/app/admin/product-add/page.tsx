"use client";

import React from "react";
import { observer } from "mobx-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import ProductStoreContext from "@/store/ProductStore"; // Adjust the path as needed

// Validation schema
const validationSchema = Yup.object({
    name: Yup.string().required("Required"),
    price: Yup.number().required("Required").min(0, "Price must be greater than zero"),
    description: Yup.string().required("Required"),
    category: Yup.string().required("Required"),
    image: Yup.string().required("Required"),
    stock: Yup.number().required("Required").min(0, "Stock must be greater than zero"),
});

const AddProductPage: React.FC = () => {
    const ProductStore = React.useContext(ProductStoreContext);

    // Formik hook
    const formik = useFormik({
        initialValues: {
            name: "",
            price: 0,
            description: "",
            category: "",
            image: "",
            stock: 0,
        },
        validationSchema,
        onSubmit: async (values) => {
            if (ProductStore.isProductDuplicate(values.name)) {
                formik.setFieldError("name", "Product with this name already exists.");
                return;
            }

            try {
                await ProductStore.addProduct({
                    ...values,
                    ratings: [],
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString(),
                    recommended: false
                });
                // Reset the form or redirect to another page
                formik.resetForm();
            } catch (err) {
                console.error("Failed to add product", err);
            }
        }
    });

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">Add New Product</h1>
            <form onSubmit={formik.handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${formik.touched.name && formik.errors.name ? "border-red-500" : ""}`}
                    />
                    {formik.touched.name && formik.errors.name && <p className="text-red-500 text-sm">{formik.errors.name}</p>}
                </div>
                <div>
                    <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price:</label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        value={formik.values.price}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${formik.touched.price && formik.errors.price ? "border-red-500" : ""}`}
                    />
                    {formik.touched.price && formik.errors.price && <p className="text-red-500 text-sm">{formik.errors.price}</p>}
                </div>
                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description:</label>
                    <textarea
                        id="description"
                        name="description"
                        value={formik.values.description}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${formik.touched.description && formik.errors.description ? "border-red-500" : ""}`}
                    />
                    {formik.touched.description && formik.errors.description && <p className="text-red-500 text-sm">{formik.errors.description}</p>}
                </div>
                <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category:</label>
                    <input
                        type="text"
                        id="category"
                        name="category"
                        value={formik.values.category}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${formik.touched.category && formik.errors.category ? "border-red-500" : ""}`}
                    />
                    {formik.touched.category && formik.errors.category && <p className="text-red-500 text-sm">{formik.errors.category}</p>}
                </div>
                <div>
                    <label htmlFor="image" className="block text-sm font-medium text-gray-700">Image URL:</label>
                    <input
                        type="text"
                        id="image"
                        name="image"
                        value={formik.values.image}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${formik.touched.image && formik.errors.image ? "border-red-500" : ""}`}
                    />
                    {formik.touched.image && formik.errors.image && <p className="text-red-500 text-sm">{formik.errors.image}</p>}
                </div>
                <div>
                    <label htmlFor="stock" className="block text-sm font-medium text-gray-700">Stock:</label>
                    <input
                        type="number"
                        id="stock"
                        name="stock"
                        value={formik.values.stock}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${formik.touched.stock && formik.errors.stock ? "border-red-500" : ""}`}
                    />
                    {formik.touched.stock && formik.errors.stock && <p className="text-red-500 text-sm">{formik.errors.stock}</p>}
                </div>
                <button
                    type="submit"
                    className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Add Product
                </button>
            </form>
        </div>
    );
};

export default observer(AddProductPage);
