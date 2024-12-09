package com.TIAPruebas.TIA_Prueba.service;


import com.TIAPruebas.TIA_Prueba.model.DetalleFactura;
import com.TIAPruebas.TIA_Prueba.repository.DetalleFacturaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DetalleFacturaService {

    private final DetalleFacturaRepository detalleFacturaRepository;

    @Autowired
    public DetalleFacturaService(DetalleFacturaRepository detalleFacturaRepository) {
        this.detalleFacturaRepository = detalleFacturaRepository;
    }

    public List<DetalleFactura> getAllDetalles() {
        return detalleFacturaRepository.findAll();
    }

    public DetalleFactura getDetalleById(Long id) {
        return detalleFacturaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("DetalleFactura no encontrado"));
    }

    public List<DetalleFactura> getDetallesByFacturaId(Long facturaId) {
        return detalleFacturaRepository.findByFactura_FacturaId(facturaId);
    }

    public DetalleFactura createDetalleFactura(DetalleFactura detalleFactura) {
        return detalleFacturaRepository.save(detalleFactura);
    }

    public DetalleFactura updateDetalleFactura(Long id, DetalleFactura detalleData) {
        DetalleFactura detalle = getDetalleById(id);
        detalle.setCantidad(detalleData.getCantidad());
        detalle.setPrecio(detalleData.getPrecio());
        detalle.setSubtotal(detalleData.getSubtotal());
        detalle.setProducto(detalleData.getProducto());
        detalle.setFactura(detalleData.getFactura());
        return detalleFacturaRepository.save(detalle);
    }

    public void deleteDetalleFactura(Long id) {
        detalleFacturaRepository.deleteById(id);
    }
}
