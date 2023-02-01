import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import useRedirectLoggedOutUser from "../../../customHook/useRedirectLoggedOutUser";
import { selectIsLoggedIn } from "../../../redux/features/auth/authSlice";
import { getProduct } from "../../../redux/features/product/productSlice";
import Card from "../../card/Card";
import { SpinnerImg } from "../../loader/Loader";
import "./ProductDetail.scss";
import DOMPurify from "dompurify";

const ProductDetail = () => {
  useRedirectLoggedOutUser("/login");
  const dispatch = useDispatch();

  const { id } = useParams();

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const { product, isLoading, isError, message } = useSelector(
    (state) => state.product
  );

  useEffect(() => {
    if (isLoggedIn === true) {
      dispatch(getProduct(id));
    }

    if (isError) {
      console.log(message);
    }
  }, [isLoggedIn, isError, message, dispatch]);

  // if(isLoading){
  //   return <h1>Carregando...</h1>
  //   }

  if (!product){
    return <span>producto nao encontrado</span>
  }

  const { name, category, price, quantity, parcela } = product;
  const valorTotal = parseFloat(price) + price * (quantity / 100)
  const valorParcela = valorTotal / parcela
  const lucro = valorTotal - price

  return (
    <div className="product-detail" >
      <h3 className="--mt"></h3>
      <Card cardClass="card">
          <div className="detail" >
            <h1/>
            <h4 className="--color-white">
              <span className="badge">Name:</span> &nbsp; {product.name}
            </h4>
            <p className="--color-dark">
              <b className="--color-white">Status :</b> {product.category}
            </p>
            <p className="--color-dark">
              <b className="--color-white">Valor de Emprestimo :</b> {`R$ ${product.price}`}
            </p>
            <p className="--color-dark">
              <b className="--color-white">% de Lucro :</b> {`${product.quantity}%`}
            </p>
            <p className="--color-dark">
              <b className="--color-white">Valor do Lucro :</b> {`R$ ${lucro}`}
            </p>
            <p className="--color-dark">
              <b className="--color-white">Valor com juros :</b> {`${valorTotal}`}
            </p>
            <p className="--color-dark">
              <b className="--color-white">Quantidade de Parcelas :</b> {`X${product.parcela}`}
            </p>
            <p className="--color-dark">
              <b className="--color-white">Valor por Parcela :</b> {`R$ ${valorParcela}`}
            </p>

            <hr/>
            <div className="color"
              dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(product.description),
              }} 
            ></div>
            <hr/>
            <div className="data">
            <p className="--color-white">
              Criado em: {new Date (product.createdAt).toLocaleString("pt-BR")}
            </p>
            <p className="--color-white">
              Ultima atualizacao: {new Date(product.updatedAt).toLocaleString("pt-BR")}
            </p>
            </div>
          </div>
      </Card>
    </div>
  );
};

export default ProductDetail;
