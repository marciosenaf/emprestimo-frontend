import React from 'react'
import PropTypes from 'prop-types'
import MaskedInput from 'react-text-mask'
import createNumberMask from 'text-mask-addons/dist/createNumberMask'

const defaultMaskOptions = {
    prefix: '',
    suffix: 'x',
    includeThousandsSeparator: true,
    thousandsSeparatorSymbol: '',
    allowDecimal: true,
    decimalSymbol: '',
    decimalLimit: 2, // how many digits allowed after the decimal
    integerLimit: 2, // limit length of integer numbers
    allowNegative: false,
    allowLeadingZeroes: false,
}

const ParcelaInput = ({ maskOptions, ...inputProps }) => {
    const currencyMask = createNumberMask({
        ...defaultMaskOptions,
        ...maskOptions,
    })

    return <MaskedInput mask={currencyMask} {...inputProps} />
}

ParcelaInput.defaultProps = {
    inputMode: 'numeric',
    maskOptions: {},
}

ParcelaInput.propTypes = {
    inputmode: PropTypes.string,
    maskOptions: PropTypes.shape({
        prefix: PropTypes.string,
        suffix: PropTypes.string,
        thousandsSeparatorSymbol: PropTypes.string,
        decimalSymbol: PropTypes.string,
        decimalLimit: PropTypes.string,
        integerLimit: PropTypes.number,
    }),
}

export default ParcelaInput
