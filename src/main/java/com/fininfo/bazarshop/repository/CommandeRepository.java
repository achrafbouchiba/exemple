package com.fininfo.bazarshop.repository;

import com.fininfo.bazarshop.domain.Commande;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Commande entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CommandeRepository extends JpaRepository<Commande, Long> {
}
