package com.fininfo.bazarshop.repository.search;

import com.fininfo.bazarshop.domain.SousCategorie;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link SousCategorie} entity.
 */
public interface SousCategorieSearchRepository extends ElasticsearchRepository<SousCategorie, Long> {
}
