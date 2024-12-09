package com.TIAPruebas.TIA_Prueba.repository;


import com.TIAPruebas.TIA_Prueba.model.DetalleFactura;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface DetalleFacturaRepository extends JpaRepository<DetalleFactura, Long> {

    List<DetalleFactura> findByFactura_FacturaId(Long facturaId);
}
