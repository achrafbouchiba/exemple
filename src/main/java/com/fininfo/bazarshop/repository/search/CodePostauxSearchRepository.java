package com.fininfo.bazarshop.repository.search;

import com.fininfo.bazarshop.domain.CodePostaux;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link CodePostaux} entity.
 */
public interface CodePostauxSearchRepository extends ElasticsearchRepository<CodePostaux, Long> {
}
