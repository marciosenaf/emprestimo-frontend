import React from 'react'
import "../productAddDetail/productAddDetail.scss"
import CurrencyInput from '../../Input/priceInput'


const productAddDetail = () => {
  return (
    <div>
        <CurrencyInput type="text" className='inputDetail'/>
        <button className="--btn botaoInput">Salvar</button>
    </div>
  )
}

export default productAddDetail