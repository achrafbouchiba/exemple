package com.fininfo.bazarshop.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import org.springframework.data.elasticsearch.annotations.FieldType;
import java.io.Serializable;
import java.util.Objects;
import java.time.LocalDate;

import com.fininfo.bazarshop.domain.enumeration.CatClient;

/**
 * A Remise.
 */
@Entity
@Table(name = "remise")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@org.springframework.data.elasticsearch.annotations.Document(indexName = "remise")
public class Remise implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "categorie_client")
    private CatClient categorieClient;

    @Column(name = "prix")
    private Double prix;

    @Column(name = "remise")
    private Double remise;

    @Column(name = "cumulable")
    private Boolean cumulable;

    @Column(name = "debut_promo")
    private LocalDate debutPromo;

    @Column(name = "fin_promo")
    private LocalDate finPromo;

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

    @ManyToOne
    @JsonIgnoreProperties("remises")
    private Produit refProduit;

    @ManyToOne
    @JsonIgnoreProperties("remises")
    private SousCategorie sousCategorie;

    @ManyToOne
    @JsonIgnoreProperties("remises")
    private Categorie categorie;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public CatClient getCategorieClient() {
        return categorieClient;
    }

    public Remise categorieClient(CatClient categorieClient) {
        this.categorieClient = categorieClient;
        return this;
    }

    public void setCategorieClient(CatClient categorieClient) {
        this.categorieClient = categorieClient;
    }

    public Double getPrix() {
        return prix;
    }

    public Remise prix(Double prix) {
        this.prix = prix;
        return this;
    }

    public void setPrix(Double prix) {
        this.prix = prix;
    }

    public Double getRemise() {
        return remise;
    }

    public Remise remise(Double remise) {
        this.remise = remise;
        return this;
    }

    public void setRemise(Double remise) {
        this.remise = remise;
    }

    public Boolean isCumulable() {
        return cumulable;
    }

    public Remise cumulable(Boolean cumulable) {
        this.cumulable = cumulable;
        return this;
    }

    public void setCumulable(Boolean cumulable) {
        this.cumulable = cumulable;
    }

    public LocalDate getDebutPromo() {
        return debutPromo;
    }

    public Remise debutPromo(LocalDate debutPromo) {
        this.debutPromo = debutPromo;
        return this;
    }

    public void setDebutPromo(LocalDate debutPromo) {
        this.debutPromo = debutPromo;
    }

    public LocalDate getFinPromo() {
        return finPromo;
    }

    public Remise finPromo(LocalDate finPromo) {
        this.finPromo = finPromo;
        return this;
    }

    public void setFinPromo(LocalDate finPromo) {
        this.finPromo = finPromo;
    }

    public Boolean isEtat() {
        return etat;
    }

    public Remise etat(Boolean etat) {
        this.etat = etat;
        return this;
    }

    public void setEtat(Boolean etat) {
        this.etat = etat;
    }

    public LocalDate getCreeLe() {
        return creeLe;
    }

    public Remise creeLe(LocalDate creeLe) {
        this.creeLe = creeLe;
        return this;
    }

    public void setCreeLe(LocalDate creeLe) {
        this.creeLe = creeLe;
    }

    public String getCreePar() {
        return creePar;
    }

    public Remise creePar(String creePar) {
        this.creePar = creePar;
        return this;
    }

    public void setCreePar(String creePar) {
        this.creePar = creePar;
    }

    public LocalDate getModifieLe() {
        return modifieLe;
    }

    public Remise modifieLe(LocalDate modifieLe) {
        this.modifieLe = modifieLe;
        return this;
    }

    public void setModifieLe(LocalDate modifieLe) {
        this.modifieLe = modifieLe;
    }

    public String getModifiePar() {
        return modifiePar;
    }

    public Remise modifiePar(String modifiePar) {
        this.modifiePar = modifiePar;
        return this;
    }

    public void setModifiePar(String modifiePar) {
        this.modifiePar = modifiePar;
    }

    public Produit getRefProduit() {
        return refProduit;
    }

    public Remise refProduit(Produit produit) {
        this.refProduit = produit;
        return this;
    }

    public void setRefProduit(Produit produit) {
        this.refProduit = produit;
    }

    public SousCategorie getSousCategorie() {
        return sousCategorie;
    }

    public Remise sousCategorie(SousCategorie sousCategorie) {
        this.sousCategorie = sousCategorie;
        return this;
    }

    public void setSousCategorie(SousCategorie sousCategorie) {
        this.sousCategorie = sousCategorie;
    }

    public Categorie getCategorie() {
        return categorie;
    }

    public Remise categorie(Categorie categorie) {
        this.categorie = categorie;
        return this;
    }

    public void setCategorie(Categorie categorie) {
        this.categorie = categorie;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Remise)) {
            return false;
        }
        return id != null && id.equals(((Remise) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Remise{" +
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
            "}";
    }
}
