"use client";
import React, { useContext, useEffect, useState } from "react";
import Div from "../../components/UI/Div";
import MenuCard from "../../components/ClientComponent/OtherComponents/MenuCard";
import Text from "../../components/UI/Text";
import ProductStoreContext, { Product } from "../../store/ProductStore";
import UserStoreContext from "../../store/UserStore";
import { observer } from "mobx-react";

const FavoritePage: React.FC = () => {
  const ProductStore = useContext(ProductStoreContext);
  const UserStore = useContext(UserStoreContext);
  const [favorites, setFavorites] = useState<Product[]>([]);

  useEffect(() => {
    if (UserStore.isLoggedin == true) {
      UserStore.fetchFavoriteProducts(UserStore.user?.id);
    }
  }, [UserStore.isLoggedin, UserStore.user?.id, UserStore.favoriteProductIds]);

  useEffect(() => {
    const fetchFavorites = async () => {
      if (UserStore.isLoggedin) {
        const favoriteProductIdsArray = Array.from(
          UserStore.favoriteProductIds,
        );
        const favoriteProducts = await Promise.all(
          favoriteProductIdsArray.map(async (favProductId: string) => {
            const product = await ProductStore.fetchProductById(favProductId);
            return product;
          }),
        );
        const validProducts = favoriteProducts.filter(
          (product): product is Product => product !== null,
        );
        setFavorites(validProducts);
      }
    };

    fetchFavorites();
  }, [UserStore.favoriteProductIds, UserStore.isLoggedin, ProductStore]);

  return (
    <Div
      lightColor="bgGrey"
      darkColor="pepperBlack:"
      themeDivClasses="m-auto w-[1180px] "
      content={
        <div className="mt-7">
          <Text
            content={
              <h2 className="text-2xl font-bold mb-4">Favorite Items</h2>
            }
            themeDivClasses=""
          />
          <div className="grid grid-cols-5 gap-4 pb-54">
            {favorites.length > 0 ? (
              favorites.map((menuItem) => (
                <MenuCard
                  key={menuItem._id}
                  menuItem={menuItem}
                  handleCardClick={() => {}}
                />
              ))
            ) : (
              <p>No favorite products found.</p>
            )}
          </div>
        </div>
      }
    />
  );
};

export default observer(FavoritePage);
