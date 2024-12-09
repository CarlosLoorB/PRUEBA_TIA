import axios from 'axios';

const API_BASE_URL = import.meta.env.REACT_APP_API_BASE_URL;

const ProductosApi = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

const LocalesApiUrls = {
    urlLocal: "/api/locales",
  };

export const getLocales = async () => {
    const response = await ProductosApi.get(LocalesApiUrls.urlLocal);
    return response.data;
};


export const createLocal = async (local) => {
    const response = await ProductosApi.post(LocalesApiUrls.urlLocal, local);
    return response.data;
};

export default ProductosApi;