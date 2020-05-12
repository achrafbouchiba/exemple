package com.fininfo.bazarshop.repository.search;

import com.fininfo.bazarshop.domain.ProdEnumeration;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link ProdEnumeration} entity.
 */
public interface ProdEnumerationSearchRepository extends ElasticsearchRepository<ProdEnumeration, Long> {
}
