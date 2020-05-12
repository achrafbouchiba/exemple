package com.fininfo.bazarshop.repository;

import com.fininfo.bazarshop.domain.SousCategorie;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the SousCategorie entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SousCategorieRepository extends JpaRepository<SousCategorie, Long> {
}
