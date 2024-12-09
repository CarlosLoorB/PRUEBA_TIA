import axios from 'axios';

const API_BASE_URL = import.meta.env.REACT_APP_API_BASE_URL;

const ProductosApi = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

const ProductsApiUrls = {
    urlProduct: "/api/productos",
  };

export const getProducts = async () => {
    const response = await ProductosApi.get(ProductsApiUrls.urlProduct);
    return response.data;
};


export const createProduct = async (product) => {
    const response = await ProductosApi.post(ProductsApiUrls.urlProduct, product);
    return response.data;
};

export default ProductosApi;