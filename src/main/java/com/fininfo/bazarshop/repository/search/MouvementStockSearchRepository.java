package com.fininfo.bazarshop.repository.search;

import com.fininfo.bazarshop.domain.MouvementStock;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link MouvementStock} entity.
 */
public interface MouvementStockSearchRepository extends ElasticsearchRepository<MouvementStock, Long> {
}
