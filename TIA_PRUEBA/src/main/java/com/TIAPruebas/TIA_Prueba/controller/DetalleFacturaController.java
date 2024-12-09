package com.TIAPruebas.TIA_Prueba.controller;


import com.TIAPruebas.TIA_Prueba.model.DetalleFactura;
import com.TIAPruebas.TIA_Prueba.service.DetalleFacturaService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/detalle-facturas")
public class DetalleFacturaController {

    private final DetalleFacturaService detalleFacturaService;

    @Autowired
    public DetalleFacturaController(DetalleFacturaService detalleFacturaService) {
        this.detalleFacturaService = detalleFacturaService;
    }

    @GetMapping
    public List<DetalleFactura> getAllDetalles() {
        return detalleFacturaService.getAllDetalles();
    }

    @GetMapping("/{id}")
    public DetalleFactura getDetalleById(@PathVariable Long id) {
        return detalleFacturaService.getDetalleById(id);
    }

    @GetMapping("/factura/{facturaId}")
    public List<DetalleFactura> getDetallesByFacturaId(@PathVariable Long facturaId) {
        return detalleFacturaService.getDetallesByFacturaId(facturaId);
    }

    @PostMapping
    public DetalleFactura createDetalleFactura(@Valid @RequestBody DetalleFactura detalleFactura) {
        return detalleFacturaService.createDetalleFactura(detalleFactura);
    }

    @PutMapping("/{id}")
    public DetalleFactura updateDetalleFactura(@PathVariable Long id,@Valid @RequestBody DetalleFactura detalleFactura) {
        return detalleFacturaService.updateDetalleFactura(id, detalleFactura);
    }

    @DeleteMapping("/{id}")
    public void deleteDetalleFactura(@PathVariable Long id) {
        detalleFacturaService.deleteDetalleFactura(id);
    }
}
