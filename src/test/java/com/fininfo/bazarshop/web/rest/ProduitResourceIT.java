package com.fininfo.bazarshop.web.rest;

import com.fininfo.bazarshop.BazarshopApp;
import com.fininfo.bazarshop.domain.Produit;
import com.fininfo.bazarshop.repository.ProduitRepository;
import com.fininfo.bazarshop.repository.search.ProduitSearchRepository;
import com.fininfo.bazarshop.service.ProduitService;
import com.fininfo.bazarshop.service.dto.ProduitDTO;
import com.fininfo.bazarshop.service.mapper.ProduitMapper;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.Base64Utils;
import javax.persistence.EntityManager;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Collections;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.elasticsearch.index.query.QueryBuilders.queryStringQuery;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.fininfo.bazarshop.domain.enumeration.SourcePrd;
/**
 * Integration tests for the {@link ProduitResource} REST controller.
 */
@SpringBootTest(classes = BazarshopApp.class)
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
@WithMockUser
public class ProduitResourceIT {

    private static final String DEFAULT_REFERENCE = "AAAAAAAAAA";
    private static final String UPDATED_REFERENCE = "BBBBBBBBBB";

    private static final String DEFAULT_NOM = "AAAAAAAAAA";
    private static final String UPDATED_NOM = "BBBBBBBBBB";

    private static final Integer DEFAULT_CODE_BARRE = 1;
    private static final Integer UPDATED_CODE_BARRE = 2;

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final Boolean DEFAULT_ETAT = false;
    private static final Boolean UPDATED_ETAT = true;

    private static final String DEFAULT_MARQUE = "AAAAAAAAAA";
    private static final String UPDATED_MARQUE = "BBBBBBBBBB";

    private static final String DEFAULT_NATURE = "AAAAAAAAAA";
    private static final String UPDATED_NATURE = "BBBBBBBBBB";

    private static final Double DEFAULT_STOCK_MINIMUM = 1D;
    private static final Double UPDATED_STOCK_MINIMUM = 2D;

    private static final Double DEFAULT_QUANTITE_VENTE_MAX = 1D;
    private static final Double UPDATED_QUANTITE_VENTE_MAX = 2D;

    private static final Boolean DEFAULT_HORS_STOCK = false;
    private static final Boolean UPDATED_HORS_STOCK = true;

    private static final Boolean DEFAULT_GERE_EN_STOCK = false;
    private static final Boolean UPDATED_GERE_EN_STOCK = true;

    private static final LocalDate DEFAULT_DATE_PREMPTION = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE_PREMPTION = LocalDate.now(ZoneId.systemDefault());

    private static final Double DEFAULT_PRIX_HT = 1D;
    private static final Double UPDATED_PRIX_HT = 2D;

    private static final Double DEFAULT_TAUX_TVA = 1D;
    private static final Double UPDATED_TAUX_TVA = 2D;

    private static final Double DEFAULT_PRIX_TTC = 1D;
    private static final Double UPDATED_PRIX_TTC = 2D;

    private static final SourcePrd DEFAULT_SOURCE_PRODUIT = SourcePrd.Locale;
    private static final SourcePrd UPDATED_SOURCE_PRODUIT = SourcePrd.Externe;

    private static final String DEFAULT_RATING = "3";
    private static final String UPDATED_RATING = "2";

    private static final Double DEFAULT_REMISE = 1D;
    private static final Double UPDATED_REMISE = 2D;

    private static final byte[] DEFAULT_IMAGE = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_IMAGE = TestUtil.createByteArray(1, "1");
    private static final String DEFAULT_IMAGE_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_IMAGE_CONTENT_TYPE = "image/png";

    private static final LocalDate DEFAULT_CREE_LE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_CREE_LE = LocalDate.now(ZoneId.systemDefault());

    private static final String DEFAULT_CREE_PAR = "AAAAAAAAAA";
    private static final String UPDATED_CREE_PAR = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_MODIFIE_LE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_MODIFIE_LE = LocalDate.now(ZoneId.systemDefault());

    private static final String DEFAULT_MODIFIE_PAR = "AAAAAAAAAA";
    private static final String UPDATED_MODIFIE_PAR = "BBBBBBBBBB";

