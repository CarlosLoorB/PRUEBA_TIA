package com.TIAPruebas.TIA_Prueba.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;

@Entity
@Table(name = "local_producto_stock")
public class LocalProductoStock {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long localProductoStockId;

    @ManyToOne
    @JoinColumn(name = "local_id", nullable = false)
    private Local local;

    @ManyToOne
    @JoinColumn(name = "producto_id", nullable = false)
    private Producto producto;

    @NotNull(message = "El stockDisponible no puede ser nulo")
    private Integer stockDisponible;
    @NotNull(message = "El stockSolicitado no puede ser nulo")
    private Integer stockSolicitado;

    @Column(name = "fecha_actualizacion_stock")
    private LocalDateTime fechaActualizacionStock;

    public Long getLocalProductoStockId() {
        return localProductoStockId;
    }

    public Local getLocal() {
        return local;
    }

    public Producto getProducto() {
        return producto;
    }

    public Integer getStockDisponible() {
        return stockDisponible;
    }

    public Integer getStockSolicitado() {
        return stockSolicitado;
    }

    public LocalDateTime getFechaActualizacionStock() {
        return fechaActualizacionStock;
    }

    public void setLocalProductoStockId(Long localProductoStockId) {
        this.localProductoStockId = localProductoStockId;
    }

    public void setLocal(Local local) {
        this.local = local;
    }

    public void setProducto(Producto producto) {
        this.producto = producto;
    }

    public void setStockDisponible(Integer stockDisponible) {
        this.stockDisponible = stockDisponible;
    }

    public void setStockSolicitado(Integer stockSolicitado) {
        this.stockSolicitado = stockSolicitado;
    }

    public void setFechaActualizacionStock(LocalDateTime fechaActualizacionStock) {
        this.fechaActualizacionStock = fechaActualizacionStock;
    }
}
