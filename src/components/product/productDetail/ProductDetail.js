import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import useRedirectLoggedOutUser from "../../../customHook/useRedirectLoggedOutUser";
import { selectIsLoggedIn } from "../../../redux/features/auth/authSlice";
import { getProduct, removePayment } from "../../../redux/features/product/productSlice";
import Card from "../../card/Card";
import { SpinnerImg } from "../../loader/Loader";
import "./ProductDetail.scss";
import DOMPurify from "dompurify";
import formatcurrency from "../../../helpers/formatcurrency"
import AddPayment from "../../../pages/add/AddPayment"
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { deleteProduct, getProducts, } from "../../../redux/features/payment/paymentSlice";


const ProductDetail = () => {
  useRedirectLoggedOutUser("/login");

  const dispatch = useDispatch();

  const delProduct = async (id) => {
    console.log(id);
    await dispatch(deleteProduct(id));
    await dispatch(getProducts());
    dispatch(removePayment(id))
  };

  const confirmDelete = (id) => {
    confirmAlert({
      title: "Excluir",
      message: "Tem certeza de que deseja excluir este produto.",
      buttons:
        [
          {
            label: "Excluir",
            onClick: () => delProduct(id),
          },
          {
            label: "Cancelar",
          },
        ],
    });
  };

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

  if (!product) {
    return <span>Produto nao encontrado</span>
  }



  const updateProduct = () => {
    dispatch(getProduct(id));
  }

  const { name, category, price, quantity, parcela } = product;
  const valorTotal = parseFloat(price) + price * (quantity / 100)
  const valorParcela = valorTotal / parcela
  const lucro = valorTotal - price
  const stockStatus = (category) => {
    if (category === "pago") {
      return <b className="--color-success">Pago</b>;
    }
    return <b className="--color-danger">Pendente</b>;
  };
  return (
    <div className="product-detail" >
      <h3 className="--mt"></h3>
      <Card cardClass="card">
        <div className="detail" >
          <h1 />
          <h4 className="--color-white">
            <span className="badge">Name:</span> &nbsp; {product.name}
          </h4>
          <p className="--color-dark">
            <b className="--color-white">Status :</b> {stockStatus(product.category)}
          </p>
          <p className="--color-dark">
            <b className="--color-white">Valor de Emprestimo :</b> {formatcurrency(+price)}
          </p>
          <p className="--color-dark">
            <b className="--color-white">% de Lucro :</b> {`${(quantity)}%`}
          </p>
          <p className="--color-dark">
            <b className="--color-white">Valor do Lucro :</b> {formatcurrency(+lucro)}
          </p>
          <p className="--color-dark">
            <b className="--color-white">Valor com juros :</b> {formatcurrency(+valorTotal)}
          </p>
          <p>
          </p>
          <p className="--color-dark">
            <b className="--color-white">Quantidade de Parcelas :</b> {` ${product.parcela}x`}
          </p>
          <p className="--color-dark">
            <b className="--color-white">Valor por Parcela :</b> {formatcurrency(+valorParcela)}
          </p>

          <AddPayment product={product._id} />
          {product.payments.map((pay, index) => (
            <p className="--color-dark" key={pay._id}>
              <b className="valorPayment">
                <b className="--color-success">
                  {index + 1} - Pagou {pay.valor}
                </b>
                {new Date(pay.updatedAt).toLocaleString("pt-BR")}
                <b className="icons"><FaTrashAlt size={15} color={"red"} onClick={() => confirmDelete(pay._id)} /></b>
              </b>
            </p>
          ))}
          <div className="data">
            <h4 className="--color-white">Detalhe</h4>
            <p className="--color-white">
              <b className="--color-white">Criado em: </b> {new Date(product.createdAt).toLocaleString("pt-BR")}
            </p>
            <p className="--color-white">
              <b className="--color-white">Ultima atualizacao: </b> {new Date(product.updatedAt).toLocaleString("pt-BR")}
            </p>
            <br />

          </div>
        </div>
      </Card>
      <Card cardClass="card">
        <div className="color"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(product.description),
          }}
        ></div>
      </Card>
    </div>
  );
  
};

export default ProductDetail;
