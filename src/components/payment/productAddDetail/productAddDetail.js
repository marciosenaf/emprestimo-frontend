import React from 'react'
import "../productAddDetail/productAddDetail.scss"
import CurrencyInput from '../../Input/priceInput'


const ProductAddDetail = ({
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
        <div>
            <CurrencyInput
                type="text"
                placeholder="Valor Pago"
                className='inputDetail'
                name="valor"
                value={product?.valor}
                onChange={handleInputChange}
                />
            <button className="--btn botaoInput" onClick={() => saveProduct()}>Salvar</button>
        </div>
    )
}

export default ProductAddDetail
