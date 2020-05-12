package com.fininfo.bazarshop.service.mapper;


import com.fininfo.bazarshop.domain.*;
import com.fininfo.bazarshop.service.dto.ProduitUniteDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link ProduitUnite} and its DTO {@link ProduitUniteDTO}.
 */
@Mapper(componentModel = "spring", uses = {})
public interface ProduitUniteMapper extends EntityMapper<ProduitUniteDTO, ProduitUnite> {


    @Mapping(target = "produits", ignore = true)
    @Mapping(target = "removeProduit", ignore = true)
    ProduitUnite toEntity(ProduitUniteDTO produitUniteDTO);

    default ProduitUnite fromId(Long id) {
        if (id == null) {
            return null;
        }
        ProduitUnite produitUnite = new ProduitUnite();
        produitUnite.setId(id);
        return produitUnite;
    }
}
