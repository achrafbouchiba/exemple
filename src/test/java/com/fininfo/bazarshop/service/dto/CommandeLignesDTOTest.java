package com.fininfo.bazarshop.service.dto;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.fininfo.bazarshop.web.rest.TestUtil;

public class CommandeLignesDTOTest {

    @Test
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(CommandeLignesDTO.class);
        CommandeLignesDTO commandeLignesDTO1 = new CommandeLignesDTO();
        commandeLignesDTO1.setId(1L);
        CommandeLignesDTO commandeLignesDTO2 = new CommandeLignesDTO();
        assertThat(commandeLignesDTO1).isNotEqualTo(commandeLignesDTO2);
        commandeLignesDTO2.setId(commandeLignesDTO1.getId());
        assertThat(commandeLignesDTO1).isEqualTo(commandeLignesDTO2);
        commandeLignesDTO2.setId(2L);
        assertThat(commandeLignesDTO1).isNotEqualTo(commandeLignesDTO2);
        commandeLignesDTO1.setId(null);
        assertThat(commandeLignesDTO1).isNotEqualTo(commandeLignesDTO2);
    }
}
