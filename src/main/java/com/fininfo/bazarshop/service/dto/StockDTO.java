package com.fininfo.bazarshop.service.dto;

import java.time.LocalDate;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link com.fininfo.bazarshop.domain.Stock} entity.
 */
public class StockDTO implements Serializable {
    
    private Long id;

    private Double stockPhysique;

    private Double stockDisponible;

    private Double stockReserve;

    private Double stockCommande;

    private LocalDate derniereEntre;

    private LocalDate derniereSortie;

    private Boolean alerteStock;

    private LocalDate creeLe;

    private String creePar;

    private LocalDate modifieLe;

    private String modifiePar;


    private Long refProduitId;

    private String refProduitReference;

    private Long idCategorieId;

    private String idCategorieNom;

    private Long idSousCategorieId;

    private String idSousCategorieNom;
    
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Double getStockPhysique() {
        return stockPhysique;
    }

    public void setStockPhysique(Double stockPhysique) {
        this.stockPhysique = stockPhysique;
    }

    public Double getStockDisponible() {
        return stockDisponible;
    }

    public void setStockDisponible(Double stockDisponible) {
        this.stockDisponible = stockDisponible;
    }

    public Double getStockReserve() {
        return stockReserve;
    }

    public void setStockReserve(Double stockReserve) {
        this.stockReserve = stockReserve;
    }

    public Double getStockCommande() {
        return stockCommande;
    }

    public void setStockCommande(Double stockCommande) {
        this.stockCommande = stockCommande;
    }

    public LocalDate getDerniereEntre() {
        return derniereEntre;
    }

    public void setDerniereEntre(LocalDate derniereEntre) {
        this.derniereEntre = derniereEntre;
    }

    public LocalDate getDerniereSortie() {
        return derniereSortie;
    }

    public void setDerniereSortie(LocalDate derniereSortie) {
        this.derniereSortie = derniereSortie;
    }

    public Boolean isAlerteStock() {
        return alerteStock;
    }

    public void setAlerteStock(Boolean alerteStock) {
        this.alerteStock = alerteStock;
    }

    public LocalDate getCreeLe() {
        return creeLe;
    }

    public void setCreeLe(LocalDate creeLe) {
        this.creeLe = creeLe;
    }

    public String getCreePar() {
        return creePar;
    }

    public void setCreePar(String creePar) {
        this.creePar = creePar;
    }

    public LocalDate getModifieLe() {
        return modifieLe;
    }

    public void setModifieLe(LocalDate modifieLe) {
        this.modifieLe = modifieLe;
    }

    public String getModifiePar() {
        return modifiePar;
    }

    public void setModifiePar(String modifiePar) {
        this.modifiePar = modifiePar;
    }

    public Long getRefProduitId() {
        return refProduitId;
    }

    public void setRefProduitId(Long produitId) {
        this.refProduitId = produitId;
    }

    public String getRefProduitReference() {
        return refProduitReference;
    }

    public void setRefProduitReference(String produitReference) {
        this.refProduitReference = produitReference;
    }

    public Long getIdCategorieId() {
        return idCategorieId;
    }

    public void setIdCategorieId(Long categorieId) {
        this.idCategorieId = categorieId;
    }

    public String getIdCategorieNom() {
        return idCategorieNom;
    }

    public void setIdCategorieNom(String categorieNom) {
        this.idCategorieNom = categorieNom;
    }

    public Long getIdSousCategorieId() {
        return idSousCategorieId;
    }

    public void setIdSousCategorieId(Long sousCategorieId) {
        this.idSousCategorieId = sousCategorieId;
    }

    public String getIdSousCategorieNom() {
        return idSousCategorieNom;
    }

    public void setIdSousCategorieNom(String sousCategorieNom) {
        this.idSousCategorieNom = sousCategorieNom;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        StockDTO stockDTO = (StockDTO) o;
        if (stockDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), stockDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "StockDTO{" +
            "id=" + getId() +
            ", stockPhysique=" + getStockPhysique() +
            ", stockDisponible=" + getStockDisponible() +
            ", stockReserve=" + getStockReserve() +
            ", stockCommande=" + getStockCommande() +
            ", derniereEntre='" + getDerniereEntre() + "'" +
            ", derniereSortie='" + getDerniereSortie() + "'" +
            ", alerteStock='" + isAlerteStock() + "'" +
            ", creeLe='" + getCreeLe() + "'" +
            ", creePar='" + getCreePar() + "'" +
            ", modifieLe='" + getModifieLe() + "'" +
            ", modifiePar='" + getModifiePar() + "'" +
            ", refProduitId=" + getRefProduitId() +
            ", refProduitReference='" + getRefProduitReference() + "'" +
            ", idCategorieId=" + getIdCategorieId() +
            ", idCategorieNom='" + getIdCategorieNom() + "'" +
            ", idSousCategorieId=" + getIdSousCategorieId() +
            ", idSousCategorieNom='" + getIdSousCategorieNom() + "'" +
            "}";
    }
}
