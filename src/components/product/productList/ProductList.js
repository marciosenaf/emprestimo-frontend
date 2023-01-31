import React, { useEffect, useState } from "react";
import { SpinnerImg } from "../../loader/Loader";
import "./productList.scss";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { AiOutlineEye } from "react-icons/ai";
import Search from "../../search/Search";
import { useDispatch, useSelector } from "react-redux";

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

  const shortenText = (text, n) => {
    if (text?.length > n) {
      const shortenedText = text.substring(0, n).concat("...");
      return shortenedText;
    }
    return text;
  };

  const delProduct = async (id) => {
    console.log(id);
    await dispatch(deleteProduct(id));
    await dispatch(getProducts());
  };

  const confirmDelete = (id) => {
    confirmAlert({
      title: "Delete Product",
      message: "Are you sure you want to delete this product.",
      buttons:
        [
          {
            label: "Delete",
            onClick: () => delProduct(id),
          },
          {
            label: "Cancel",
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

        {isLoading && <SpinnerImg />}

        <div className="table">
          {!isLoading && products.length === 0 ? (
            <p>No product found, please add a product</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Status</th>
                  <th>Valor Total</th>
                  <th>Lucro</th>
                  <th>Parcela</th>
                  <th>Val Parcela</th>
                  <th>Ultima Ação</th>
                </tr>
              </thead>

              <tbody>
                {currentItems.map((product, index) => {
                  const { _id, name, category, price, quantity, parcela } = product;
                  const valorTotal = parseFloat(price) + price * (quantity / 100)
                  const valorParcela = valorTotal / parcela
                  const lucro = valorTotal - price
                  return (
                    <tr key={_id}>
                      <td>{shortenText(name, 16)}</td>
                      <td>{category}</td>
                      <td>{`R$ ${valorTotal}`}</td>
                      <td>{`R$ ${(lucro).toFixed(2)}`}</td>
                      <td>{`${parcela} Vezes`}</td>
                      <td>{`R$ ${valorParcela.toFixed(2)}`}</td>
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
