import React, { useEffect, useState } from "react";
import { SpinnerImg } from "../../loader/Loader";
import "./productList.scss";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { AiOutlineEye } from "react-icons/ai";
import Search from "../../search/Search";
import { useDispatch, useSelector } from "react-redux";
import formatcurrency from "../../../helpers/formatcurrency"

import { FILTER_PRODUCTS, selectFilteredProducts, } from "../../../redux/features/product/filterSlice";
import { deleteProduct, getProducts, } from "../../../redux/features/product/productSlice";

import ReactPaginate from "react-paginate";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { Link } from "react-router-dom";

const ProductList = ({ products, isLoading }) => {
  const [search, setSearch] = useState("");
  const filteredProducts = useSelector(selectFilteredProducts);

  const dispatch = useDispatch();

  const delProduct = async (id) => {
    console.log(id);
    await dispatch(deleteProduct(id));
    await dispatch(getProducts());
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



  //   Begin Pagination
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 10;

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;

    setCurrentItems(filteredProducts.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(filteredProducts.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, filteredProducts]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % filteredProducts.length;
    setItemOffset(newOffset);
  };


  //   End Pagination

  useEffect(() => {
    dispatch(FILTER_PRODUCTS({ products, search }));
  }, [products, search, dispatch]);

  return (
    <div className="product-list">
      <hr />
      <div className="table">
        <div className=" --flex-dir-column">
          <span>
            <h4 className="--mt">Empréstimo</h4>
          </span>
          <span>
            <Search
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </span>
        </div>


        <div className="table">
          {!isLoading && products.length === 0 ? (
            <p>Nenhum emprestimo adicionado</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th className="th_list" >Nome</th>
                  <th className="th_list" >Status</th>
                  <th className="th_list" >Valor Total</th>
                  <th className="th_list" >Lucro</th>
                  <th className="th_list" >Parcela</th>
                  <th className="th_list" >Val Parcela</th>
                  <th className="th_list" >Ultima Ação</th>
                </tr>
              </thead>

              <tbody>
                {currentItems.map((product) => {
                  const { _id, name, category, price, quantity, parcela } = product;
                  const valorTotal = parseFloat(price) + (price) * (quantity / 100)
                  const valorParcela = valorTotal / parcela
                  const lucro = valorTotal - price
                  return (
                    <tr key={_id}>
                      <td>{name}</td>
                      <td>{category}</td>
                      <td> {formatcurrency(valorTotal)}</td>
                      <td>{formatcurrency(lucro)}</td>
                      <td>{`${parcela}x`}</td>
                      <td>{formatcurrency(valorParcela)}</td>
                      <td>{new Date(product.updatedAt).toLocaleString("pt-BR")}</td>
                      <td className="icons">
                        <span>
                          <Link to={`/product-detail/${_id}`}>
                            <AiOutlineEye size={25} color={"purple"} />
                          </Link>
                        </span>
                        <span>
                          <Link to={`/edit-product/${_id}`}>
                            <FaEdit size={20} color={"green"} />
                          </Link>
                        </span>
                        <span>
                          <FaTrashAlt
                            size={20}
                            color={"red"}
                            onClick={() => confirmDelete(_id)}
                          />
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
        <ReactPaginate
          breakLabel="..."
          nextLabel="Next"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="Prev"
          renderOnZeroPageCount={null}
          containerClassName="pagination"
          pageLinkClassName="page-num"
          previousLinkClassName="page-num"
          nextLinkClassName="page-num"
          activeLinkClassName="activePage"
        />
      </div>
    </div>
  );
};

export default ProductList;
