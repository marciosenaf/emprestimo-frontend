import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./ProductForm.scss";
import CurrencyInput from '../../Input/priceInput'
import QuantityInput from '../../Input/quantityInput'
import ParcelaInput from '../../Input/parcelaInput'


const ProductForm = ({
    product,
    productImage,
    imagePreview,
    description,
    setDescription,
    handleInputChange,
    handleImageChange,
    saveProduct,
}) => {
    return (
        <div className="add-product">
            <form onSubmit={saveProduct}>
                <div className="inputs">
                    <input
                        type="text"
                        placeholder="Nome"
                        name="name"
                        value={product?.name}
                        onChange={handleInputChange}
                    />

                    <select
                        className="Select"
                        name="category"
                        value={product?.category}
                        onChange={handleInputChange}
                    >
                        <option value="selecione o status">Selecione o status</option>
                        <option value="pendente">pendente</option>
                        <option value="pago">pago</option>
                    </select>

                    <CurrencyInput
                        type="text"
                        placeholder="Valor do Emprestimo"
                        name="price"
                        value={product?.price}
                        onChange={handleInputChange}
                    />

                    <QuantityInput
                        type="text"
                        placeholder="% de juros"
                        name="quantity"
                        value={product?.quantity}
                        onChange={handleInputChange}
                    />

                    <ParcelaInput
                        type="text"
                        placeholder="Parcela"
                        name="parcela"
                        value={product?.parcela}
                        onChange={handleInputChange}
                    />

                    <button type="submit" className="--btn --btns-primary-products">
                        Salvar
                    </button>
                </div>

                <div className="editor">
                    <ReactQuill
                        placeholder="Insira os dados do cliente aqui"
                        theme="snow"
                        value={description}
                        onChange={setDescription}
                        modules={ProductForm.modules}
                        formats={ProductForm.formats}
                    />
                </div>


            </form>

        </div>
    );
};

ProductForm.modules = {
    toolbar: [
        [{ header: "1" }, { header: "2" }, { font: [] }],
        [{ size: [] }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [{ align: [] }],
        [{ color: [] }, { background: [] }],
        [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
        ],
        ["clean"],
    ],
};
ProductForm.formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "color",
    "background",
    "list",
    "bullet",
    "indent",
    "link",
    "video",
    "image",
    "code-block",
    "align",
];

export default ProductForm;
