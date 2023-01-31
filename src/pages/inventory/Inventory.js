import useRedirectLoggedOutUser from "../../customHook/useRedirectLoggedOutUser";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductList from "../../components/product/productList/ProductList";
import ProductSummary from "../../components/product/productSummary/ProductSummary";
import { selectIsLoggedIn } from "../../redux/features/auth/authSlice";
import { getProducts } from "../../redux/features/product/productSlice";
import AddProduct from "../add/AddProduct"

const Inventory = () => {
  useRedirectLoggedOutUser("/login");
  const dispatch = useDispatch();

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const { products, isLoading, isError, message } = useSelector(
    (state) => state.product
  );

  useEffect(() => {
    if (isLoggedIn === true) {
      dispatch(getProducts());
    }

    if (isError) {
      console.log(message);
    }
  }, [isLoggedIn, isError, message, dispatch]);

  return (
    <div>
      <ProductSummary products={products} />
      <AddProduct/>
      <ProductList products={products} isLoading={isLoading} />
    </div>
  );
};

export default Inventory;
