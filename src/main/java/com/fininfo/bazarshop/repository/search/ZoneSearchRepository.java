package com.fininfo.bazarshop.repository.search;

import com.fininfo.bazarshop.domain.Zone;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link Zone} entity.
 */
public interface ZoneSearchRepository extends ElasticsearchRepository<Zone, Long> {
}
