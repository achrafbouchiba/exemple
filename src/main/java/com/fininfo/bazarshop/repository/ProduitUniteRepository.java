package com.fininfo.bazarshop.repository;

import com.fininfo.bazarshop.domain.ProduitUnite;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the ProduitUnite entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ProduitUniteRepository extends JpaRepository<ProduitUnite, Long> {
}
