package com.fininfo.bazarshop.service.mapper;


import com.fininfo.bazarshop.domain.*;
import com.fininfo.bazarshop.service.dto.ProduitDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Produit} and its DTO {@link ProduitDTO}.
 */
@Mapper(componentModel = "spring", uses = {SousCategorieMapper.class, ProduitUniteMapper.class})
public interface ProduitMapper extends EntityMapper<ProduitDTO, Produit> {

    @Mapping(source = "sousCategorie.id", target = "sousCategorieId")
    @Mapping(source = "sousCategorie.nom", target = "sousCategorieNom")
    @Mapping(source = "unite.id", target = "uniteId")
    @Mapping(source = "unite.unite", target = "uniteUnite")
    ProduitDTO toDto(Produit produit);

    @Mapping(target = "stocks", ignore = true)
    @Mapping(target = "removeStock", ignore = true)
    @Mapping(target = "mouvementStocks", ignore = true)
    @Mapping(target = "removeMouvementStock", ignore = true)
    @Mapping(target = "commandeLignes", ignore = true)
    @Mapping(target = "removeCommandeLignes", ignore = true)
    @Mapping(target = "remises", ignore = true)
    @Mapping(target = "removeRemise", ignore = true)
    @Mapping(source = "sousCategorieId", target = "sousCategorie")
    @Mapping(source = "uniteId", target = "unite")
    Produit toEntity(ProduitDTO produitDTO);

    default Produit fromId(Long id) {
        if (id == null) {
            return null;
        }
        Produit produit = new Produit();
        produit.setId(id);
        return produit;
    }
}
