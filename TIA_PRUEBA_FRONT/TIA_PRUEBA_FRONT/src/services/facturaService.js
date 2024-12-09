import axios from 'axios';

const API_BASE_URL = import.meta.env.REACT_APP_API_BASE_URL;

const FacturasApi = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

const FacturasApiUrls = {
    urlFacturas: "/api/facturas",
}

export const getFacturas = async () => {
    const response = await FacturasApi.get(FacturasApiUrls.urlFacturas);
    return response.data;
};

export const createFactura = async (detail) => {
    const response = await FacturasApi.post(FacturasApiUrls.urlFacturas, detail);
    return response.data;
};

export default FacturasApi;