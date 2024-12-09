package com.TIAPruebas.TIA_Prueba.service;

import com.TIAPruebas.TIA_Prueba.model.Producto;
import com.TIAPruebas.TIA_Prueba.repository.ProductoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductoService {

    @Autowired
    private ProductoRepository productoRepository;

    public List<Producto> getAllProductos() {
        return productoRepository.findAll();
    }

    public Producto getProductoById(Long id) {
        return productoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Producto no encontrado"));
    }

    public Producto createProducto(Producto producto) {
        return productoRepository.save(producto);
    }

    public Producto updateProducto(Long id, Producto productoData) {
        Producto producto = getProductoById(id);
        producto.setNombre(productoData.getNombre());
        producto.setDescripcion(productoData.getDescripcion());
        producto.setPrecioUnitario(productoData.getPrecioUnitario());
        producto.setPrecioMayor(productoData.getPrecioMayor());
        producto.setCategoria(productoData.getCategoria());
        return productoRepository.save(producto);
    }

    public void deleteProducto(Long id) {
        productoRepository.deleteById(id);
    }
}
