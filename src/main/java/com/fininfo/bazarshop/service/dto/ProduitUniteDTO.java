package com.fininfo.bazarshop.service.dto;

import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link com.fininfo.bazarshop.domain.ProduitUnite} entity.
 */
public class ProduitUniteDTO implements Serializable {
    
    private Long id;

    private String unite;

    
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUnite() {
        return unite;
    }

    public void setUnite(String unite) {
        this.unite = unite;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        ProduitUniteDTO produitUniteDTO = (ProduitUniteDTO) o;
        if (produitUniteDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), produitUniteDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ProduitUniteDTO{" +
            "id=" + getId() +
            ", unite='" + getUnite() + "'" +
            "}";
    }
}
