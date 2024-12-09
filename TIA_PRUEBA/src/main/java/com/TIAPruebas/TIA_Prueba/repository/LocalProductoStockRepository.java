package com.TIAPruebas.TIA_Prueba.repository;

import com.TIAPruebas.TIA_Prueba.model.LocalProductoStock;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface LocalProductoStockRepository extends JpaRepository<LocalProductoStock, Long> {

    // Buscar por local
    List<LocalProductoStock> findByLocal_LocalId(Long localId);

    // Buscar por producto
    List<LocalProductoStock> findByProducto_ProductoId(Long productoId);

    // Buscar por local y producto
    Optional<LocalProductoStock> findByLocal_LocalIdAndProducto_ProductoId(Long localId, Long productoId);

    List<LocalProductoStock> findAllByLocal_LocalId(Long localId);
}
