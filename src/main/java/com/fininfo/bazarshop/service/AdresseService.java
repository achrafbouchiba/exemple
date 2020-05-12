package com.fininfo.bazarshop.service;

import com.fininfo.bazarshop.domain.Adresse;
import com.fininfo.bazarshop.repository.AdresseRepository;
import com.fininfo.bazarshop.repository.search.AdresseSearchRepository;
import com.fininfo.bazarshop.service.dto.AdresseDTO;
import com.fininfo.bazarshop.service.mapper.AdresseMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * Service Implementation for managing {@link Adresse}.
 */
@Service
@Transactional
public class AdresseService {

    private final Logger log = LoggerFactory.getLogger(AdresseService.class);

    private final AdresseRepository adresseRepository;

    private final AdresseMapper adresseMapper;

    private final AdresseSearchRepository adresseSearchRepository;

    public AdresseService(AdresseRepository adresseRepository, AdresseMapper adresseMapper, AdresseSearchRepository adresseSearchRepository) {
        this.adresseRepository = adresseRepository;
        this.adresseMapper = adresseMapper;
        this.adresseSearchRepository = adresseSearchRepository;
    }

    /**
     * Save a adresse.
     *
     * @param adresseDTO the entity to save.
     * @return the persisted entity.
     */
    public AdresseDTO save(AdresseDTO adresseDTO) {
        log.debug("Request to save Adresse : {}", adresseDTO);
        Adresse adresse = adresseMapper.toEntity(adresseDTO);
        adresse = adresseRepository.save(adresse);
        AdresseDTO result = adresseMapper.toDto(adresse);
        adresseSearchRepository.save(adresse);
        return result;
    }

    /**
     * Get all the adresses.
     *
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<AdresseDTO> findAll() {
        log.debug("Request to get all Adresses");
        return adresseRepository.findAll().stream()
            .map(adresseMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one adresse by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<AdresseDTO> findOne(Long id) {
        log.debug("Request to get Adresse : {}", id);
        return adresseRepository.findById(id)
            .map(adresseMapper::toDto);
    }

    /**
     * Delete the adresse by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete Adresse : {}", id);
        adresseRepository.deleteById(id);
        adresseSearchRepository.deleteById(id);
    }

    /**
     * Search for the adresse corresponding to the query.
     *
     * @param query the query of the search.
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<AdresseDTO> search(String query) {
        log.debug("Request to search Adresses for query {}", query);
        return StreamSupport
            .stream(adresseSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .map(adresseMapper::toDto)
            .collect(Collectors.toList());
    }
}
