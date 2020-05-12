package com.fininfo.bazarshop.service.mapper;


import com.fininfo.bazarshop.domain.*;
import com.fininfo.bazarshop.service.dto.CodePostauxDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link CodePostaux} and its DTO {@link CodePostauxDTO}.
 */
@Mapper(componentModel = "spring", uses = {})
public interface CodePostauxMapper extends EntityMapper<CodePostauxDTO, CodePostaux> {


    @Mapping(target = "adresses", ignore = true)
    @Mapping(target = "removeAdresse", ignore = true)
    CodePostaux toEntity(CodePostauxDTO codePostauxDTO);

    default CodePostaux fromId(Long id) {
        if (id == null) {
            return null;
        }
        CodePostaux codePostaux = new CodePostaux();
        codePostaux.setId(id);
        return codePostaux;
    }
}
