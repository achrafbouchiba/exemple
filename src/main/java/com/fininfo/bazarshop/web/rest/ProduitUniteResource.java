package com.fininfo.bazarshop.web.rest;

import com.fininfo.bazarshop.service.ProduitUniteService;
import com.fininfo.bazarshop.web.rest.errors.BadRequestAlertException;
import com.fininfo.bazarshop.service.dto.ProduitUniteDTO;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * REST controller for managing {@link com.fininfo.bazarshop.domain.ProduitUnite}.
 */
@RestController
@RequestMapping("/api")
public class ProduitUniteResource {

    private final Logger log = LoggerFactory.getLogger(ProduitUniteResource.class);

    private static final String ENTITY_NAME = "produitUnite";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ProduitUniteService produitUniteService;

    public ProduitUniteResource(ProduitUniteService produitUniteService) {
        this.produitUniteService = produitUniteService;
    }

    /**
     * {@code POST  /produit-unites} : Create a new produitUnite.
     *
     * @param produitUniteDTO the produitUniteDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new produitUniteDTO, or with status {@code 400 (Bad Request)} if the produitUnite has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/produit-unites")
    public ResponseEntity<ProduitUniteDTO> createProduitUnite(@RequestBody ProduitUniteDTO produitUniteDTO) throws URISyntaxException {
        log.debug("REST request to save ProduitUnite : {}", produitUniteDTO);
        if (produitUniteDTO.getId() != null) {
            throw new BadRequestAlertException("A new produitUnite cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ProduitUniteDTO result = produitUniteService.save(produitUniteDTO);
        return ResponseEntity.created(new URI("/api/produit-unites/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /produit-unites} : Updates an existing produitUnite.
     *
     * @param produitUniteDTO the produitUniteDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated produitUniteDTO,
     * or with status {@code 400 (Bad Request)} if the produitUniteDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the produitUniteDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/produit-unites")
    public ResponseEntity<ProduitUniteDTO> updateProduitUnite(@RequestBody ProduitUniteDTO produitUniteDTO) throws URISyntaxException {
        log.debug("REST request to update ProduitUnite : {}", produitUniteDTO);
        if (produitUniteDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ProduitUniteDTO result = produitUniteService.save(produitUniteDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, produitUniteDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /produit-unites} : get all the produitUnites.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of produitUnites in body.
     */
    @GetMapping("/produit-unites")
    public List<ProduitUniteDTO> getAllProduitUnites() {
        log.debug("REST request to get all ProduitUnites");
        return produitUniteService.findAll();
    }

    /**
     * {@code GET  /produit-unites/:id} : get the "id" produitUnite.
     *
     * @param id the id of the produitUniteDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the produitUniteDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/produit-unites/{id}")
    public ResponseEntity<ProduitUniteDTO> getProduitUnite(@PathVariable Long id) {
        log.debug("REST request to get ProduitUnite : {}", id);
        Optional<ProduitUniteDTO> produitUniteDTO = produitUniteService.findOne(id);
        return ResponseUtil.wrapOrNotFound(produitUniteDTO);
    }

    /**
     * {@code DELETE  /produit-unites/:id} : delete the "id" produitUnite.
     *
     * @param id the id of the produitUniteDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/produit-unites/{id}")
    public ResponseEntity<Void> deleteProduitUnite(@PathVariable Long id) {
        log.debug("REST request to delete ProduitUnite : {}", id);
        produitUniteService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }

    /**
     * {@code SEARCH  /_search/produit-unites?query=:query} : search for the produitUnite corresponding
     * to the query.
     *
     * @param query the query of the produitUnite search.
     * @return the result of the search.
     */
    @GetMapping("/_search/produit-unites")
    public List<ProduitUniteDTO> searchProduitUnites(@RequestParam String query) {
        log.debug("REST request to search ProduitUnites for query {}", query);
        return produitUniteService.search(query);
    }
}
