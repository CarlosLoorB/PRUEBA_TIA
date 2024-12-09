package com.TIAPruebas.TIA_Prueba.repository;

import com.TIAPruebas.TIA_Prueba.model.Local;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LocalRepository extends JpaRepository<Local, Long> {
    // Métodos personalizados, si es necesario
}