import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getLocales } from '../services/localService';
import { getProducts } from '../services/ProductoService';
import { createFactura } from '../services/FacturaService';

const Factura = () => {
    const [locales, setLocales] = useState([]);
    const [productos, setProductos] = useState([]);
    const [selectedLocal, setSelectedLocal] = useState('');
    const [facturaDetalles, setFacturaDetalles] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [total, setTotal] = useState(0);

    // Cargar locales y productos al iniciar
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
                console.error('Error al cargar los datos:', error);
                setErrorMessage('Error al cargar locales o productos.');
            }
        };
        fetchData();
    }, []);

    // Actualizar el total automáticamente
    useEffect(() => {
        const newTotal = facturaDetalles.reduce((acc, detalle) => {
            const producto = productos.find((p) => p.productoId === parseInt(detalle.productoId));
            const precio = producto?.precioUnitario || 0;
            return acc + precio * detalle.cantidad;
        }, 0);
        setTotal(newTotal);
    }, [facturaDetalles, productos]);

    // Manejar cambios en los detalles
    const handleDetailChange = (index, field, value) => {
        const newDetalles = [...facturaDetalles];
        newDetalles[index][field] = value;
        setFacturaDetalles(newDetalles);
    };

    // Agregar una nueva fila
    const handleAddRow = () => {
        setFacturaDetalles([
            ...facturaDetalles,
            { productoId: '', cantidad: '' },
        ]);
    };

    // Eliminar una fila
    const handleRemoveRow = (index) => {
        const newDetalles = facturaDetalles.filter((_, i) => i !== index);
        setFacturaDetalles(newDetalles);
    };

    // Manejar el envío de la factura
    const handlePagar = async () => {
        if (!selectedLocal) {
            setErrorMessage('Debes seleccionar un local.');
            return;
        }

        if (facturaDetalles.some((detalle) => !detalle.productoId || !detalle.cantidad)) {
            setErrorMessage('Todos los detalles deben tener un producto y una cantidad válida.');
            return;
        }

        try {
            const detallesConProductos = facturaDetalles.map((detalle) => ({
                producto: { productoId: parseInt(detalle.productoId) },
                cantidad: parseInt(detalle.cantidad),
                precio: productos.find((p) => p.productoId === parseInt(detalle.productoId)).precioUnitario,
                subtotal: productos.find((p) => p.productoId === parseInt(detalle.productoId)).precioUnitario * detalle.cantidad,
            }));

            const factura = {
                local: { localId: parseInt(selectedLocal) },
                detalles: detallesConProductos,
                total,
                estado: 'PAGADA',
                fechaVenta: new Date().toISOString().slice(0, 19),
            };

            await createFactura(factura);
            alert('Factura creada con éxito.');
            setFacturaDetalles([]);
            setTotal(0);
        } catch (error) {
            console.error('Error al crear la factura:', error);
            setFacturaDetalles([]);
            setErrorMessage('Error al procesar la factura: Verifica el stock de los productos.');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-3xl font-bold text-red-500 mb-6">Crear Factura</h1>

            {/* Selección de local */}
            <div className="mb-4">
                <select
                    value={selectedLocal}
                    onChange={(e) => setSelectedLocal(e.target.value)}
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

            {/* Tabla de detalles */}
            {selectedLocal && (
                <>
                    <table className="table-auto bg-white border border-red-500 shadow-md rounded-lg">
                        <thead>
                            <tr className="bg-red-500 text-white">
                                <th className="px-6 py-3 border-b">Producto</th>
                                <th className="px-6 py-3 border-b">Cantidad</th>
                                <th className="px-6 py-3 border-b">Subtotal</th>
                                <th className="px-6 py-3 border-b">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {facturaDetalles.map((detalle, index) => {
                                const producto = productos.find((p) => p.productoId === parseInt(detalle.productoId));
                                const precio = producto?.precioUnitario || 0;
                                return (
                                    <tr key={index} className="hover:bg-red-100">
                                        <td className="px-6 py-3 border-b">
                                            <select
                                                value={detalle.productoId}
                                                onChange={(e) => handleDetailChange(index, 'productoId', e.target.value)}
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
                                                value={detalle.cantidad}
                                                onChange={(e) => handleDetailChange(index, 'cantidad', e.target.value)}
                                                className="w-full border border-red-300 rounded px-2 py-1"
                                            />
                                        </td>
                                        <td className="px-6 py-3 border-b text-center">
                                            {(precio * (detalle.cantidad || 0)).toFixed(2)}
                                        </td>
                                        <td className="px-6 py-3 border-b text-center">
                                            <button
                                                onClick={() => handleRemoveRow(index)}
                                                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                                            >
                                                Eliminar
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>

                    {/* Botones */}
                    <div className="mt-4 flex gap-4">
                        <button
                            onClick={handleAddRow}
                            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                        >
                            Agregar Producto
                        </button>
                        <button
                            onClick={handlePagar}
                            className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                        >
                            Pagar
                        </button>
                    </div>

                    {/* Total */}
                    <div className="mt-4 text-xl font-bold text-gray-700">
                        Total: ${total.toFixed(2)}
                    </div>
                </>
            )}
        </div>
    );
};

export default Factura;
