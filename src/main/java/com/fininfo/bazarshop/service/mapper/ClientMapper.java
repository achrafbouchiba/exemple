package com.fininfo.bazarshop.service.mapper;


import com.fininfo.bazarshop.domain.*;
import com.fininfo.bazarshop.service.dto.ClientDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Client} and its DTO {@link ClientDTO}.
 */
@Mapper(componentModel = "spring", uses = {})
public interface ClientMapper extends EntityMapper<ClientDTO, Client> {


    @Mapping(target = "adresses", ignore = true)
    @Mapping(target = "removeAdresse", ignore = true)
    @Mapping(target = "commandes", ignore = true)
    @Mapping(target = "removeCommande", ignore = true)
    Client toEntity(ClientDTO clientDTO);

    default Client fromId(Long id) {
        if (id == null) {
            return null;
        }
        Client client = new Client();
        client.setId(id);
        return client;
    }
}
