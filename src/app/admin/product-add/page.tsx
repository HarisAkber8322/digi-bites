"use client";

import React, { useState } from "react";
import { observer } from "mobx-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import ProductStoreContext from "@/store/ProductStore"; // Adjust the path as needed
import { Image } from "react-bootstrap";
import Div from "@/components/UI/Div";
import Text from "@/components/UI/Text";

// Validation schema
const validationSchema = Yup.object({
  name: Yup.string().required("Required"),
  price: Yup.number()
    .required("Required")
    .min(0, "Price must be greater than zero"),
  description: Yup.string().required("Required"),
  category: Yup.string().required("Required"),
  image: Yup.string().required("Required"),
  stock: Yup.number()
    .required("Required")
    .min(0, "Stock must be greater than zero"),
  addons: Yup.string().required("Required"), // Validation for add-ons
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
      addons: "", // New field for add-ons
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
        });
        // Reset the form or redirect to another page
        formik.resetForm();
      } catch (err) {
        console.error("Failed to add product", err);
      }
    },
  });
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="container mx-auto p-6">
      <Text
        themeDivClasses="text-2xl font-bold mb-6 flex justify-center"
        content={<> Add New Product</>}
      />
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <div className="flex w-full justify-between gap-5">
          <Div
            themeDivClasses="w-full shadow-lg rounded p-7"
            content={
              <>
                <div className="flex gap-12">
                  <div className="w-20%">
                    {/* image */}
                    <div className="flex mb-4">
                      <Text
                        themeDivClasses="text-md font-bold"
                        content={<>Select Photo</>}
                      />
                    </div>
                    <div className="flex justify-center">
                      <label>
                        <Image
                          src={preview || "/images/admin.png"}
                          alt="Profile"
                          className="w-60 h-60 rounded object-cover hover:cursor-pointer border-2 border-white duration-200 hover:border-red-500"
                        />
                        <input
                          type="file"
                          onChange={handleImageUpload}
                          className="hidden"
                          accept="image/*"
                        />
                      </label>
                    </div>
                  </div>
                  <div className="w-[80%] mt-7">
                    {/* name */}
                    <div className="mb-4">
                      <label
                        htmlFor="name"
                        className="block text-sm font-semibold text-gray-700 "
                      >
                        Name:
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`mt-1 block w-full px-3 py-2 border border-lightGray rounded-md shadow-sm focus:outline-none focus:themeOrange focus:border-themeOrange sm:text-sm ${formik.touched.name && formik.errors.name ? "border-red-500" : ""}`}
                      />
                      {formik.touched.name && formik.errors.name && (
                        <p className="text-red-500 text-sm">
                          {formik.errors.name}
                        </p>
                      )}
                    </div>
                    {/* price */}
                    <div className="mb-4">
                      <label
                        htmlFor="price"
                        className="block text-sm font-semibold text-gray-700"
                      >
                        Price:
                      </label>
                      <input
                        type="number"
                        id="price"
                        name="price"
                        value={formik.values.price}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`mt-1 block w-full px-3 py-2 border border-lightGray rounded-md shadow-sm focus:outline-none focus:themeOrange focus:border-themeOrange sm:text-sm ${formik.touched.price && formik.errors.price ? "border-red-500" : ""}`}
                      />
                      {formik.touched.price && formik.errors.price && (
                        <p className="text-red-500 text-sm">
                          {formik.errors.price}
                        </p>
                      )}
                    </div>
                    {/* description */}
                    <div className="mb-4">
                      <label
                        htmlFor="description"
                        className="block text-sm font-semibold text-gray-700"
                      >
                        Description:
                      </label>
                      <textarea
                        id="description"
                        name="description"
                        value={formik.values.description}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`mt-1 block w-full px-3 py-2 border border-lightGray rounded-md shadow-sm focus:outline-none focus:themeOrange focus:border-themeOrange sm:text-sm ${formik.touched.description && formik.errors.description ? "border-red-500" : ""}`}
                      />
                      {formik.touched.description && formik.errors.description && (
                        <p className="text-red-500 text-sm">
                          {formik.errors.description}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex gap-5 w-full mt-5">
                  {/* category dropdown */}
                  <div className="mb-4 w-1/2">
                    <label
                      htmlFor="category"
                      className="block text-sm font-semibold text-gray-700"
                    >
                      Category:
                    </label>
                    <select
                      id="category"
                      name="category"
                      value={formik.values.category}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={`mt-1 block w-full px-3 py-2 border border-lightGray rounded-md shadow-sm focus:outline-none focus:themeOrange focus:border-themeOrange sm:text-sm ${formik.touched.category && formik.errors.category ? "border-red-500" : ""}`}
                    >
                      <option value="">Select Category</option>
                      <option value="Pizza">Pizza</option>
                      <option value="Sandwich">Sandwich</option>
                      <option value="Burger">Burger</option>
                      <option value="Biryani">Biryani</option>
                      <option value="Drinks">Drinks</option>
                    </select>
                    {formik.touched.category && formik.errors.category && (
                      <p className="text-red-500 text-sm">
                        {formik.errors.category}
                      </p>
                    )}
                  </div>

                  {/* stock */}
                  <div className="mb-4 w-1/2">
                    <label
                      htmlFor="stock"
                      className="block text-sm font-semibold text-gray-700"
                    >
                      Stock:
                    </label>
                    <input
                      type="number"
                      id="stock"
                      name="stock"
                      value={formik.values.stock}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={`mt-1 block w-full px-3 py-2 border border-lightGray rounded-md shadow-sm focus:outline-none focus:themeOrange focus:border-themeOrange sm:text-sm ${formik.touched.stock && formik.errors.stock ? "border-red-500" : ""}`}
                    />
                    {formik.touched.stock && formik.errors.stock && (
                      <p className="text-red-500 text-sm">
                        {formik.errors.stock}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex justify-end w-full mt-9">
                  <div className="flex gap-3 w-64  justify-end">
                    <button
                      type="reset"
                      className="w-full bg-gray text-white py-2 px-3 rounded-md shadow-sm hover:bg-themeYellow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-themeYellow cursor-pointer"
                    >
                      Reset
                    </button>
                    <button
                      type="submit"
                      className="w-full bg-themeYellow text-white py-2 px-3 rounded-md shadow-sm hover:bg-themeYellow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-themeYellow cursor-pointer"
                    >
                      Add Product
                    </button>
                  </div>
                </div>
              </>
            }
          />
        </div>
      </form>
    </div>
  );
};

export default observer(AddProductPage);
