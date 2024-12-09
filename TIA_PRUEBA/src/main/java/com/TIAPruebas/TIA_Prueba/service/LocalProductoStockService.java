package com.TIAPruebas.TIA_Prueba.service;

import com.TIAPruebas.TIA_Prueba.model.LocalProductoStock;
import com.TIAPruebas.TIA_Prueba.repository.LocalProductoStockRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LocalProductoStockService {

    @Autowired
    private LocalProductoStockRepository localProductoStockRepository;

    public List<LocalProductoStock> getAllLocalProductoStock() {
        return localProductoStockRepository.findAll();
    }

    public LocalProductoStock getLocalProductoStockById(Long id) {
        return localProductoStockRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("LocalProductoStock no encontrado"));
    }

    public List<LocalProductoStock> getLocalProductoStockByLocalId(Long localId) {
        return localProductoStockRepository.findAllByLocal_LocalId(localId);
    }


    public LocalProductoStock createLocalProductoStock(LocalProductoStock localProductoStock) {
        return localProductoStockRepository.save(localProductoStock);
    }

    public LocalProductoStock updateLocalProductoStock(Long id, LocalProductoStock stockData) {
        LocalProductoStock stock = getLocalProductoStockById(id);
        stock.setStockDisponible(stockData.getStockDisponible());
        stock.setStockSolicitado(stockData.getStockSolicitado());
        stock.setFechaActualizacionStock(stockData.getFechaActualizacionStock());
        return localProductoStockRepository.save(stock);
    }

    public void deleteLocalProductoStock(Long id) {
        localProductoStockRepository.deleteById(id);
    }
}
