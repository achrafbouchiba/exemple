package com.fininfo.bazarshop.repository.search;

import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Configuration;

/**
 * Configure a Mock version of {@link LivraisonSearchRepository} to test the
 * application without starting Elasticsearch.
 */
@Configuration
public class LivraisonSearchRepositoryMockConfiguration {

    @MockBean
    private LivraisonSearchRepository mockLivraisonSearchRepository;

}
