import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getLocales } from '../services/localService';
import { getProducts } from '../services/ProductoService';
import { getProductoXLocalByID, createProductoXLocal } from '../services/LocalStockService';

const LocalProductoStock = () => {
    const [locales, setLocales] = useState([]);
    const [productos, setProductos] = useState([]);
    const [selectedLocal, setSelectedLocal] = useState('');
    const [localProductos, setLocalProductos] = useState([]);
    const [newStock, setNewStock] = useState({
        productoId: '',
        stockDisponible: '',
        stockSolicitado: '',
    });
    const [isAdding, setIsAdding] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    // Cargar los locales y productos al iniciar
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [localesResponse, productosResponse] = await Promise.all([
                    getLocales(),
                    getProducts(),
                ]);
                setLocales(localesResponse);
                setProductos(productosResponse);
            } catch (error) {
                console.error('Error fetching data:', error);
                setErrorMessage('Error al cargar los datos.');
            }
        };
        fetchData();
    }, []);

    // Cargar los productos del local seleccionado
    const handleLocalChange = async (e) => {
        const localId = e.target.value;
        setSelectedLocal(localId);
        setErrorMessage('');
        setIsAdding(false);
        setNewStock({ productoId: '', stockDisponible: '', stockSolicitado: '' });

        if (localId) {
            try {
                const response = await getProductoXLocalByID(localId);
                console.log("Ël valor de la respuesta es: ", response)
                setLocalProductos(response);
            } catch (error) {
                console.error('Error fetching local products:', error);
                setErrorMessage('Error al cargar los productos del local.');
            }
        } else {
            setLocalProductos([]);
        }
    };

    // Manejar los cambios en los inputs
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewStock({ ...newStock, [name]: value });
    };

    // Mostrar la fila para agregar un nuevo producto
    const handleAddRow = () => {
        setErrorMessage('');
        setIsAdding(true);
    };

    // Cancelar la creación de un nuevo producto
    const handleCancel = () => {
        setNewStock({
            productoId: '',
            stockDisponible: '',
            stockSolicitado: '',
        });
        setIsAdding(false);
        setErrorMessage('');
    };

    // Guardar un nuevo producto asociado al local
    const handleSave = async () => {
        const { productoId, stockDisponible, stockSolicitado, nombre } = newStock;

        // Validar que todos los campos estén completos
        if (!productoId || !stockDisponible || !stockSolicitado) {
            setErrorMessage('Todos los campos son obligatorios.');
            return;
        }

        try {
            const response = await createProductoXLocal({
                local: { localId: selectedLocal },
                producto: { productoId },
                stockDisponible: parseInt(stockDisponible),
                stockSolicitado: parseInt(stockSolicitado),
                fechaCreacion: new Date().toISOString().slice(0, 19),
            });
            const producto = productos.find((prod) => prod.productoId === parseInt(productoId));
            const newProductoStock = {
                ...response,
                producto: { ...producto }, // Incluye los detalles del producto
            };
            setLocalProductos([...localProductos, newProductoStock]);
            setNewStock({ productoId: '', stockDisponible: '', stockSolicitado: '' });
            setIsAdding(false);
            setErrorMessage('');
        } catch (error) {
            console.error('Error creating stock record:', error);
            setErrorMessage('Error al crear el registro.');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-3xl font-bold text-red-500 mb-6">Gestión de Productos por Local</h1>

            {/* Selección de local */}
            <div className="mb-4">
                <select
                    value={selectedLocal}
                    onChange={handleLocalChange}
                    className="w-64 border border-red-300 rounded px-2 py-1"
                >
                    <option value="">Seleccione un Local</option>
                    {locales.map((local) => (
                        <option key={local.localId} value={local.localId}>
                            {local.nombre}
                        </option>
                    ))}
                </select>
            </div>

            {/* Mensaje de error */}
            {errorMessage && (
                <div className="mb-4 px-4 py-2 bg-red-200 text-red-800 border border-red-400 rounded">
                    {errorMessage}
                </div>
            )}

            {/* Tabla de productos */}
            {selectedLocal && (
                <table className="table-auto bg-white border border-red-500 shadow-md rounded-lg">
                    <thead>
                        <tr className="bg-red-500 text-white">
                            <th className="px-6 py-3 border-b">Producto</th>
                            <th className="px-6 py-3 border-b">Stock Disponible</th>
                            <th className="px-6 py-3 border-b">Stock Solicitado</th>
                        </tr>
                    </thead>
                    <tbody>
                        {localProductos?.map((stock) => (
                            <tr key={stock.localProductoStockId} className="hover:bg-red-100">
                                <td className="px-6 py-3 border-b text-center">{stock.producto.nombre}</td>
                                <td className="px-6 py-3 border-b text-center">{stock.stockDisponible}</td>
                                <td className="px-6 py-3 border-b text-center">{stock.stockSolicitado}</td>
                            </tr>
                        ))}
                        {isAdding && (
                            <tr className="bg-red-50">
                                <td className="px-6 py-3 border-b">
                                    <select
                                        name="productoId"
                                        value={newStock.productoId}
                                        onChange={handleInputChange}
                                        className="w-full border border-red-300 rounded px-2 py-1"
                                    >
                                        <option value="">Seleccione un Producto</option>
                                        {productos.map((producto) => (
                                            <option key={producto.productoId} value={producto.productoId}>
                                                {producto.nombre}
                                            </option>
                                        ))}
                                    </select>
                                </td>
                                <td className="px-6 py-3 border-b">
                                    <input
                                        type="number"
                                        name="stockDisponible"
                                        value={newStock.stockDisponible}
                                        onChange={handleInputChange}
                                        className="w-full border border-red-300 rounded px-2 py-1"
                                    />
                                </td>
                                <td className="px-6 py-3 border-b">
                                    <input
                                        type="number"
                                        name="stockSolicitado"
                                        value={newStock.stockSolicitado}
                                        onChange={handleInputChange}
                                        className="w-full border border-red-300 rounded px-2 py-1"
                                    />
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            )}

            {/* Botones */}
            {selectedLocal && (
                <div className="mt-4 flex gap-4">
                    {!isAdding ? (
                        <button
                            onClick={handleAddRow}
                            className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                        >
                            Agregar Producto
                        </button>
                    ) : (
                        <>
                            <button
                                onClick={handleSave}
                                className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                            >
                                Guardar
                            </button>
                            <button
                                onClick={handleCancel}
                                className="px-6 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
                            >
                                Cancelar
                            </button>
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default LocalProductoStock;