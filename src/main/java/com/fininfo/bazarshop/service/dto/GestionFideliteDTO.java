package com.fininfo.bazarshop.service.dto;

import java.time.LocalDate;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;
import com.fininfo.bazarshop.domain.enumeration.Devise;

/**
 * A DTO for the {@link com.fininfo.bazarshop.domain.GestionFidelite} entity.
 */
public class GestionFideliteDTO implements Serializable {
    
    private Long id;

    @NotNull
    private String nom;

    @NotNull
    private Integer points;

    @NotNull
    private Double valeur;

    @NotNull
    private Integer clientsilvermin;

    @NotNull
    private Integer clientsilvermax;

    @NotNull
    private Integer clientgoldmin;

    @NotNull
    private Integer clientgoldmax;

    @NotNull
    private Integer clientpremiummin;

    @NotNull
    private Integer clientpremiummax;

    private Devise devise;

    private Boolean etat;

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

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public Integer getPoints() {
        return points;
    }

    public void setPoints(Integer points) {
        this.points = points;
    }

    public Double getValeur() {
        return valeur;
    }

    public void setValeur(Double valeur) {
        this.valeur = valeur;
    }

    public Integer getClientsilvermin() {
        return clientsilvermin;
    }

    public void setClientsilvermin(Integer clientsilvermin) {
        this.clientsilvermin = clientsilvermin;
    }

    public Integer getClientsilvermax() {
        return clientsilvermax;
    }

    public void setClientsilvermax(Integer clientsilvermax) {
        this.clientsilvermax = clientsilvermax;
    }

    public Integer getClientgoldmin() {
        return clientgoldmin;
    }

    public void setClientgoldmin(Integer clientgoldmin) {
        this.clientgoldmin = clientgoldmin;
    }

    public Integer getClientgoldmax() {
        return clientgoldmax;
    }

    public void setClientgoldmax(Integer clientgoldmax) {
        this.clientgoldmax = clientgoldmax;
    }

    public Integer getClientpremiummin() {
        return clientpremiummin;
    }

    public void setClientpremiummin(Integer clientpremiummin) {
        this.clientpremiummin = clientpremiummin;
    }

    public Integer getClientpremiummax() {
        return clientpremiummax;
    }

    public void setClientpremiummax(Integer clientpremiummax) {
        this.clientpremiummax = clientpremiummax;
    }

    public Devise getDevise() {
        return devise;
    }

    public void setDevise(Devise devise) {
        this.devise = devise;
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

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        GestionFideliteDTO gestionFideliteDTO = (GestionFideliteDTO) o;
        if (gestionFideliteDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), gestionFideliteDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "GestionFideliteDTO{" +
            "id=" + getId() +
            ", nom='" + getNom() + "'" +
            ", points=" + getPoints() +
            ", valeur=" + getValeur() +
            ", clientsilvermin=" + getClientsilvermin() +
            ", clientsilvermax=" + getClientsilvermax() +
            ", clientgoldmin=" + getClientgoldmin() +
            ", clientgoldmax=" + getClientgoldmax() +
            ", clientpremiummin=" + getClientpremiummin() +
            ", clientpremiummax=" + getClientpremiummax() +
            ", devise='" + getDevise() + "'" +
            ", etat='" + isEtat() + "'" +
            ", creeLe='" + getCreeLe() + "'" +
            ", creePar='" + getCreePar() + "'" +
            ", modifieLe='" + getModifieLe() + "'" +
            ", modifiePar='" + getModifiePar() + "'" +
            "}";
    }
}
