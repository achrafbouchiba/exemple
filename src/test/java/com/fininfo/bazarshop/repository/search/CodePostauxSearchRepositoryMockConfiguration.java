package com.fininfo.bazarshop.repository.search;

import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Configuration;

/**
 * Configure a Mock version of {@link CodePostauxSearchRepository} to test the
 * application without starting Elasticsearch.
 */
@Configuration
public class CodePostauxSearchRepositoryMockConfiguration {

    @MockBean
    private CodePostauxSearchRepository mockCodePostauxSearchRepository;

}
