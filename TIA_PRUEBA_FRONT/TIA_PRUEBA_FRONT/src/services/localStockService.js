import axios from 'axios';

const API_BASE_URL = import.meta.env.REACT_APP_API_BASE_URL;

const ProductosXLocalApi = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

const ProductosXLocalApiUrls = {
    urlProductXLocal: "/api/local-producto-stock",
    urlProductXLocalUPDT: "/api/local-producto-stock/",
    urlProductXLocalByID: "/api/local-producto-stock/local/",
}

export const getProductoXLocal = async () => {
    const response = await ProductosXLocalApi.get(ProductosXLocalApiUrls.urlProductXLocal);
    return response.data;
};

export const createProductoXLocal = async (product) => {
    const response = await ProductosXLocalApi.post(ProductosXLocalApiUrls.urlProductXLocal, product);
    return response.data;
};

export const updateProductoXLocal = async (id, product) => {
    const response = await ProductosXLocalApi.put(ProductosXLocalApiUrls.urlProductXLocalUPDT + `${id}`, product);
    return response.data;
};

export const getProductoXLocalByID = async (id) => {
    const response = await ProductosXLocalApi.get(ProductosXLocalApiUrls.urlProductXLocalByID + `${id}`);
    return response.data;
};

export default ProductosXLocalApi;