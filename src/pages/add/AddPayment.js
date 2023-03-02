import useRedirectLoggedOutUser from "../../customHook/useRedirectLoggedOutUser";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/loader/Loader";
import ProductAddDetail from "../../components/payment/productAddDetail/productAddDetail";
import { selectIsLoading, createProduct } from "../../redux/features/payment/paymentSlice";
import { addNewPayment } from "../../redux/features/product/productSlice";
import productService from "../../redux/features/payment/paymentService";
import getProducts from "../../redux/features/payment/paymentSlice"



const AddProduct = (product) => {
    useRedirectLoggedOutUser("/login");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [valor, setValor] = useState('');
    const [productImage, setProductImage] = useState("");
    const [imagePreview, setImagePreview] = useState(null);
    const [description, setDescription] = useState("");
    const isLoading = useSelector(selectIsLoading);

    const handleInputChange = (value) => {
        setValor(value)
    };

    const handleImageChange = (e) => {
        setProductImage(e.target.files[0]);
        setImagePreview(URL.createObjectURL(e.target.files[0]));
    };

    const formatMoneyNumber = (value) => {
        const format = value.replace('R$', '').replace('.', '').replace(',', '.')

        return parseFloat(format)
    }

    const saveProduct = async () => {
        const body = {
            product_id: product.product,
            valor: formatMoneyNumber(valor)
        }

        const create = await productService.createProduct(body);
        dispatch(addNewPayment(create))
        setValor('')
    };

    return (
        <div>
            {isLoading && <Loader />}
            <ProductAddDetail
                productValor={valor}
                productImage={productImage}
                imagePreview={imagePreview}
                description={description}
                setDescription={setDescription}
                handleInputChange={handleInputChange}
                handleImageChange={handleImageChange}
                saveProduct={saveProduct}
            />
        </div>
    );
};

export default AddProduct;
