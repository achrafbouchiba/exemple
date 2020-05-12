package com.fininfo.bazarshop.repository.search;

import com.fininfo.bazarshop.domain.Stock;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link Stock} entity.
 */
public interface StockSearchRepository extends ElasticsearchRepository<Stock, Long> {
}
