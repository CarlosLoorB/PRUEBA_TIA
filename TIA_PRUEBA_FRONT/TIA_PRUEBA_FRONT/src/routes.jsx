import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomeScreen from './pages/homeScreen';
import Products from './pages/Products';
import Locales from './pages/Locales';
import LocalProductoStock from './pages/ProductosLocal';
import Factura from './pages/Factura';

const AppRoutes = () => (
    <Router>
        <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/productos" element={<Products />} />
            <Route path="/locales" element={<Locales />} />
            <Route path="/Stock" element={<LocalProductoStock />} />
            <Route path="/factura" element={<Factura />} />            
        </Routes>
    </Router>
);

export default AppRoutes;
