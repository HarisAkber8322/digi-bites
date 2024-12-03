"use client";
import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import ProductStoreContext from "../../../store/ProductStore";

const AddProductComponent = () => {
  const productStore = useContext(ProductStoreContext);

  // Initial Values
  const initialValues = {
    name: "",
    price: 0,
    category: "",
    image: "",
  };

  // Validation Schema
  const validationSchema = Yup.object({
    name: Yup.string().required("Required"),
    price: Yup.number()
      .required("Required")
      .min(0, "Price must be greater than zero"),
    category: Yup.string().required("Required"),
    // image: Yup.string()
    //   .url("Must be a valid URL")
    //   .required("Required"),
  });

  // Form Submission Handler
  const handleSubmit = async (
    values: {
      name: string;
      price: number;
      category: string;
      image: string;
    },
    { setSubmitting, resetForm }: any
  ) => {
    console.log("Form Submitted with values:", values);

    // Check for duplicate product
    if (productStore.isProductDuplicate(values.name)) {
      alert("Product with this name already exists.");
      setSubmitting(false);
      return;
    }

    try {
      await productStore.addProduct({
        name: values.name,
        price: values.price,
        category: values.category,
        image: values.image,
        created_at: "",
        updated_at: ""
      });
      resetForm();
    } catch (error) {
      console.error("Failed to Add Product:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-6 bg-white rounded-lg">
      <h1 className="text-2xl font-bold mb-6">Add New Product</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-4">
            {/* Product Name */}
            <div className="flex flex-col">
              <label className="font-semibold">Product Name</label>
              <Field
                type="text"
                name="name"
                className="mt-1 block w-full px-3 py-2 border border-lightGray rounded-md shadow-sm focus:outline-none focus:themeOrange focus:border-themeOrange sm:text-sm"
              />
              <ErrorMessage
                name="name"
                component="div"
                className="text-themeYellow"
              />
            </div>

            {/* Price */}
            <div className="flex flex-col">
              <label className="font-semibold">Price</label>
              <Field
                type="number"
                name="price"
                className="mt-1 block w-full px-3 py-2 border border-lightGray rounded-md shadow-sm focus:outline-none focus:themeOrange focus:border-themeOrange sm:text-sm"
              />
              <ErrorMessage
                name="price"
                component="div"
                className="text-themeYellow"
              />
            </div>

            {/* Category */}
            <div className="flex flex-col">
              <label className="font-semibold">Category</label>
              <Field
                as="select"
                name="category"
                className="mt-1 block w-full px-3 py-2 border border-lightGray rounded-md shadow-sm focus:outline-none focus:themeOrange focus:border-themeOrange sm:text-sm"
              >
                <option value="">Select Category</option>
                <option value="Pizza">Pizza</option>
                <option value="Sandwich">Sandwich</option>
                <option value="Burger">Burger</option>
                <option value="Biryani">Biryani</option>
                <option value="Drinks">Drinks</option>
              </Field>
              <ErrorMessage
                name="category"
                component="div"
                className="text-themeYellow"
              />
            </div>

            {/* Image URL */}
            <div className="flex flex-col">
              <label className="font-semibold">Image URL</label>
              <Field
                type="text"
                name="image"
                className="mt-1 block w-full px-3 py-2 border border-lightGray rounded-md shadow-sm focus:outline-none focus:themeOrange focus:border-themeOrange sm:text-sm"
              />
              <ErrorMessage
                name="image"
                component="div"
                className="text-themeYellow"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="bg-themeYellow text-white rounded-md p-2 mt-4 hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-themeYellow focus:ring-offset-2"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Adding..." : "Add Product"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default observer(AddProductComponent);