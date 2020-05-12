package com.fininfo.bazarshop.service.dto;

import java.time.LocalDate;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link com.fininfo.bazarshop.domain.Adresse} entity.
 */
public class AdresseDTO implements Serializable {
    
    private Long id;

    private Boolean principale;

    @NotNull
    private String nom;

    @NotNull
    private String prenom;

    @NotNull
    private String adresseLigne1;

    @NotNull
    private String gouvernorat;

    private String ville;

    private String localite;

    private String indication;

    private Integer telephone;

    private Integer mobile;

    private LocalDate creeLe;

    private String creePar;

    private LocalDate modifieLe;

    private String modifiePar;


    private Long clientId;

    private Long zoneId;

    private String zoneNom;

    private Long codePostalId;

    private String codePostalCodePostal;
    
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Boolean isPrincipale() {
        return principale;
    }

    public void setPrincipale(Boolean principale) {
        this.principale = principale;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getPrenom() {
        return prenom;
    }

    public void setPrenom(String prenom) {
        this.prenom = prenom;
    }

    public String getAdresseLigne1() {
        return adresseLigne1;
    }

    public void setAdresseLigne1(String adresseLigne1) {
        this.adresseLigne1 = adresseLigne1;
    }

    public String getGouvernorat() {
        return gouvernorat;
    }

    public void setGouvernorat(String gouvernorat) {
        this.gouvernorat = gouvernorat;
    }

    public String getVille() {
        return ville;
    }

    public void setVille(String ville) {
        this.ville = ville;
    }

    public String getLocalite() {
        return localite;
    }

    public void setLocalite(String localite) {
        this.localite = localite;
    }

    public String getIndication() {
        return indication;
    }

    public void setIndication(String indication) {
        this.indication = indication;
    }

    public Integer getTelephone() {
        return telephone;
    }

    public void setTelephone(Integer telephone) {
        this.telephone = telephone;
    }

    public Integer getMobile() {
        return mobile;
    }

    public void setMobile(Integer mobile) {
        this.mobile = mobile;
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

    public Long getClientId() {
        return clientId;
    }

    public void setClientId(Long clientId) {
        this.clientId = clientId;
    }

    public Long getZoneId() {
        return zoneId;
    }

    public void setZoneId(Long zoneId) {
        this.zoneId = zoneId;
    }

    public String getZoneNom() {
        return zoneNom;
    }

    public void setZoneNom(String zoneNom) {
        this.zoneNom = zoneNom;
    }

    public Long getCodePostalId() {
        return codePostalId;
    }

    public void setCodePostalId(Long codePostauxId) {
        this.codePostalId = codePostauxId;
    }

    public String getCodePostalCodePostal() {
        return codePostalCodePostal;
    }

    public void setCodePostalCodePostal(String codePostauxCodePostal) {
        this.codePostalCodePostal = codePostauxCodePostal;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        AdresseDTO adresseDTO = (AdresseDTO) o;
        if (adresseDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), adresseDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "AdresseDTO{" +
            "id=" + getId() +
            ", principale='" + isPrincipale() + "'" +
            ", nom='" + getNom() + "'" +
            ", prenom='" + getPrenom() + "'" +
            ", adresseLigne1='" + getAdresseLigne1() + "'" +
            ", gouvernorat='" + getGouvernorat() + "'" +
            ", ville='" + getVille() + "'" +
            ", localite='" + getLocalite() + "'" +
            ", indication='" + getIndication() + "'" +
            ", telephone=" + getTelephone() +
            ", mobile=" + getMobile() +
            ", creeLe='" + getCreeLe() + "'" +
            ", creePar='" + getCreePar() + "'" +
            ", modifieLe='" + getModifieLe() + "'" +
            ", modifiePar='" + getModifiePar() + "'" +
            ", clientId=" + getClientId() +
            ", zoneId=" + getZoneId() +
            ", zoneNom='" + getZoneNom() + "'" +
            ", codePostalId=" + getCodePostalId() +
            ", codePostalCodePostal='" + getCodePostalCodePostal() + "'" +
            "}";
    }
}
