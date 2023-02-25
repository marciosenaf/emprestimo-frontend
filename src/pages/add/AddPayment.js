import useRedirectLoggedOutUser from "../../customHook/useRedirectLoggedOutUser";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/loader/Loader";
import ProductAddDetail from "../../components/payment/productAddDetail/productAddDetail";
import {
    selectIsLoading,
} from "../../redux/features/payment/paymentSlice";
import productService from "../../redux/features/payment/paymentService";
import getProducts from "../../redux/features/payment/paymentSlice"



const AddProduct = (product) => {
    useRedirectLoggedOutUser("/login");
    const navigate = useNavigate();
    const [valor, setValor] = useState('');
    const [productImage, setProductImage] = useState("");
    const [imagePreview, setImagePreview] = useState(null);
    const [description, setDescription] = useState("");

    const isLoading = useSelector(selectIsLoading);

    const handleInputChange = (e) => {
        const { value } = e.target;
        setValor(value)
    };

    const handleImageChange = (e) => {
        setProductImage(e.target.files[0]);
        setImagePreview(URL.createObjectURL(e.target.files[0]));
    };

    const saveProduct = async () => {
        const body = {
            product_id: product.product,
            valor
        }
        const create = await productService.createProduct(body);
        console.log(create)

        // if(create._id){
        //     updateProduct()
        // }
        // navigate(0);
    };

    return (
        <div>
            {isLoading && <Loader />}
            <ProductAddDetail
                product={ { valor }}
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
