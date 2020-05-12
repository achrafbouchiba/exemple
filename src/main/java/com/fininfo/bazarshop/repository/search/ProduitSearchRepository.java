package com.fininfo.bazarshop.repository.search;

import com.fininfo.bazarshop.domain.Produit;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link Produit} entity.
 */
public interface ProduitSearchRepository extends ElasticsearchRepository<Produit, Long> {
}
