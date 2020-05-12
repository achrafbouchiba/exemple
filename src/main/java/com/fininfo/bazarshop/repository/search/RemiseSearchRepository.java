package com.fininfo.bazarshop.repository.search;

import com.fininfo.bazarshop.domain.Remise;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link Remise} entity.
 */
public interface RemiseSearchRepository extends ElasticsearchRepository<Remise, Long> {
}
