package com.fininfo.bazarshop.repository.search;

import com.fininfo.bazarshop.domain.GestionFidelite;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link GestionFidelite} entity.
 */
public interface GestionFideliteSearchRepository extends ElasticsearchRepository<GestionFidelite, Long> {
}
