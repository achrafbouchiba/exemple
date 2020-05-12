package com.fininfo.bazarshop.service.mapper;


import com.fininfo.bazarshop.domain.*;
import com.fininfo.bazarshop.service.dto.GestionFideliteDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link GestionFidelite} and its DTO {@link GestionFideliteDTO}.
 */
@Mapper(componentModel = "spring", uses = {})
public interface GestionFideliteMapper extends EntityMapper<GestionFideliteDTO, GestionFidelite> {



    default GestionFidelite fromId(Long id) {
        if (id == null) {
            return null;
        }
        GestionFidelite gestionFidelite = new GestionFidelite();
        gestionFidelite.setId(id);
        return gestionFidelite;
    }
}
