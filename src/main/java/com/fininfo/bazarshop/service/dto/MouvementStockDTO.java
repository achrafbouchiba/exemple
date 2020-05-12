package com.fininfo.bazarshop.service.dto;

import java.time.LocalDate;
import java.io.Serializable;
import java.util.Objects;
import com.fininfo.bazarshop.domain.enumeration.TypeMvt;

/**
 * A DTO for the {@link com.fininfo.bazarshop.domain.MouvementStock} entity.
 */
public class MouvementStockDTO implements Serializable {
    
    private Long id;

    private TypeMvt type;

    private LocalDate date;

    private Integer sens;

    private Double quantite;

    private LocalDate creeLe;

    private String creePar;

    private LocalDate modifieLe;

    private String modifiePar;


    private Long refProduitId;

    private String refProduitReference;

    private Long refCommandeId;

    private String refCommandeReference;
    
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public TypeMvt getType() {
        return type;
    }

    public void setType(TypeMvt type) {
        this.type = type;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public Integer getSens() {
        return sens;
    }

    public void setSens(Integer sens) {
        this.sens = sens;
    }

    public Double getQuantite() {
        return quantite;
    }

    public void setQuantite(Double quantite) {
        this.quantite = quantite;
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

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        MouvementStockDTO mouvementStockDTO = (MouvementStockDTO) o;
        if (mouvementStockDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), mouvementStockDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "MouvementStockDTO{" +
            "id=" + getId() +
            ", type='" + getType() + "'" +
            ", date='" + getDate() + "'" +
            ", sens=" + getSens() +
            ", quantite=" + getQuantite() +
            ", creeLe='" + getCreeLe() + "'" +
            ", creePar='" + getCreePar() + "'" +
            ", modifieLe='" + getModifieLe() + "'" +
            ", modifiePar='" + getModifiePar() + "'" +
            ", refProduitId=" + getRefProduitId() +
            ", refProduitReference='" + getRefProduitReference() + "'" +
            ", refCommandeId=" + getRefCommandeId() +
            ", refCommandeReference='" + getRefCommandeReference() + "'" +
            "}";
    }
}
