package com.fininfo.bazarshop.service.mapper;


import com.fininfo.bazarshop.domain.*;
import com.fininfo.bazarshop.service.dto.ZoneDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Zone} and its DTO {@link ZoneDTO}.
 */
@Mapper(componentModel = "spring", uses = {})
public interface ZoneMapper extends EntityMapper<ZoneDTO, Zone> {


    @Mapping(target = "adresses", ignore = true)
    @Mapping(target = "removeAdresse", ignore = true)
    @Mapping(target = "livraisons", ignore = true)
    @Mapping(target = "removeLivraison", ignore = true)
    Zone toEntity(ZoneDTO zoneDTO);

    default Zone fromId(Long id) {
        if (id == null) {
            return null;
        }
        Zone zone = new Zone();
        zone.setId(id);
        return zone;
    }
}
