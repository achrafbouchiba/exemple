package com.fininfo.bazarshop.repository;

import com.fininfo.bazarshop.domain.CommandeLignes;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the CommandeLignes entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CommandeLignesRepository extends JpaRepository<CommandeLignes, Long> {
}
