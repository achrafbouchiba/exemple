package com.fininfo.bazarshop.repository.search;

import com.fininfo.bazarshop.domain.Adresse;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link Adresse} entity.
 */
public interface AdresseSearchRepository extends ElasticsearchRepository<Adresse, Long> {
}
