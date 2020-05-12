package com.fininfo.bazarshop.service.dto;

import java.time.LocalDate;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link com.fininfo.bazarshop.domain.CodePostaux} entity.
 */
public class CodePostauxDTO implements Serializable {
    
    private Long id;

    private String gouvernorat;

    private String ville;

    private String localite;

    private Integer codePostal;

    private String zone;

    private LocalDate modifieLe;

    private String modifiePar;

    
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public Integer getCodePostal() {
        return codePostal;
    }

    public void setCodePostal(Integer codePostal) {
        this.codePostal = codePostal;
    }

    public String getZone() {
        return zone;
    }

    public void setZone(String zone) {
        this.zone = zone;
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

        CodePostauxDTO codePostauxDTO = (CodePostauxDTO) o;
        if (codePostauxDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), codePostauxDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "CodePostauxDTO{" +
            "id=" + getId() +
            ", gouvernorat='" + getGouvernorat() + "'" +
            ", ville='" + getVille() + "'" +
            ", localite='" + getLocalite() + "'" +
            ", codePostal=" + getCodePostal() +
            ", zone='" + getZone() + "'" +
            ", modifieLe='" + getModifieLe() + "'" +
            ", modifiePar='" + getModifiePar() + "'" +
            "}";
    }
}
