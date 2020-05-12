package com.fininfo.bazarshop.service.mapper;


import com.fininfo.bazarshop.domain.*;
import com.fininfo.bazarshop.service.dto.CategorieDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Categorie} and its DTO {@link CategorieDTO}.
 */
@Mapper(componentModel = "spring", uses = {})
public interface CategorieMapper extends EntityMapper<CategorieDTO, Categorie> {


    @Mapping(target = "sousCategories", ignore = true)
    @Mapping(target = "removeSousCategorie", ignore = true)
    @Mapping(target = "stocks", ignore = true)
    @Mapping(target = "removeStock", ignore = true)
    @Mapping(target = "remises", ignore = true)
    @Mapping(target = "removeRemise", ignore = true)
    Categorie toEntity(CategorieDTO categorieDTO);

    default Categorie fromId(Long id) {
        if (id == null) {
            return null;
        }
        Categorie categorie = new Categorie();
        categorie.setId(id);
        return categorie;
    }
}
