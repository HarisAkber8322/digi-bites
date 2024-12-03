"use client";
import React, { useContext, useEffect, useState } from "react";
import Div from "../../../components/UI/Div";
import Text from "../../../components/UI/Text";
import ProductStoreContext from "../../../store/ProductStore";
import { observer } from "mobx-react";
import { FaTrash } from "react-icons/fa";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { Image } from "react-bootstrap";

const RatedProductsPage: React.FC = () => {
  const ProductStore = useContext(ProductStoreContext);
  const [searchTerm, setSearchTerm] = useState("");

  const handleDelete = async (productId: string) => {
    await ProductStore.deleteProduct(productId);
  };

  const handleToggleRecommended = async (productId: string) => {
    await ProductStore.toggleRecommended(productId);
  };

  useEffect(() => {
    ProductStore.fetchProducts();
  }, [ProductStore]);

  const filteredProducts = ProductStore.products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Div
      themeDivClasses="pb-20"
      darkColor="bg-dullBlack"
      lightColor="bg-bgGrey"
      content={
        <>
          <Text
            themeDivClasses="text-3xl font-bold block"
            lightColor="text-black"
            darkColor="text-white"
            content="Product Listings"
          />
          <div className="flex justify-center mt-6">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search Products..."
             className="p-2 border rounded-lg w-full text-black"
            />
          </div>

          <Div
            themeDivClasses="shadow-lg mt-10 rounded-2xl overflow-hidden pb-14"
            darkColor="bg-dullblack"
            content={
              <>
                <table className="min-w-full rounded-lg">
                  <thead className="bg-lightGray">
                    <tr className="py-3">
                      <th className="px-6 py-3 text-center text-xs font-semibold text-gray-500">
                        SL
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500">
                        Product Name
                      </th>
                      <th className="px-6 py-3 text-center text-xs font-semibold text-gray-500">
                        Price
                      </th>
                      <th className="px-6 py-3 text-center text-xs font-semibold text-gray-500">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-900">
                    {filteredProducts.map((product, index) => (
                      <tr
                        key={product._id}
                        className="hover:bg-gray-100 dark:hover:bg-gray-700 border-b border-b-lightGray"
                      >
                        <td className="px-4 py-2 text-center  text-sx font-medium text-gray-900 dark:text-gray-100 w-[80px]">
                          {index + 1}
                        </td>
                        <td className="px-4 py-2 text-center text-sx flex justify-start items-center gap-3 w-[300px]">
                          <Image
                            src={product.image}
                            alt={product.name}
                            className="w-10 h-10 object-cover rounded-full"
                          />
                          <span>{product.name}</span>
                        </td>
                        <td className="px-4 py-2 text-center   text-sx font-medium text-gray-900 dark:text-gray-100 w-[100px]">
                          {product.price ? `Rs ${product.price}` : "N/A"}
                        </td>
                        <td className=" py-2 gap-3 text-center   text-sx font-medium text-gray-900 dark:text-gray-100 w-[150px]">
                    <div className="flex justify-center gap-5">      <span className=" "><Link href="/admin/product-add"><FontAwesomeIcon icon={faAdd}/></Link></span>
                          <button
                            onClick={() => handleDelete(product._id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <FaTrash />
                          </button></div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            }
          />
        </>
      }
    />
  );
};

export default observer(RatedProductsPage);
