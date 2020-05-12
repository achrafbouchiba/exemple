package com.fininfo.bazarshop.service.dto;

import java.time.LocalDate;
import java.io.Serializable;
import java.util.Objects;
import com.fininfo.bazarshop.domain.enumeration.CatClient;

/**
 * A DTO for the {@link com.fininfo.bazarshop.domain.Remise} entity.
 */
public class RemiseDTO implements Serializable {
    
    private Long id;

    private CatClient categorieClient;

    private Double prix;

    private Double remise;

    private Boolean cumulable;

    private LocalDate debutPromo;

    private LocalDate finPromo;

    private Boolean etat;

    private LocalDate creeLe;

    private String creePar;

    private LocalDate modifieLe;

    private String modifiePar;


    private Long refProduitId;

    private String refProduitReference;

    private Long sousCategorieId;

    private String sousCategorieNom;

    private Long categorieId;

    private String categorieNom;
    
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public CatClient getCategorieClient() {
        return categorieClient;
    }

    public void setCategorieClient(CatClient categorieClient) {
        this.categorieClient = categorieClient;
    }

    public Double getPrix() {
        return prix;
    }

    public void setPrix(Double prix) {
        this.prix = prix;
    }

    public Double getRemise() {
        return remise;
    }

    public void setRemise(Double remise) {
        this.remise = remise;
    }

    public Boolean isCumulable() {
        return cumulable;
    }

    public void setCumulable(Boolean cumulable) {
        this.cumulable = cumulable;
    }

    public LocalDate getDebutPromo() {
        return debutPromo;
    }

    public void setDebutPromo(LocalDate debutPromo) {
        this.debutPromo = debutPromo;
    }

    public LocalDate getFinPromo() {
        return finPromo;
    }

    public void setFinPromo(LocalDate finPromo) {
        this.finPromo = finPromo;
    }

    public Boolean isEtat() {
        return etat;
    }

    public void setEtat(Boolean etat) {
        this.etat = etat;
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

    public Long getSousCategorieId() {
        return sousCategorieId;
    }

    public void setSousCategorieId(Long sousCategorieId) {
        this.sousCategorieId = sousCategorieId;
    }

    public String getSousCategorieNom() {
        return sousCategorieNom;
    }

    public void setSousCategorieNom(String sousCategorieNom) {
        this.sousCategorieNom = sousCategorieNom;
    }

    public Long getCategorieId() {
        return categorieId;
    }

    public void setCategorieId(Long categorieId) {
        this.categorieId = categorieId;
    }

    public String getCategorieNom() {
        return categorieNom;
    }

    public void setCategorieNom(String categorieNom) {
        this.categorieNom = categorieNom;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        RemiseDTO remiseDTO = (RemiseDTO) o;
        if (remiseDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), remiseDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "RemiseDTO{" +
            "id=" + getId() +
            ", categorieClient='" + getCategorieClient() + "'" +
            ", prix=" + getPrix() +
            ", remise=" + getRemise() +
            ", cumulable='" + isCumulable() + "'" +
            ", debutPromo='" + getDebutPromo() + "'" +
            ", finPromo='" + getFinPromo() + "'" +
            ", etat='" + isEtat() + "'" +
            ", creeLe='" + getCreeLe() + "'" +
            ", creePar='" + getCreePar() + "'" +
            ", modifieLe='" + getModifieLe() + "'" +
            ", modifiePar='" + getModifiePar() + "'" +
            ", refProduitId=" + getRefProduitId() +
            ", refProduitReference='" + getRefProduitReference() + "'" +
            ", sousCategorieId=" + getSousCategorieId() +
            ", sousCategorieNom='" + getSousCategorieNom() + "'" +
            ", categorieId=" + getCategorieId() +
            ", categorieNom='" + getCategorieNom() + "'" +
            "}";
    }
}
