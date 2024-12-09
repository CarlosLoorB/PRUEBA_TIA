import React from 'react';
import { Link } from 'react-router-dom';

const HomeScreen = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-4xl font-bold text-red-500 mb-8">Bienvenido a la Gestión de Tiendas</h1>
            <div className="flex flex-col items-center space-y-4">
                <Link to="/productos" className="w-64 px-6 py-4 bg-blue-500 text-white text-center rounded-lg shadow-lg hover:bg-blue-600">
                    Gestión de Productos
                </Link>
                <Link to="/locales" className="w-64 px-6 py-4 bg-green-500 text-white text-center rounded-lg shadow-lg hover:bg-green-600">
                    Gestión de Locales
                </Link>
                <Link to="/Stock" className="w-64 px-6 py-4 bg-orange-500 text-white text-center rounded-lg shadow-lg hover:bg-orange-600">
                    Gestión de Productos por Local
                </Link>
                <Link to="/factura" className="w-64 px-6 py-4 bg-purple-500 text-white text-center rounded-lg shadow-lg hover:bg-purple-600">
                    Crear Factura
                </Link>
            </div>
        </div>
    );
};

export default HomeScreen;
