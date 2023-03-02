import React, { useEffect } from "react";
import "./ProductSummary.scss";
import {RiQuestionMark} from "react-icons/ri"
import { AiFillDollarCircle } from "react-icons/ai";
import { SiVerizon } from "react-icons/si";
import { BiCategory } from "react-icons/bi";
import InfoBox from "../../infoBox/InfoBox";
import {BsPeopleFill} from 'react-icons/bs'
import { useDispatch, useSelector } from "react-redux";
import {
  CALC_CATEGORY,
  CALC_OUTOFSTOCK,
  CALC_STORE_VALUE,
  selectCategory,
  selectOutOfStock,
  selectTotalStoreValue,
} from "../../../redux/features/product/productSlice";
import formatCurrency from "../../../helpers/formatcurrency";

// Icons
const earningIcon = <AiFillDollarCircle size={30} color="#fff" />;
const productIcon = <BsPeopleFill size={30} color="#fff" />;
const categoryIcon = <SiVerizon size={30} color="#fff" />;
const outOfStockIcon = <RiQuestionMark size={30} color="#fff" />;

// Format Amount
export const formatNumbers = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const ProductSummary = ({ products }) => {
  const dispatch = useDispatch();
  const totalStoreValue = useSelector(selectTotalStoreValue);
  const outOfStock = useSelector(selectOutOfStock);
  const category = useSelector(selectCategory);

  useEffect(() => {
    dispatch(CALC_STORE_VALUE(products));
    dispatch(CALC_OUTOFSTOCK(products));
    dispatch(CALC_CATEGORY(products));
  }, [dispatch, products]);

  return (
    <div className="product-summary">
      <h4 className="--mt">Status</h4>
      <div className="info-summary">
        <InfoBox
          icon={productIcon}
          title={"Empréstimos"}
          count={products.length}
          bgColor="card1"
        />
        <InfoBox
          icon={earningIcon}
          title={"R$ Empréstimos"}
          count={formatCurrency(totalStoreValue)}
          bgColor="card2"
        />
        <InfoBox
          icon={outOfStockIcon}
          title={"Pendentes"}
          count={outOfStock}
          bgColor="card3"
        />
        <InfoBox
          icon={categoryIcon}
          title={"Pagos"}
          count={category}
          bgColor="card4"
        />
      </div>
    </div>
  );
};

export default ProductSummary;