    @Autowired
    private ProduitRepository produitRepository;

    @Autowired
    private ProduitMapper produitMapper;

    @Autowired
    private ProduitService produitService;

    /**
     * This repository is mocked in the com.fininfo.bazarshop.repository.search test package.
     *
     * @see com.fininfo.bazarshop.repository.search.ProduitSearchRepositoryMockConfiguration
     */
    @Autowired
    private ProduitSearchRepository mockProduitSearchRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restProduitMockMvc;

    private Produit produit;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Produit createEntity(EntityManager em) {
        Produit produit = new Produit()
            .reference(DEFAULT_REFERENCE)
            .nom(DEFAULT_NOM)
            .codeBarre(DEFAULT_CODE_BARRE)
            .description(DEFAULT_DESCRIPTION)
            .etat(DEFAULT_ETAT)
            .marque(DEFAULT_MARQUE)
            .nature(DEFAULT_NATURE)
            .stockMinimum(DEFAULT_STOCK_MINIMUM)
            .quantiteVenteMax(DEFAULT_QUANTITE_VENTE_MAX)
            .horsStock(DEFAULT_HORS_STOCK)
            .gereEnStock(DEFAULT_GERE_EN_STOCK)
            .datePremption(DEFAULT_DATE_PREMPTION)
            .prixHT(DEFAULT_PRIX_HT)
            .tauxTVA(DEFAULT_TAUX_TVA)
            .prixTTC(DEFAULT_PRIX_TTC)
            .sourceProduit(DEFAULT_SOURCE_PRODUIT)
            .rating(DEFAULT_RATING)
            .remise(DEFAULT_REMISE)
            .image(DEFAULT_IMAGE)
            .imageContentType(DEFAULT_IMAGE_CONTENT_TYPE)
            .creeLe(DEFAULT_CREE_LE)
            .creePar(DEFAULT_CREE_PAR)
            .modifieLe(DEFAULT_MODIFIE_LE)
            .modifiePar(DEFAULT_MODIFIE_PAR);
        return produit;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Produit createUpdatedEntity(EntityManager em) {
        Produit produit = new Produit()
            .reference(UPDATED_REFERENCE)
            .nom(UPDATED_NOM)
            .codeBarre(UPDATED_CODE_BARRE)
            .description(UPDATED_DESCRIPTION)
            .etat(UPDATED_ETAT)
            .marque(UPDATED_MARQUE)
            .nature(UPDATED_NATURE)
            .stockMinimum(UPDATED_STOCK_MINIMUM)
            .quantiteVenteMax(UPDATED_QUANTITE_VENTE_MAX)
            .horsStock(UPDATED_HORS_STOCK)
            .gereEnStock(UPDATED_GERE_EN_STOCK)
            .datePremption(UPDATED_DATE_PREMPTION)
            .prixHT(UPDATED_PRIX_HT)
            .tauxTVA(UPDATED_TAUX_TVA)
            .prixTTC(UPDATED_PRIX_TTC)
            .sourceProduit(UPDATED_SOURCE_PRODUIT)
            .rating(UPDATED_RATING)
            .remise(UPDATED_REMISE)
            .image(UPDATED_IMAGE)
            .imageContentType(UPDATED_IMAGE_CONTENT_TYPE)
            .creeLe(UPDATED_CREE_LE)
            .creePar(UPDATED_CREE_PAR)
            .modifieLe(UPDATED_MODIFIE_LE)
            .modifiePar(UPDATED_MODIFIE_PAR);
        return produit;
    }

    @BeforeEach
    public void initTest() {
        produit = createEntity(em);
    }

    @Test
    @Transactional
    public void createProduit() throws Exception {
        int databaseSizeBeforeCreate = produitRepository.findAll().size();

        // Create the Produit
        ProduitDTO produitDTO = produitMapper.toDto(produit);
        restProduitMockMvc.perform(post("/api/produits")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(produitDTO)))
            .andExpect(status().isCreated());

        // Validate the Produit in the database
        List<Produit> produitList = produitRepository.findAll();
        assertThat(produitList).hasSize(databaseSizeBeforeCreate + 1);
        Produit testProduit = produitList.get(produitList.size() - 1);
        assertThat(testProduit.getReference()).isEqualTo(DEFAULT_REFERENCE);
        assertThat(testProduit.getNom()).isEqualTo(DEFAULT_NOM);
        assertThat(testProduit.getCodeBarre()).isEqualTo(DEFAULT_CODE_BARRE);
        assertThat(testProduit.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testProduit.isEtat()).isEqualTo(DEFAULT_ETAT);
        assertThat(testProduit.getMarque()).isEqualTo(DEFAULT_MARQUE);
        assertThat(testProduit.getNature()).isEqualTo(DEFAULT_NATURE);
        assertThat(testProduit.getStockMinimum()).isEqualTo(DEFAULT_STOCK_MINIMUM);
        assertThat(testProduit.getQuantiteVenteMax()).isEqualTo(DEFAULT_QUANTITE_VENTE_MAX);
        assertThat(testProduit.isHorsStock()).isEqualTo(DEFAULT_HORS_STOCK);
        assertThat(testProduit.isGereEnStock()).isEqualTo(DEFAULT_GERE_EN_STOCK);
        assertThat(testProduit.getDatePremption()).isEqualTo(DEFAULT_DATE_PREMPTION);
        assertThat(testProduit.getPrixHT()).isEqualTo(DEFAULT_PRIX_HT);
        assertThat(testProduit.getTauxTVA()).isEqualTo(DEFAULT_TAUX_TVA);
        assertThat(testProduit.getPrixTTC()).isEqualTo(DEFAULT_PRIX_TTC);
        assertThat(testProduit.getSourceProduit()).isEqualTo(DEFAULT_SOURCE_PRODUIT);
        assertThat(testProduit.getRating()).isEqualTo(DEFAULT_RATING);
        assertThat(testProduit.getRemise()).isEqualTo(DEFAULT_REMISE);
        assertThat(testProduit.getImage()).isEqualTo(DEFAULT_IMAGE);
        assertThat(testProduit.getImageContentType()).isEqualTo(DEFAULT_IMAGE_CONTENT_TYPE);
        assertThat(testProduit.getCreeLe()).isEqualTo(DEFAULT_CREE_LE);
        assertThat(testProduit.getCreePar()).isEqualTo(DEFAULT_CREE_PAR);
        assertThat(testProduit.getModifieLe()).isEqualTo(DEFAULT_MODIFIE_LE);
        assertThat(testProduit.getModifiePar()).isEqualTo(DEFAULT_MODIFIE_PAR);

        // Validate the Produit in Elasticsearch
        verify(mockProduitSearchRepository, times(1)).save(testProduit);
    }

