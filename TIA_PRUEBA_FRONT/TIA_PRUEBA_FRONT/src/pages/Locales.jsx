import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { createLocal, getLocales } from '../services/localService';

const Locales = () => {
    const [locales, setLocales] = useState([]);
    const [newLocal, setNewLocal] = useState({
        nombre: '',
        direccion: '',
        encargado: '',
        latitud: '',
        longitud: '',
        fechaCreacion: new Date().toISOString().slice(0, 19),
    });
    const [isAdding, setIsAdding] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    // Cargar los locales desde el backend
    useEffect(() => {
        const fetchLocales = async () => {
            try {
                const response = await getLocales()
                setLocales(response);
            } catch (error) {
                console.error('Error fetching locales:', error);
                setErrorMessage('Error al cargar los locales.');
            }
        };
        fetchLocales();
    }, []);

    // Manejar los cambios en los inputs
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewLocal({ ...newLocal, [name]: value });
    };

    // Mostrar la fila para agregar un nuevo local
    const handleAddRow = () => {
        setErrorMessage('');
        setIsAdding(true);
    };

    // Cancelar la creación de un nuevo local
    const handleCancel = () => {
        setNewLocal({
            nombre: '',
            direccion: '',
            encargado: '',
            latitud: '',
            longitud: '',
            fechaCreacion: new Date().toISOString().slice(0, 19),
        });
        setIsAdding(false);
        setErrorMessage('');
    };

    // Guardar un nuevo local
    const handleSave = async () => {
        const { nombre, direccion, encargado, latitud, longitud } = newLocal;

        // Validar que todos los campos estén completos
        if (!nombre || !direccion || !encargado || !latitud || !longitud) {
            setErrorMessage('Todos los campos son obligatorios.');
            return;
        }

        try {
            const createdProduct = await createLocal(newLocal);
            setLocales([...products, createdProduct]);
            setNewLocal({
                nombre: '',
                direccion: '',
                encargado: '',
                latitud: '',
                longitud: '',
                fechaCreacion: new Date().toISOString().slice(0, 19),
            });
            setIsAdding(false);
            setErrorMessage('');
        } catch (error) {
            console.error('Error creating local:', error);
            setErrorMessage('Error al crear el local.');
        }
    };

    //Mandar a un controller 

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-3xl font-bold text-red-500 mb-6">Gestión de Locales</h1>

            {/* Mensaje de error */}
            {errorMessage && (
                <div className="mb-4 px-4 py-2 bg-red-200 text-red-800 border border-red-400 rounded">
                    {errorMessage}
                </div>
            )}

            <table className="table-auto bg-white border border-red-500 shadow-md rounded-lg">
                <thead>
                    <tr className="bg-red-500 text-white">
                        <th className="px-6 py-3 border-b">Nombre</th>
                        <th className="px-6 py-3 border-b">Dirección</th>
                        <th className="px-6 py-3 border-b">Encargado</th>
                        <th className="px-6 py-3 border-b">Latitud</th>
                        <th className="px-6 py-3 border-b">Longitud</th>
                    </tr>
                </thead>
                <tbody>
                    {locales.map((local) => (
                        <tr key={local.localId} className="hover:bg-red-100">
                            <td className="px-6 py-3 border-b text-center">{local.nombre}</td>
                            <td className="px-6 py-3 border-b text-center">{local.direccion}</td>
                            <td className="px-6 py-3 border-b text-center">{local.encargado}</td>
                            <td className="px-6 py-3 border-b text-center">{local.latitud}</td>
                            <td className="px-6 py-3 border-b text-center">{local.longitud}</td>
                        </tr>
                    ))}
                    {isAdding && (
                        <tr className="bg-red-50">
                            <td className="px-6 py-3 border-b">
                                <input
                                    type="text"
                                    name="nombre"
                                    value={newLocal.nombre}
                                    onChange={handleInputChange}
                                    className="w-full border border-red-300 rounded px-2 py-1"
                                />
                            </td>
                            <td className="px-6 py-3 border-b">
                                <input
                                    type="text"
                                    name="direccion"
                                    value={newLocal.direccion}
                                    onChange={handleInputChange}
                                    className="w-full border border-red-300 rounded px-2 py-1"
                                />
                            </td>
                            <td className="px-6 py-3 border-b">
                                <input
                                    type="text"
                                    name="encargado"
                                    value={newLocal.encargado}
                                    onChange={handleInputChange}
                                    className="w-full border border-red-300 rounded px-2 py-1"
                                />
                            </td>
                            <td className="px-6 py-3 border-b">
                                <input
                                    type="number"
                                    name="latitud"
                                    value={newLocal.latitud}
                                    onChange={handleInputChange}
                                    className="w-full border border-red-300 rounded px-2 py-1"
                                />
                            </td>
                            <td className="px-6 py-3 border-b">
                                <input
                                    type="number"
                                    name="longitud"
                                    value={newLocal.longitud}
                                    onChange={handleInputChange}
                                    className="w-full border border-red-300 rounded px-2 py-1"
                                />
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            <div className="mt-4 flex gap-4">
                {!isAdding ? (
                    <button
                        onClick={handleAddRow}
                        className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                    >
                        Agregar Local
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
        </div>
    );
};

export default Locales;
