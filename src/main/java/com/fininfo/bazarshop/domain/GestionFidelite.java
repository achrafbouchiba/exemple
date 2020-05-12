package com.fininfo.bazarshop.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import org.springframework.data.elasticsearch.annotations.FieldType;
import java.io.Serializable;
import java.util.Objects;
import java.time.LocalDate;

import com.fininfo.bazarshop.domain.enumeration.Devise;

/**
 * A GestionFidelite.
 */
@Entity
@Table(name = "gestion_fidelite")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@org.springframework.data.elasticsearch.annotations.Document(indexName = "gestionfidelite")
public class GestionFidelite implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "nom", nullable = false)
    private String nom;

    @NotNull
    @Column(name = "points", nullable = false)
    private Integer points;

    @NotNull
    @Column(name = "valeur", nullable = false)
    private Double valeur;

    @NotNull
    @Column(name = "clientsilvermin", nullable = false)
    private Integer clientsilvermin;

    @NotNull
    @Column(name = "clientsilvermax", nullable = false)
    private Integer clientsilvermax;

    @NotNull
    @Column(name = "clientgoldmin", nullable = false)
    private Integer clientgoldmin;

    @NotNull
    @Column(name = "clientgoldmax", nullable = false)
    private Integer clientgoldmax;

    @NotNull
    @Column(name = "clientpremiummin", nullable = false)
    private Integer clientpremiummin;

    @NotNull
    @Column(name = "clientpremiummax", nullable = false)
    private Integer clientpremiummax;

    @Enumerated(EnumType.STRING)
    @Column(name = "devise")
    private Devise devise;

    @Column(name = "etat")
    private Boolean etat;

    @Column(name = "cree_le")
    private LocalDate creeLe;

    @Column(name = "cree_par")
    private String creePar;

    @Column(name = "modifie_le")
    private LocalDate modifieLe;

    @Column(name = "modifie_par")
    private String modifiePar;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNom() {
        return nom;
    }

    public GestionFidelite nom(String nom) {
        this.nom = nom;
        return this;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public Integer getPoints() {
        return points;
    }

    public GestionFidelite points(Integer points) {
        this.points = points;
        return this;
    }

    public void setPoints(Integer points) {
        this.points = points;
    }

    public Double getValeur() {
        return valeur;
    }

    public GestionFidelite valeur(Double valeur) {
        this.valeur = valeur;
        return this;
    }

    public void setValeur(Double valeur) {
        this.valeur = valeur;
    }

    public Integer getClientsilvermin() {
        return clientsilvermin;
    }

    public GestionFidelite clientsilvermin(Integer clientsilvermin) {
        this.clientsilvermin = clientsilvermin;
        return this;
    }

    public void setClientsilvermin(Integer clientsilvermin) {
        this.clientsilvermin = clientsilvermin;
    }

    public Integer getClientsilvermax() {
        return clientsilvermax;
    }

    public GestionFidelite clientsilvermax(Integer clientsilvermax) {
        this.clientsilvermax = clientsilvermax;
        return this;
    }

    public void setClientsilvermax(Integer clientsilvermax) {
        this.clientsilvermax = clientsilvermax;
    }

    public Integer getClientgoldmin() {
        return clientgoldmin;
    }

    public GestionFidelite clientgoldmin(Integer clientgoldmin) {
        this.clientgoldmin = clientgoldmin;
        return this;
    }

    public void setClientgoldmin(Integer clientgoldmin) {
        this.clientgoldmin = clientgoldmin;
    }

    public Integer getClientgoldmax() {
        return clientgoldmax;
    }

    public GestionFidelite clientgoldmax(Integer clientgoldmax) {
        this.clientgoldmax = clientgoldmax;
        return this;
    }

    public void setClientgoldmax(Integer clientgoldmax) {
        this.clientgoldmax = clientgoldmax;
    }

    public Integer getClientpremiummin() {
        return clientpremiummin;
    }

    public GestionFidelite clientpremiummin(Integer clientpremiummin) {
        this.clientpremiummin = clientpremiummin;
        return this;
    }

    public void setClientpremiummin(Integer clientpremiummin) {
        this.clientpremiummin = clientpremiummin;
    }

    public Integer getClientpremiummax() {
        return clientpremiummax;
    }

    public GestionFidelite clientpremiummax(Integer clientpremiummax) {
        this.clientpremiummax = clientpremiummax;
        return this;
    }

    public void setClientpremiummax(Integer clientpremiummax) {
        this.clientpremiummax = clientpremiummax;
    }

    public Devise getDevise() {
        return devise;
    }

    public GestionFidelite devise(Devise devise) {
        this.devise = devise;
        return this;
    }

    public void setDevise(Devise devise) {
        this.devise = devise;
    }

    public Boolean isEtat() {
        return etat;
    }

    public GestionFidelite etat(Boolean etat) {
        this.etat = etat;
        return this;
    }

    public void setEtat(Boolean etat) {
        this.etat = etat;
    }

    public LocalDate getCreeLe() {
        return creeLe;
    }

    public GestionFidelite creeLe(LocalDate creeLe) {
        this.creeLe = creeLe;
        return this;
    }

    public void setCreeLe(LocalDate creeLe) {
        this.creeLe = creeLe;
    }

    public String getCreePar() {
        return creePar;
    }

    public GestionFidelite creePar(String creePar) {
        this.creePar = creePar;
        return this;
    }

    public void setCreePar(String creePar) {
        this.creePar = creePar;
    }

    public LocalDate getModifieLe() {
        return modifieLe;
    }

    public GestionFidelite modifieLe(LocalDate modifieLe) {
        this.modifieLe = modifieLe;
        return this;
    }

    public void setModifieLe(LocalDate modifieLe) {
        this.modifieLe = modifieLe;
    }

    public String getModifiePar() {
        return modifiePar;
    }

    public GestionFidelite modifiePar(String modifiePar) {
        this.modifiePar = modifiePar;
        return this;
    }

    public void setModifiePar(String modifiePar) {
        this.modifiePar = modifiePar;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof GestionFidelite)) {
            return false;
        }
        return id != null && id.equals(((GestionFidelite) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "GestionFidelite{" +
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
