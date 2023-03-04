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
import { deleteProduct, getProducts } from "../../../redux/features/payment/paymentSlice";


const ProductDetail = () => {
  useRedirectLoggedOutUser("/login");

  const dispatch = useDispatch();

  const delProduct = async (id) => {
    console.log(id);
    dispatch(deleteProduct(id));
    dispatch(getProducts());
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


  if (!product) {
    return <span>Produto nao encontrado</span>
  }

  const id_tmp = localStorage.getItem("id");
  const data = product.payments.filter(r => r.user == id_tmp)
  const result = {
    "residualAmount": data.reduce((a, b) =>
      a + Number(b.valor), 0
    ),
    "statement": data
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

  const valueTotal = product.payments.map(({ valor }) => parseFloat(valor)).reduce((acc, currentValue) => acc + currentValue, 0)
  
  let valorPagoProg = parseFloat(valorTotal)

  return (
    <div className="product-detail" >
      <h3 className="--mt"></h3>
      <Card cardClass="card">
        <div className="detail" >
          <h1 />
          <h4 className="--color-white h4_detail">
            <span className="badge" >Name:</span> &nbsp; {product.name}
          </h4>
          <p className="--color-dark p_detail">
            <b className="--color-white b_detail">Status :</b> {stockStatus(product.category)}
          </p>
          <p className="--color-dark p_detail" >
            <b className="--color-white b_detail">Valor de Emprestimo :</b> {formatcurrency(+price)}
          </p>
          <p className="--color-dark p_detail">
            <b className="--color-white b_detail">% de Lucro :</b> {`${(quantity)}%`}
          </p>
          <p className="--color-dark p_detail">
            <b className="--color-white b_detail">Valor do Lucro :</b> {formatcurrency(+lucro)}
          </p>
          <p className="--color-dark p_detail">
            <b className="--color-white b_detail">Valor com juros :</b> {formatcurrency(+valorTotal)}
          </p>
          <p className="--color-dark p_detail">
            <b className="--color-white b_detail">Quantidade de Parcelas :</b> {` ${product.parcela}x`}
          </p>
          <p className="--color-dark p_detail">
            <b className="--color-white b_detail">Valor por Parcela :</b> {formatcurrency(+valorParcela)}
          </p>
          <AddPayment product={product._id} />
          {
            product.payments.map((pay, index) => {
              valorPagoProg -= parseFloat(pay.valor)
              return (
              <p className="--color-dark p_detail" key={pay._id}>
                <b className="valorPayment b_detail">
                  {index + 1}
                  <b className="--color-success b_detail">
                    {formatcurrency(+pay.valor)}
                  </b>
                  falta
                  <b className="--color-danger b_detail">
                    {formatcurrency(parseFloat(valorPagoProg))}
                  </b>
                  <b className="icons b_detail">
                    <FaTrashAlt className="delete_detail" onClick={() => confirmDelete(pay._id)} />
                  </b>
                </b>
                <span className="dateDetail">{new Date(pay.updatedAt).toLocaleString("pt-BR")}</span>
              </p>
            )})}
            {}
          <div className="data">
            <h4 className="--color-white">Detalhe</h4>
            <p className="--color-white p_detail">
              <b className="--color-white b_detail">Criado em: </b> {new Date(product.createdAt).toLocaleString("pt-BR")}
            </p>
            <p className="--color-white p_detail">
              <b className="--color-white b_detail">Ultima açao: </b> {new Date(product.updatedAt).toLocaleString("pt-BR")}
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
