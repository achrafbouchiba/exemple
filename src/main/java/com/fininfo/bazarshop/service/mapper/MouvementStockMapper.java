package com.fininfo.bazarshop.service.mapper;


import com.fininfo.bazarshop.domain.*;
import com.fininfo.bazarshop.service.dto.MouvementStockDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link MouvementStock} and its DTO {@link MouvementStockDTO}.
 */
@Mapper(componentModel = "spring", uses = {ProduitMapper.class, CommandeMapper.class})
public interface MouvementStockMapper extends EntityMapper<MouvementStockDTO, MouvementStock> {

    @Mapping(source = "refProduit.id", target = "refProduitId")
    @Mapping(source = "refProduit.reference", target = "refProduitReference")
    @Mapping(source = "refCommande.id", target = "refCommandeId")
    @Mapping(source = "refCommande.reference", target = "refCommandeReference")
    MouvementStockDTO toDto(MouvementStock mouvementStock);

    @Mapping(source = "refProduitId", target = "refProduit")
    @Mapping(source = "refCommandeId", target = "refCommande")
    MouvementStock toEntity(MouvementStockDTO mouvementStockDTO);

    default MouvementStock fromId(Long id) {
        if (id == null) {
            return null;
        }
        MouvementStock mouvementStock = new MouvementStock();
        mouvementStock.setId(id);
        return mouvementStock;
    }
}
