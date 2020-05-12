package com.fininfo.bazarshop.repository.search;

import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Configuration;

/**
 * Configure a Mock version of {@link RemiseSearchRepository} to test the
 * application without starting Elasticsearch.
 */
@Configuration
public class RemiseSearchRepositoryMockConfiguration {

    @MockBean
    private RemiseSearchRepository mockRemiseSearchRepository;

}
