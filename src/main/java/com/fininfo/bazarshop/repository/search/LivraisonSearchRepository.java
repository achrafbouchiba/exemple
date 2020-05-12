package com.fininfo.bazarshop.repository.search;

import com.fininfo.bazarshop.domain.Livraison;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link Livraison} entity.
 */
public interface LivraisonSearchRepository extends ElasticsearchRepository<Livraison, Long> {
}
