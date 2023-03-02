import React from 'react'
import "../productAddDetail/productAddDetail.scss"
import { NumberFormatBase } from 'react-number-format';

const ProductAddDetail = ({
    product,
    productValor,
    productImage,
    imagePreview,
    description,
    setDescription,
    handleInputChange,
    handleImageChange,
    saveProduct,
}) => {
    function currencyFormatter(value) {
        if (!Number(value)) return "";

        const amount = new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL"
        }).format(value / 100);

        return `${amount}`;
    }

    return (
        <div>
            <NumberFormatBase
                prefix={'R$ '}
                displayType="input"
                value={productValor}
                onValueChange={(values) => {
                    handleInputChange(values.formattedValue);
                }}
                placeholder="Valor Pago"
                className='inputDetail'
                format={currencyFormatter}
            />
            <button className="--btn botaoInput" onClick={() => saveProduct()}>Salvar</button>
        </div>
    )
}

export default ProductAddDetail
