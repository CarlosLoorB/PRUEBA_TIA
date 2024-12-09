package com.TIAPruebas.TIA_Prueba.service;

import com.TIAPruebas.TIA_Prueba.model.Local;
import com.TIAPruebas.TIA_Prueba.repository.LocalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LocalService {
    @Autowired
    private LocalRepository localRepository;

    public List<Local> getAllLocales() {
        return localRepository.findAll();
    }

    public Local getLocalById(Long id) {
        return localRepository.findById(id).orElseThrow(() -> new RuntimeException("Local no encontrado"));
    }

    public Local createLocal(Local local) {
        return localRepository.save(local);
    }

    public Local updateLocal(Long id, Local updatedLocal) {
        Local local = getLocalById(id);
        local.setNombre(updatedLocal.getNombre());
        local.setDireccion(updatedLocal.getDireccion());
        local.setEncargado(updatedLocal.getEncargado());
        return localRepository.save(local);
    }

    public void deleteLocal(Long id) {
        localRepository.deleteById(id);
    }
}
