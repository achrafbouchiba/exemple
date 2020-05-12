package com.fininfo.bazarshop.repository;

import com.fininfo.bazarshop.domain.GestionFidelite;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the GestionFidelite entity.
 */
@SuppressWarnings("unused")
@Repository
public interface GestionFideliteRepository extends JpaRepository<GestionFidelite, Long> {
}
