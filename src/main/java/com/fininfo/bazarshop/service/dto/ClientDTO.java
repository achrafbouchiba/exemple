package com.fininfo.bazarshop.service.dto;

import java.time.LocalDate;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;
import com.fininfo.bazarshop.domain.enumeration.Civilite;
import com.fininfo.bazarshop.domain.enumeration.RegMod;
import com.fininfo.bazarshop.domain.enumeration.CatClient;

/**
 * A DTO for the {@link com.fininfo.bazarshop.domain.Client} entity.
 */
public class ClientDTO implements Serializable {
    
    private Long id;

    @NotNull
    private Civilite civilite;

    @NotNull
    private String nom;

    @NotNull
    private String prenom;

    @NotNull
    private LocalDate dateDeNaissance;

    @NotNull
    @Pattern(regexp = "^([a-zA-Z0-9_\\-\\.]+)@([a-zA-Z0-9_\\-\\.]+)\\.([a-zA-Z]{2,5})$")
    private String email;

    @NotNull
    private Integer mobile;

    private RegMod reglement;

    private Boolean etat;

    private LocalDate derniereVisite;

    private Double totalAchat;

    @NotNull
    private CatClient categorie;

    private Integer pointsFidelite;

    private LocalDate creeLe;

    private String creePar;

    private LocalDate modifieLe;

    private String modifiePar;

    
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Civilite getCivilite() {
        return civilite;
    }

    public void setCivilite(Civilite civilite) {
        this.civilite = civilite;
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

    public LocalDate getDateDeNaissance() {
        return dateDeNaissance;
    }

    public void setDateDeNaissance(LocalDate dateDeNaissance) {
        this.dateDeNaissance = dateDeNaissance;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Integer getMobile() {
        return mobile;
    }

    public void setMobile(Integer mobile) {
        this.mobile = mobile;
    }

    public RegMod getReglement() {
        return reglement;
    }

    public void setReglement(RegMod reglement) {
        this.reglement = reglement;
    }

    public Boolean isEtat() {
        return etat;
    }

    public void setEtat(Boolean etat) {
        this.etat = etat;
    }

    public LocalDate getDerniereVisite() {
        return derniereVisite;
    }

    public void setDerniereVisite(LocalDate derniereVisite) {
        this.derniereVisite = derniereVisite;
    }

    public Double getTotalAchat() {
        return totalAchat;
    }

    public void setTotalAchat(Double totalAchat) {
        this.totalAchat = totalAchat;
    }

    public CatClient getCategorie() {
        return categorie;
    }

    public void setCategorie(CatClient categorie) {
        this.categorie = categorie;
    }

    public Integer getPointsFidelite() {
        return pointsFidelite;
    }

    public void setPointsFidelite(Integer pointsFidelite) {
        this.pointsFidelite = pointsFidelite;
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

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        ClientDTO clientDTO = (ClientDTO) o;
        if (clientDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), clientDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ClientDTO{" +
            "id=" + getId() +
            ", civilite='" + getCivilite() + "'" +
            ", nom='" + getNom() + "'" +
            ", prenom='" + getPrenom() + "'" +
            ", dateDeNaissance='" + getDateDeNaissance() + "'" +
            ", email='" + getEmail() + "'" +
            ", mobile=" + getMobile() +
            ", reglement='" + getReglement() + "'" +
            ", etat='" + isEtat() + "'" +
            ", derniereVisite='" + getDerniereVisite() + "'" +
            ", totalAchat=" + getTotalAchat() +
            ", categorie='" + getCategorie() + "'" +
            ", pointsFidelite=" + getPointsFidelite() +
            ", creeLe='" + getCreeLe() + "'" +
            ", creePar='" + getCreePar() + "'" +
            ", modifieLe='" + getModifieLe() + "'" +
            ", modifiePar='" + getModifiePar() + "'" +
            "}";
    }
}
