package com.fininfo.bazarshop.repository;

import com.fininfo.bazarshop.domain.ProdEnumeration;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the ProdEnumeration entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ProdEnumerationRepository extends JpaRepository<ProdEnumeration, Long> {
}
