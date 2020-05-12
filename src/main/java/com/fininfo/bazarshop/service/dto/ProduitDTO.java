package com.fininfo.bazarshop.service.dto;

import java.time.LocalDate;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;
import javax.persistence.Lob;
import com.fininfo.bazarshop.domain.enumeration.SourcePrd;

/**
 * A DTO for the {@link com.fininfo.bazarshop.domain.Produit} entity.
 */
public class ProduitDTO implements Serializable {
    
    private Long id;

    @NotNull
    @Pattern(regexp = "^([\\S]{1,25}$)*")
    private String reference;

    @NotNull
    private String nom;

    private Integer codeBarre;

    private String description;

    @NotNull
    private Boolean etat;

    private String marque;

    private String nature;

    private Double stockMinimum;

    private Double quantiteVenteMax;

    private Boolean horsStock;

    private Boolean gereEnStock;

    private LocalDate datePremption;

    private Double prixHT;

    private Double tauxTVA;

    private Double prixTTC;

    @NotNull
    private SourcePrd sourceProduit;

    @Pattern(regexp = "^[1-5]$")
    private String rating;

    private Double remise;

    @Lob
    private byte[] image;

    private String imageContentType;
    private LocalDate creeLe;

    private String creePar;

    private LocalDate modifieLe;

    private String modifiePar;


    private Long sousCategorieId;

    private String sousCategorieNom;

    private Long uniteId;

    private String uniteUnite;
    
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getReference() {
        return reference;
    }

    public void setReference(String reference) {
        this.reference = reference;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public Integer getCodeBarre() {
        return codeBarre;
    }

    public void setCodeBarre(Integer codeBarre) {
        this.codeBarre = codeBarre;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Boolean isEtat() {
        return etat;
    }

    public void setEtat(Boolean etat) {
        this.etat = etat;
    }

    public String getMarque() {
        return marque;
    }

    public void setMarque(String marque) {
        this.marque = marque;
    }

    public String getNature() {
        return nature;
    }

    public void setNature(String nature) {
        this.nature = nature;
    }

    public Double getStockMinimum() {
        return stockMinimum;
    }

    public void setStockMinimum(Double stockMinimum) {
        this.stockMinimum = stockMinimum;
    }

    public Double getQuantiteVenteMax() {
        return quantiteVenteMax;
    }

    public void setQuantiteVenteMax(Double quantiteVenteMax) {
        this.quantiteVenteMax = quantiteVenteMax;
    }

    public Boolean isHorsStock() {
        return horsStock;
    }

    public void setHorsStock(Boolean horsStock) {
        this.horsStock = horsStock;
    }

    public Boolean isGereEnStock() {
        return gereEnStock;
    }

    public void setGereEnStock(Boolean gereEnStock) {
        this.gereEnStock = gereEnStock;
    }

    public LocalDate getDatePremption() {
        return datePremption;
    }

    public void setDatePremption(LocalDate datePremption) {
        this.datePremption = datePremption;
    }

    public Double getPrixHT() {
        return prixHT;
    }

    public void setPrixHT(Double prixHT) {
        this.prixHT = prixHT;
    }

    public Double getTauxTVA() {
        return tauxTVA;
    }

    public void setTauxTVA(Double tauxTVA) {
        this.tauxTVA = tauxTVA;
    }

    public Double getPrixTTC() {
        return prixTTC;
    }

    public void setPrixTTC(Double prixTTC) {
        this.prixTTC = prixTTC;
    }

    public SourcePrd getSourceProduit() {
        return sourceProduit;
    }

    public void setSourceProduit(SourcePrd sourceProduit) {
        this.sourceProduit = sourceProduit;
    }

    public String getRating() {
        return rating;
    }

    public void setRating(String rating) {
        this.rating = rating;
    }

    public Double getRemise() {
        return remise;
    }

    public void setRemise(Double remise) {
        this.remise = remise;
    }

    public byte[] getImage() {
        return image;
    }

    public void setImage(byte[] image) {
        this.image = image;
    }

    public String getImageContentType() {
        return imageContentType;
    }

    public void setImageContentType(String imageContentType) {
        this.imageContentType = imageContentType;
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

    public Long getUniteId() {
        return uniteId;
    }

    public void setUniteId(Long produitUniteId) {
        this.uniteId = produitUniteId;
    }

    public String getUniteUnite() {
        return uniteUnite;
    }

    public void setUniteUnite(String produitUniteUnite) {
        this.uniteUnite = produitUniteUnite;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        ProduitDTO produitDTO = (ProduitDTO) o;
        if (produitDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), produitDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ProduitDTO{" +
            "id=" + getId() +
            ", reference='" + getReference() + "'" +
            ", nom='" + getNom() + "'" +
            ", codeBarre=" + getCodeBarre() +
            ", description='" + getDescription() + "'" +
            ", etat='" + isEtat() + "'" +
            ", marque='" + getMarque() + "'" +
            ", nature='" + getNature() + "'" +
            ", stockMinimum=" + getStockMinimum() +
            ", quantiteVenteMax=" + getQuantiteVenteMax() +
            ", horsStock='" + isHorsStock() + "'" +
            ", gereEnStock='" + isGereEnStock() + "'" +
            ", datePremption='" + getDatePremption() + "'" +
            ", prixHT=" + getPrixHT() +
            ", tauxTVA=" + getTauxTVA() +
            ", prixTTC=" + getPrixTTC() +
            ", sourceProduit='" + getSourceProduit() + "'" +
            ", rating='" + getRating() + "'" +
            ", remise=" + getRemise() +
            ", image='" + getImage() + "'" +
            ", creeLe='" + getCreeLe() + "'" +
            ", creePar='" + getCreePar() + "'" +
            ", modifieLe='" + getModifieLe() + "'" +
            ", modifiePar='" + getModifiePar() + "'" +
            ", sousCategorieId=" + getSousCategorieId() +
            ", sousCategorieNom='" + getSousCategorieNom() + "'" +
            ", uniteId=" + getUniteId() +
            ", uniteUnite='" + getUniteUnite() + "'" +
            "}";
    }
}
