"use client"; // Add this line to indicate it's a Client Component

import React, { useState, useContext } from "react";
import { observer } from "mobx-react-lite";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import ProductStoreContext from "@/store/ProductStore";

const AddProductComponent = () => {
  const productStore = useContext(ProductStoreContext);

  const initialValues = {
    name: "",
    price: 0,
    description: "",
    category: "",
    image: "",
    stock: 0,
    addons: "", // Include the add-ons field
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Required"),
    price: Yup.number()
      .required("Required")
      .min(0, "Price must be greater than zero"),
    description: Yup.string().required("Required"),
    category: Yup.string().required("Required"),
    image: Yup.string().url("Must be a valid URL").required("Required"),
    stock: Yup.number()
      .required("Required")
      .min(0, "Stock must be greater than zero"),
    addons: Yup.string().required("Required"),
  });

  const handleSubmit = async (
    values: {
      name: string;
      price: number;
      description: string;
      category: string;
      image: string;
      stock: number;
      addons: string;
    },
    { setSubmitting, resetForm }: any,
  ) => {
    console.log("Form Submitted with values:", values); // Debugging output

    // Check for duplicates
    if (productStore.isProductDuplicate(values.name)) {
      alert("Product with this name already exists.");
      setSubmitting(false);
      return;
    }

    try {
      await productStore.addProduct({
        name: values.name,
        price: values.price,
        description: values.description,
        category: values.category,
        image: values.image,
        stock: values.stock,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        ratings: [], // Empty array for ratings
        recommended: false,
        average_rating: 0,
        ratings_count: 0
      });
      resetForm();
    } catch (error) {
      console.error("Failed to Add Product:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Add New Product</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-4">
            <div>
              {/* Name */}
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <Field
                  type="text"
                  id="name"
                  name="name"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-themeYellow focus:border-themeYellow sm:text-sm"
                />
                <ErrorMessage name="name" component="p" className="text-red-500 text-sm" />
              </div>

              {/* Price */}
              <div className="mb-4">
                <label
                  htmlFor="price"
                  className="block text-sm font-medium text-gray-700"
                >
                  Price
                </label>
                <Field
                  type="number"
                  id="price"
                  name="price"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-themeYellow focus:border-themeYellow sm:text-sm"
                />
                <ErrorMessage name="price" component="p" className="text-red-500 text-sm" />
              </div>

              {/* Description */}
              <div className="mb-4">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700"
                >
                  Description
                </label>
                <Field
                  as="textarea"
                  id="description"
                  name="description"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-themeYellow focus:border-themeYellow sm:text-sm"
                />
                <ErrorMessage name="description" component="p" className="text-red-500 text-sm" />
              </div>

              {/* Category */}
              <div className="mb-4">
                <label
                  htmlFor="category"
                  className="block text-sm font-medium text-gray-700"
                >
                  Category
                </label>
                <Field
                  as="select"
                  id="category"
                  name="category"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-themeYellow focus:border-themeYellow sm:text-sm"
                >
                  <option value="">Select Category</option>
                  <option value="Pizza">Pizza</option>
                  <option value="Sandwich">Sandwich</option>
                  <option value="Burger">Burger</option>
                  <option value="Biryani">Biryani</option>
                  <option value="Drinks">Drinks</option>
                </Field>
                <ErrorMessage name="category" component="p" className="text-red-500 text-sm" />
              </div>

              {/* Image URL */}
              <div className="mb-4">
                <label
                  htmlFor="image"
                  className="block text-sm font-medium text-gray-700"
                >
                  Image URL
                </label>
                <Field
                  type="text"
                  id="image"
                  name="image"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-themeYellow focus:border-themeYellow sm:text-sm"
                />
                <ErrorMessage name="image" component="p" className="text-red-500 text-sm" />
              </div>

              {/* Stock */}
              <div className="mb-4">
                <label
                  htmlFor="stock"
                  className="block text-sm font-medium text-gray-700"
                >
                  Stock
                </label>
                <Field
                  type="number"
                  id="stock"
                  name="stock"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-themeYellow focus:border-themeYellow sm:text-sm"
                />
                <ErrorMessage name="stock" component="p" className="text-red-500 text-sm" />
              </div>

              {/* Add-ons */}
              <div className="mb-4">
                <label
                  htmlFor="addons"
                  className="block text-sm font-medium text-gray-700"
                >
                  Add-ons
                </label>
                <Field
                  type="text"
                  id="addons"
                  name="addons"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-themeYellow focus:border-themeYellow sm:text-sm"
                />
                <ErrorMessage name="addons" component="p" className="text-red-500 text-sm" />
              </div>

              {/* Submit and Reset Buttons */}
              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="reset"
                  className="bg-gray-500 text-white py-2 px-4 rounded-md shadow-sm hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-themeYellow focus:ring-offset-2"
                >
                  Reset
                </button>
                <button
                  type="submit"
                  className="bg-themeYellow text-white py-2 px-4 rounded-md shadow-sm hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-themeYellow focus:ring-offset-2"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Adding..." : "Add Product"}
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default observer(AddProductComponent);
