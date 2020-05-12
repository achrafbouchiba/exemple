package com.fininfo.bazarshop.repository;

import com.fininfo.bazarshop.domain.MouvementStock;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the MouvementStock entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MouvementStockRepository extends JpaRepository<MouvementStock, Long> {
}
