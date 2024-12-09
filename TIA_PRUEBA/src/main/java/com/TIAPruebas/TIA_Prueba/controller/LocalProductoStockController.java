package com.TIAPruebas.TIA_Prueba.controller;

import com.TIAPruebas.TIA_Prueba.model.LocalProductoStock;
import com.TIAPruebas.TIA_Prueba.service.LocalProductoStockService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/local-producto-stock")
public class LocalProductoStockController {

    @Autowired
    private LocalProductoStockService localProductoStockService;

    @GetMapping
    public List<LocalProductoStock> getAllLocalProductoStock() {
        return localProductoStockService.getAllLocalProductoStock();
    }

    @GetMapping("/{id}")
    public LocalProductoStock getLocalProductoStockById(@PathVariable Long id) {
        return localProductoStockService.getLocalProductoStockById(id);
    }

    @GetMapping("/local/{localId}")
    public List<LocalProductoStock> getLocalProductoStockByLocalId(@PathVariable Long localId) {
        return localProductoStockService.getLocalProductoStockByLocalId(localId);
    }

    @PostMapping
    public LocalProductoStock createLocalProductoStock(@Valid @RequestBody LocalProductoStock localProductoStock) {
        return localProductoStockService.createLocalProductoStock(localProductoStock);
    }

    @PutMapping("/{id}")
    public LocalProductoStock updateLocalProductoStock(@PathVariable Long id,@Valid @RequestBody LocalProductoStock stock) {
        return localProductoStockService.updateLocalProductoStock(id, stock);
    }

    @DeleteMapping("/{id}")
    public void deleteLocalProductoStock(@PathVariable Long id) {
        localProductoStockService.deleteLocalProductoStock(id);
    }
}
