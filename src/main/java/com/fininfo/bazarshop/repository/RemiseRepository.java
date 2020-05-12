package com.fininfo.bazarshop.repository;

import com.fininfo.bazarshop.domain.Remise;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Remise entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RemiseRepository extends JpaRepository<Remise, Long> {
}
