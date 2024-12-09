import React, { useState, useEffect } from 'react';
import { createProduct, getProducts } from '../services/ProductoService';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    nombre: '',
    descripcion: '',
    precioUnitario: '',
    precioMayor: '',
    categoria: '',
    fechaCreacion: new Date().toISOString().slice(0, 19),
  });
  const [isAdding, setIsAdding] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
        setErrorMessage('Error al cargar los productos.');
      }
    };
    fetchProducts();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleAddRow = () => {
    setErrorMessage('');
    setIsAdding(true);
  };

  const handleCancel = () => {
    setNewProduct({
      nombre: '',
      descripcion: '',
      precioUnitario: '',
      precioMayor: '',
      categoria: '',
      fechaCreacion: new Date().toISOString().slice(0, 19),
    });
    setIsAdding(false);
    setErrorMessage('');
  };

  const handleSave = async () => {
    const { nombre, descripcion, precioUnitario, precioMayor, categoria } = newProduct;

    // Validación de campos vacíos
    if (!nombre || !descripcion || !precioUnitario || !precioMayor || !categoria) {
      setErrorMessage('Todos los campos son obligatorios.');
      return;
    }

    try {
      const createdProduct = await createProduct(newProduct);
      setProducts([...products, createdProduct]);
      setNewProduct({
        nombre: '',
        descripcion: '',
        precioUnitario: '',
        precioMayor: '',
        categoria: '',
        fechaCreacion: new Date().toISOString().slice(0, 19),
      });
      setIsAdding(false);
      setErrorMessage('');
    } catch (error) {
      console.error('Error creating product:', error);
      setErrorMessage('Error al crear el producto.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-red-500 mb-6">Gestión de Productos</h1>

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
            <th className="px-6 py-3 border-b">Descripción</th>
            <th className="px-6 py-3 border-b">Precio Unitario</th>
            <th className="px-6 py-3 border-b">Precio Mayor</th>
            <th className="px-6 py-3 border-b">Categoría</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.productoId} className="hover:bg-red-100">
              <td className="px-6 py-3 border-b text-center">{product.nombre}</td>
              <td className="px-6 py-3 border-b text-center">{product.descripcion}</td>
              <td className="px-6 py-3 border-b text-center">{product.precioUnitario}</td>
              <td className="px-6 py-3 border-b text-center">{product.precioMayor}</td>
              <td className="px-6 py-3 border-b text-center">{product.categoria}</td>
            </tr>
          ))}
          {isAdding && (
            <tr className="bg-red-50">
              <td className="px-6 py-3 border-b">
                <input
                  type="text"
                  name="nombre"
                  value={newProduct.nombre}
                  onChange={handleInputChange}
                  className="w-full border border-red-300 rounded px-2 py-1"
                />
              </td>
              <td className="px-6 py-3 border-b">
                <input
                  type="text"
                  name="descripcion"
                  value={newProduct.descripcion}
                  onChange={handleInputChange}
                  className="w-full border border-red-300 rounded px-2 py-1"
                />
              </td>
              <td className="px-6 py-3 border-b">
                <input
                  type="number"
                  name="precioUnitario"
                  value={newProduct.precioUnitario}
                  onChange={handleInputChange}
                  className="w-full border border-red-300 rounded px-2 py-1"
                />
              </td>
              <td className="px-6 py-3 border-b">
                <input
                  type="number"
                  name="precioMayor"
                  value={newProduct.precioMayor}
                  onChange={handleInputChange}
                  className="w-full border border-red-300 rounded px-2 py-1"
                />
              </td>
              <td className="px-6 py-3 border-b">
                <input
                  type="text"
                  name="categoria"
                  value={newProduct.categoria}
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
    </div>
  );
};

export default Products;
