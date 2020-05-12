package com.fininfo.bazarshop.repository;

import com.fininfo.bazarshop.domain.CodePostaux;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the CodePostaux entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CodePostauxRepository extends JpaRepository<CodePostaux, Long> {
}
