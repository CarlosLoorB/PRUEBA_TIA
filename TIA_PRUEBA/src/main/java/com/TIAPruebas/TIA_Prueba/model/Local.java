package com.TIAPruebas.TIA_Prueba.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;

@Entity
@Table(name = "locales")
public class Local {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long localId;

    @NotNull(message = "El nombre no puede ser nulo")
    private String nombre;
    @NotNull(message = "La direccion no puede ser nula")
    private String direccion;
    @NotNull(message = "El encargado no puede ser nulo")
    private String encargado;
    @NotNull(message = "La latitud no puede ser nula")
    private Double latitud;
    @NotNull(message = "La longitud no puede ser nula")
    private Double longitud;

    @Column(name = "fecha_creacion" )
    private LocalDateTime fechaCreacion;

    @Column(name = "fecha_baja")
    private LocalDateTime fechaBaja;

    public Long getLocalId() {
        return localId;
    }

    public String getNombre() {
        return nombre;
    }

    public String getDireccion() {
        return direccion;
    }

    public String getEncargado() {
        return encargado;
    }

    public Double getLatitud() {
        return latitud;
    }

    public Double getLongitud() {
        return longitud;
    }

    public LocalDateTime getFechaCreacion() {
        return fechaCreacion;
    }

    public LocalDateTime getFechaBaja() {
        return fechaBaja;
    }

    public void setLocalId(Long localId) {
        this.localId = localId;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }

    public void setEncargado(String encargado) {
        this.encargado = encargado;
    }

    public void setLatitud(Double latitud) {
        this.latitud = latitud;
    }

    public void setLongitud(Double longitud) {
        this.longitud = longitud;
    }

    public void setFechaCreacion(LocalDateTime fechaCreacion) {
        this.fechaCreacion = fechaCreacion;
    }

    public void setFechaBaja(LocalDateTime fechaBaja) {
        this.fechaBaja = fechaBaja;
    }

    // Getters y Setters
}
