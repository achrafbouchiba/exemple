package com.fininfo.bazarshop.repository.search;

import com.fininfo.bazarshop.domain.CommandeLignes;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link CommandeLignes} entity.
 */
public interface CommandeLignesSearchRepository extends ElasticsearchRepository<CommandeLignes, Long> {
}
