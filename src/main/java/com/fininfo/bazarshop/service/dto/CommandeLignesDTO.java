package com.fininfo.bazarshop.service.dto;

import java.time.LocalDate;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link com.fininfo.bazarshop.domain.CommandeLignes} entity.
 */
public class CommandeLignesDTO implements Serializable {
    
    private Long id;

    private Double quantite;

    private Double prixHT;

    private Double tva;

    private Double prixTTC;

    private LocalDate creeLe;

    private String creePar;

    private LocalDate modifieLe;

    private String modifiePar;


    private Long refCommandeId;

    private String refCommandeReference;

    private Long refProduitId;

    private String refProduitReference;
    
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Double getQuantite() {
        return quantite;
    }

    public void setQuantite(Double quantite) {
        this.quantite = quantite;
    }

    public Double getPrixHT() {
        return prixHT;
    }

    public void setPrixHT(Double prixHT) {
        this.prixHT = prixHT;
    }

    public Double getTva() {
        return tva;
    }

    public void setTva(Double tva) {
        this.tva = tva;
    }

    public Double getPrixTTC() {
        return prixTTC;
    }

    public void setPrixTTC(Double prixTTC) {
        this.prixTTC = prixTTC;
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

    public Long getRefCommandeId() {
        return refCommandeId;
    }

    public void setRefCommandeId(Long commandeId) {
        this.refCommandeId = commandeId;
    }

    public String getRefCommandeReference() {
        return refCommandeReference;
    }

    public void setRefCommandeReference(String commandeReference) {
        this.refCommandeReference = commandeReference;
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

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        CommandeLignesDTO commandeLignesDTO = (CommandeLignesDTO) o;
        if (commandeLignesDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), commandeLignesDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "CommandeLignesDTO{" +
            "id=" + getId() +
            ", quantite=" + getQuantite() +
            ", prixHT=" + getPrixHT() +
            ", tva=" + getTva() +
            ", prixTTC=" + getPrixTTC() +
            ", creeLe='" + getCreeLe() + "'" +
            ", creePar='" + getCreePar() + "'" +
            ", modifieLe='" + getModifieLe() + "'" +
            ", modifiePar='" + getModifiePar() + "'" +
            ", refCommandeId=" + getRefCommandeId() +
            ", refCommandeReference='" + getRefCommandeReference() + "'" +
            ", refProduitId=" + getRefProduitId() +
            ", refProduitReference='" + getRefProduitReference() + "'" +
            "}";
    }
}
