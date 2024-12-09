package com.TIAPruebas.TIA_Prueba.repository;

import com.TIAPruebas.TIA_Prueba.model.Producto;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductoRepository extends JpaRepository<Producto, Long> {

}