    @Test
    @Transactional
    public void createProduitWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = produitRepository.findAll().size();

        // Create the Produit with an existing ID
        produit.setId(1L);
        ProduitDTO produitDTO = produitMapper.toDto(produit);

        // An entity with an existing ID cannot be created, so this API call must fail
        restProduitMockMvc.perform(post("/api/produits")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(produitDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Produit in the database
        List<Produit> produitList = produitRepository.findAll();
        assertThat(produitList).hasSize(databaseSizeBeforeCreate);

        // Validate the Produit in Elasticsearch
        verify(mockProduitSearchRepository, times(0)).save(produit);
    }


    @Test
    @Transactional
    public void checkReferenceIsRequired() throws Exception {
        int databaseSizeBeforeTest = produitRepository.findAll().size();
        // set the field null
        produit.setReference(null);

        // Create the Produit, which fails.
        ProduitDTO produitDTO = produitMapper.toDto(produit);

        restProduitMockMvc.perform(post("/api/produits")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(produitDTO)))
            .andExpect(status().isBadRequest());

        List<Produit> produitList = produitRepository.findAll();
        assertThat(produitList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkNomIsRequired() throws Exception {
        int databaseSizeBeforeTest = produitRepository.findAll().size();
        // set the field null
        produit.setNom(null);

        // Create the Produit, which fails.
        ProduitDTO produitDTO = produitMapper.toDto(produit);

        restProduitMockMvc.perform(post("/api/produits")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(produitDTO)))
            .andExpect(status().isBadRequest());

        List<Produit> produitList = produitRepository.findAll();
        assertThat(produitList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkEtatIsRequired() throws Exception {
        int databaseSizeBeforeTest = produitRepository.findAll().size();
        // set the field null
        produit.setEtat(null);

        // Create the Produit, which fails.
        ProduitDTO produitDTO = produitMapper.toDto(produit);

        restProduitMockMvc.perform(post("/api/produits")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(produitDTO)))
            .andExpect(status().isBadRequest());

        List<Produit> produitList = produitRepository.findAll();
        assertThat(produitList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkSourceProduitIsRequired() throws Exception {
        int databaseSizeBeforeTest = produitRepository.findAll().size();
        // set the field null
        produit.setSourceProduit(null);

        // Create the Produit, which fails.
        ProduitDTO produitDTO = produitMapper.toDto(produit);

        restProduitMockMvc.perform(post("/api/produits")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(produitDTO)))
            .andExpect(status().isBadRequest());

        List<Produit> produitList = produitRepository.findAll();
        assertThat(produitList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllProduits() throws Exception {
        // Initialize the database
        produitRepository.saveAndFlush(produit);

        // Get all the produitList
        restProduitMockMvc.perform(get("/api/produits?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(produit.getId().intValue())))
            .andExpect(jsonPath("$.[*].reference").value(hasItem(DEFAULT_REFERENCE)))
            .andExpect(jsonPath("$.[*].nom").value(hasItem(DEFAULT_NOM)))
            .andExpect(jsonPath("$.[*].codeBarre").value(hasItem(DEFAULT_CODE_BARRE)))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION)))
            .andExpect(jsonPath("$.[*].etat").value(hasItem(DEFAULT_ETAT.booleanValue())))
            .andExpect(jsonPath("$.[*].marque").value(hasItem(DEFAULT_MARQUE)))
            .andExpect(jsonPath("$.[*].nature").value(hasItem(DEFAULT_NATURE)))
            .andExpect(jsonPath("$.[*].stockMinimum").value(hasItem(DEFAULT_STOCK_MINIMUM.doubleValue())))
            .andExpect(jsonPath("$.[*].quantiteVenteMax").value(hasItem(DEFAULT_QUANTITE_VENTE_MAX.doubleValue())))
            .andExpect(jsonPath("$.[*].horsStock").value(hasItem(DEFAULT_HORS_STOCK.booleanValue())))
            .andExpect(jsonPath("$.[*].gereEnStock").value(hasItem(DEFAULT_GERE_EN_STOCK.booleanValue())))
            .andExpect(jsonPath("$.[*].datePremption").value(hasItem(DEFAULT_DATE_PREMPTION.toString())))
            .andExpect(jsonPath("$.[*].prixHT").value(hasItem(DEFAULT_PRIX_HT.doubleValue())))
            .andExpect(jsonPath("$.[*].tauxTVA").value(hasItem(DEFAULT_TAUX_TVA.doubleValue())))
            .andExpect(jsonPath("$.[*].prixTTC").value(hasItem(DEFAULT_PRIX_TTC.doubleValue())))
            .andExpect(jsonPath("$.[*].sourceProduit").value(hasItem(DEFAULT_SOURCE_PRODUIT.toString())))
            .andExpect(jsonPath("$.[*].rating").value(hasItem(DEFAULT_RATING)))
            .andExpect(jsonPath("$.[*].remise").value(hasItem(DEFAULT_REMISE.doubleValue())))
            .andExpect(jsonPath("$.[*].imageContentType").value(hasItem(DEFAULT_IMAGE_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].image").value(hasItem(Base64Utils.encodeToString(DEFAULT_IMAGE))))
            .andExpect(jsonPath("$.[*].creeLe").value(hasItem(DEFAULT_CREE_LE.toString())))
            .andExpect(jsonPath("$.[*].creePar").value(hasItem(DEFAULT_CREE_PAR)))
            .andExpect(jsonPath("$.[*].modifieLe").value(hasItem(DEFAULT_MODIFIE_LE.toString())))
            .andExpect(jsonPath("$.[*].modifiePar").value(hasItem(DEFAULT_MODIFIE_PAR)));
    }
    
    @Test
    @Transactional
    public void getProduit() throws Exception {
        // Initialize the database
        produitRepository.saveAndFlush(produit);

        // Get the produit
        restProduitMockMvc.perform(get("/api/produits/{id}", produit.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(produit.getId().intValue()))
            .andExpect(jsonPath("$.reference").value(DEFAULT_REFERENCE))
            .andExpect(jsonPath("$.nom").value(DEFAULT_NOM))
            .andExpect(jsonPath("$.codeBarre").value(DEFAULT_CODE_BARRE))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION))
            .andExpect(jsonPath("$.etat").value(DEFAULT_ETAT.booleanValue()))
            .andExpect(jsonPath("$.marque").value(DEFAULT_MARQUE))
            .andExpect(jsonPath("$.nature").value(DEFAULT_NATURE))
            .andExpect(jsonPath("$.stockMinimum").value(DEFAULT_STOCK_MINIMUM.doubleValue()))
            .andExpect(jsonPath("$.quantiteVenteMax").value(DEFAULT_QUANTITE_VENTE_MAX.doubleValue()))
            .andExpect(jsonPath("$.horsStock").value(DEFAULT_HORS_STOCK.booleanValue()))
            .andExpect(jsonPath("$.gereEnStock").value(DEFAULT_GERE_EN_STOCK.booleanValue()))
            .andExpect(jsonPath("$.datePremption").value(DEFAULT_DATE_PREMPTION.toString()))
            .andExpect(jsonPath("$.prixHT").value(DEFAULT_PRIX_HT.doubleValue()))
            .andExpect(jsonPath("$.tauxTVA").value(DEFAULT_TAUX_TVA.doubleValue()))
            .andExpect(jsonPath("$.prixTTC").value(DEFAULT_PRIX_TTC.doubleValue()))
            .andExpect(jsonPath("$.sourceProduit").value(DEFAULT_SOURCE_PRODUIT.toString()))
            .andExpect(jsonPath("$.rating").value(DEFAULT_RATING))
            .andExpect(jsonPath("$.remise").value(DEFAULT_REMISE.doubleValue()))
            .andExpect(jsonPath("$.imageContentType").value(DEFAULT_IMAGE_CONTENT_TYPE))
            .andExpect(jsonPath("$.image").value(Base64Utils.encodeToString(DEFAULT_IMAGE)))
            .andExpect(jsonPath("$.creeLe").value(DEFAULT_CREE_LE.toString()))
            .andExpect(jsonPath("$.creePar").value(DEFAULT_CREE_PAR))
            .andExpect(jsonPath("$.modifieLe").value(DEFAULT_MODIFIE_LE.toString()))
            .andExpect(jsonPath("$.modifiePar").value(DEFAULT_MODIFIE_PAR));
    }

    @Test
    @Transactional
    public void getNonExistingProduit() throws Exception {
        // Get the produit
        restProduitMockMvc.perform(get("/api/produits/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateProduit() throws Exception {
        // Initialize the database
        produitRepository.saveAndFlush(produit);

        int databaseSizeBeforeUpdate = produitRepository.findAll().size();

        // Update the produit
        Produit updatedProduit = produitRepository.findById(produit.getId()).get();
        // Disconnect from session so that the updates on updatedProduit are not directly saved in db
        em.detach(updatedProduit);
        updatedProduit
            .reference(UPDATED_REFERENCE)
            .nom(UPDATED_NOM)
            .codeBarre(UPDATED_CODE_BARRE)
            .description(UPDATED_DESCRIPTION)
            .etat(UPDATED_ETAT)
            .marque(UPDATED_MARQUE)
            .nature(UPDATED_NATURE)
            .stockMinimum(UPDATED_STOCK_MINIMUM)
            .quantiteVenteMax(UPDATED_QUANTITE_VENTE_MAX)
            .horsStock(UPDATED_HORS_STOCK)
            .gereEnStock(UPDATED_GERE_EN_STOCK)
            .datePremption(UPDATED_DATE_PREMPTION)
            .prixHT(UPDATED_PRIX_HT)
            .tauxTVA(UPDATED_TAUX_TVA)
            .prixTTC(UPDATED_PRIX_TTC)
            .sourceProduit(UPDATED_SOURCE_PRODUIT)
            .rating(UPDATED_RATING)
            .remise(UPDATED_REMISE)
            .image(UPDATED_IMAGE)
            .imageContentType(UPDATED_IMAGE_CONTENT_TYPE)
            .creeLe(UPDATED_CREE_LE)
            .creePar(UPDATED_CREE_PAR)
            .modifieLe(UPDATED_MODIFIE_LE)
            .modifiePar(UPDATED_MODIFIE_PAR);
        ProduitDTO produitDTO = produitMapper.toDto(updatedProduit);

        restProduitMockMvc.perform(put("/api/produits")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(produitDTO)))
            .andExpect(status().isOk());

        // Validate the Produit in the database
        List<Produit> produitList = produitRepository.findAll();
        assertThat(produitList).hasSize(databaseSizeBeforeUpdate);
        Produit testProduit = produitList.get(produitList.size() - 1);
        assertThat(testProduit.getReference()).isEqualTo(UPDATED_REFERENCE);
        assertThat(testProduit.getNom()).isEqualTo(UPDATED_NOM);
        assertThat(testProduit.getCodeBarre()).isEqualTo(UPDATED_CODE_BARRE);
        assertThat(testProduit.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testProduit.isEtat()).isEqualTo(UPDATED_ETAT);
        assertThat(testProduit.getMarque()).isEqualTo(UPDATED_MARQUE);
        assertThat(testProduit.getNature()).isEqualTo(UPDATED_NATURE);
        assertThat(testProduit.getStockMinimum()).isEqualTo(UPDATED_STOCK_MINIMUM);
        assertThat(testProduit.getQuantiteVenteMax()).isEqualTo(UPDATED_QUANTITE_VENTE_MAX);
        assertThat(testProduit.isHorsStock()).isEqualTo(UPDATED_HORS_STOCK);
        assertThat(testProduit.isGereEnStock()).isEqualTo(UPDATED_GERE_EN_STOCK);
        assertThat(testProduit.getDatePremption()).isEqualTo(UPDATED_DATE_PREMPTION);
        assertThat(testProduit.getPrixHT()).isEqualTo(UPDATED_PRIX_HT);
        assertThat(testProduit.getTauxTVA()).isEqualTo(UPDATED_TAUX_TVA);
        assertThat(testProduit.getPrixTTC()).isEqualTo(UPDATED_PRIX_TTC);
        assertThat(testProduit.getSourceProduit()).isEqualTo(UPDATED_SOURCE_PRODUIT);
        assertThat(testProduit.getRating()).isEqualTo(UPDATED_RATING);
        assertThat(testProduit.getRemise()).isEqualTo(UPDATED_REMISE);
        assertThat(testProduit.getImage()).isEqualTo(UPDATED_IMAGE);
        assertThat(testProduit.getImageContentType()).isEqualTo(UPDATED_IMAGE_CONTENT_TYPE);
        assertThat(testProduit.getCreeLe()).isEqualTo(UPDATED_CREE_LE);
        assertThat(testProduit.getCreePar()).isEqualTo(UPDATED_CREE_PAR);
        assertThat(testProduit.getModifieLe()).isEqualTo(UPDATED_MODIFIE_LE);
        assertThat(testProduit.getModifiePar()).isEqualTo(UPDATED_MODIFIE_PAR);

        // Validate the Produit in Elasticsearch
        verify(mockProduitSearchRepository, times(1)).save(testProduit);
    }

    @Test
    @Transactional
    public void updateNonExistingProduit() throws Exception {
        int databaseSizeBeforeUpdate = produitRepository.findAll().size();

        // Create the Produit
        ProduitDTO produitDTO = produitMapper.toDto(produit);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restProduitMockMvc.perform(put("/api/produits")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(produitDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Produit in the database
        List<Produit> produitList = produitRepository.findAll();
        assertThat(produitList).hasSize(databaseSizeBeforeUpdate);

        // Validate the Produit in Elasticsearch
        verify(mockProduitSearchRepository, times(0)).save(produit);
    }

    @Test
    @Transactional
    public void deleteProduit() throws Exception {
        // Initialize the database
        produitRepository.saveAndFlush(produit);

        int databaseSizeBeforeDelete = produitRepository.findAll().size();

        // Delete the produit
        restProduitMockMvc.perform(delete("/api/produits/{id}", produit.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Produit> produitList = produitRepository.findAll();
        assertThat(produitList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the Produit in Elasticsearch
        verify(mockProduitSearchRepository, times(1)).deleteById(produit.getId());
    }

    @Test
    @Transactional
    public void searchProduit() throws Exception {
        // Initialize the database
        produitRepository.saveAndFlush(produit);
        when(mockProduitSearchRepository.search(queryStringQuery("id:" + produit.getId())))
            .thenReturn(Collections.singletonList(produit));
        // Search the produit
        restProduitMockMvc.perform(get("/api/_search/produits?query=id:" + produit.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(produit.getId().intValue())))
            .andExpect(jsonPath("$.[*].reference").value(hasItem(DEFAULT_REFERENCE)))
            .andExpect(jsonPath("$.[*].nom").value(hasItem(DEFAULT_NOM)))
            .andExpect(jsonPath("$.[*].codeBarre").value(hasItem(DEFAULT_CODE_BARRE)))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION)))
            .andExpect(jsonPath("$.[*].etat").value(hasItem(DEFAULT_ETAT.booleanValue())))
            .andExpect(jsonPath("$.[*].marque").value(hasItem(DEFAULT_MARQUE)))
            .andExpect(jsonPath("$.[*].nature").value(hasItem(DEFAULT_NATURE)))
            .andExpect(jsonPath("$.[*].stockMinimum").value(hasItem(DEFAULT_STOCK_MINIMUM.doubleValue())))
            .andExpect(jsonPath("$.[*].quantiteVenteMax").value(hasItem(DEFAULT_QUANTITE_VENTE_MAX.doubleValue())))
            .andExpect(jsonPath("$.[*].horsStock").value(hasItem(DEFAULT_HORS_STOCK.booleanValue())))
            .andExpect(jsonPath("$.[*].gereEnStock").value(hasItem(DEFAULT_GERE_EN_STOCK.booleanValue())))
            .andExpect(jsonPath("$.[*].datePremption").value(hasItem(DEFAULT_DATE_PREMPTION.toString())))
            .andExpect(jsonPath("$.[*].prixHT").value(hasItem(DEFAULT_PRIX_HT.doubleValue())))
            .andExpect(jsonPath("$.[*].tauxTVA").value(hasItem(DEFAULT_TAUX_TVA.doubleValue())))
            .andExpect(jsonPath("$.[*].prixTTC").value(hasItem(DEFAULT_PRIX_TTC.doubleValue())))
            .andExpect(jsonPath("$.[*].sourceProduit").value(hasItem(DEFAULT_SOURCE_PRODUIT.toString())))
            .andExpect(jsonPath("$.[*].rating").value(hasItem(DEFAULT_RATING)))
            .andExpect(jsonPath("$.[*].remise").value(hasItem(DEFAULT_REMISE.doubleValue())))
            .andExpect(jsonPath("$.[*].imageContentType").value(hasItem(DEFAULT_IMAGE_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].image").value(hasItem(Base64Utils.encodeToString(DEFAULT_IMAGE))))
            .andExpect(jsonPath("$.[*].creeLe").value(hasItem(DEFAULT_CREE_LE.toString())))
            .andExpect(jsonPath("$.[*].creePar").value(hasItem(DEFAULT_CREE_PAR)))
            .andExpect(jsonPath("$.[*].modifieLe").value(hasItem(DEFAULT_MODIFIE_LE.toString())))
            .andExpect(jsonPath("$.[*].modifiePar").value(hasItem(DEFAULT_MODIFIE_PAR)));
    }
}
