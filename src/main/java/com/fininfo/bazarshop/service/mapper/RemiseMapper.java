package com.fininfo.bazarshop.service.mapper;


import com.fininfo.bazarshop.domain.*;
import com.fininfo.bazarshop.service.dto.RemiseDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Remise} and its DTO {@link RemiseDTO}.
 */
@Mapper(componentModel = "spring", uses = {ProduitMapper.class, SousCategorieMapper.class, CategorieMapper.class})
public interface RemiseMapper extends EntityMapper<RemiseDTO, Remise> {

    @Mapping(source = "refProduit.id", target = "refProduitId")
    @Mapping(source = "refProduit.reference", target = "refProduitReference")
    @Mapping(source = "sousCategorie.id", target = "sousCategorieId")
    @Mapping(source = "sousCategorie.nom", target = "sousCategorieNom")
    @Mapping(source = "categorie.id", target = "categorieId")
    @Mapping(source = "categorie.nom", target = "categorieNom")
    RemiseDTO toDto(Remise remise);

    @Mapping(source = "refProduitId", target = "refProduit")
    @Mapping(source = "sousCategorieId", target = "sousCategorie")
    @Mapping(source = "categorieId", target = "categorie")
    Remise toEntity(RemiseDTO remiseDTO);

    default Remise fromId(Long id) {
        if (id == null) {
            return null;
        }
        Remise remise = new Remise();
        remise.setId(id);
        return remise;
    }
}
