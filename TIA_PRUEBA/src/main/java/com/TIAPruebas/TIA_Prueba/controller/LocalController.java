package com.TIAPruebas.TIA_Prueba.controller;

import com.TIAPruebas.TIA_Prueba.model.Local;
import com.TIAPruebas.TIA_Prueba.service.LocalService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/locales")
public class LocalController {

    @Autowired
    private LocalService localService;

    @GetMapping
    public List<Local> getAllLocales() {
        return localService.getAllLocales();
    }

    @GetMapping("/{id}")
    public Local getLocalById(@PathVariable Long id) {
        return localService.getLocalById(id);
    }

    @PostMapping
    public Local createLocal(@Valid @RequestBody Local local) {
        return localService.createLocal(local);
    }

    @PutMapping("/{id}")
    public Local updateLocal(@PathVariable Long id,@Valid @RequestBody Local local) {
        return localService.updateLocal(id, local);
    }

    @DeleteMapping("/{id}")
    public void deleteLocal(@PathVariable Long id) {
        localService.deleteLocal(id);
    }
}
