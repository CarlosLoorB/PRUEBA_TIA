package com.TIAPruebas.TIA_Prueba.service;

import com.TIAPruebas.TIA_Prueba.model.DetalleFactura;
import com.TIAPruebas.TIA_Prueba.model.Factura;
import com.TIAPruebas.TIA_Prueba.model.LocalProductoStock;
import com.TIAPruebas.TIA_Prueba.model.Producto;
import com.TIAPruebas.TIA_Prueba.repository.FacturaRepository;
import com.TIAPruebas.TIA_Prueba.repository.LocalProductoStockRepository;
import com.TIAPruebas.TIA_Prueba.repository.ProductoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FacturaService {

    private final FacturaRepository facturaRepository;
    private final ProductoRepository productoRepository;
    private final LocalProductoStockRepository localProductoStockRepository;

    @Autowired
    public FacturaService(FacturaRepository facturaRepository, ProductoRepository productoRepository, LocalProductoStockRepository localProductoStockRepository) {
        this.facturaRepository = facturaRepository;
        this.productoRepository = productoRepository;
        this.localProductoStockRepository = localProductoStockRepository;
    }

    public List<Factura> getAllFacturas() {
        return facturaRepository.findAll();
    }

    public Factura getFacturaById(Long id) {
        return facturaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Factura no encontrada"));
    }

    public Factura createFactura(Factura factura) {
        if (factura.getDetalles() == null || factura.getDetalles().isEmpty()) {
            throw new RuntimeException("La factura no contiene detalles.");
        }

        for (DetalleFactura detalle : factura.getDetalles()) {

            Producto producto = productoRepository.findById(detalle.getProducto().getProductoId())
                    .orElseThrow(() -> new RuntimeException("Producto no encontrado con ID: " + detalle.getProducto().getProductoId()));

            LocalProductoStock localProductoStock = localProductoStockRepository.findByLocal_LocalIdAndProducto_ProductoId(
                    factura.getLocal().getLocalId(),
                    producto.getProductoId()
            ).orElseThrow(() -> new RuntimeException("El producto no está disponible en el local."));

            if (localProductoStock.getStockDisponible() < detalle.getCantidad()) {
                throw new RuntimeException("No hay suficiente stock para el producto con ID: " + producto.getProductoId());
            }

            localProductoStock.setStockDisponible(localProductoStock.getStockDisponible() - detalle.getCantidad());
            localProductoStockRepository.save(localProductoStock);

            detalle.setProducto(producto);
            detalle.setFactura(factura);
        }

        return facturaRepository.save(factura);
    }


    public Factura updateFactura(Long id, Factura facturaData) {
        Factura factura = getFacturaById(id);
        factura.setLocal(facturaData.getLocal());
        factura.setTotal(facturaData.getTotal());
        factura.setEstado(facturaData.getEstado());
        return facturaRepository.save(factura);
    }

    public void deleteFactura(Long id) {
        facturaRepository.deleteById(id);
    }


}
