package com.fininfo.bazarshop.web.rest;

import com.fininfo.bazarshop.BazarshopApp;
import com.fininfo.bazarshop.domain.GestionFidelite;
import com.fininfo.bazarshop.repository.GestionFideliteRepository;
import com.fininfo.bazarshop.repository.search.GestionFideliteSearchRepository;
import com.fininfo.bazarshop.service.GestionFideliteService;
import com.fininfo.bazarshop.service.dto.GestionFideliteDTO;
import com.fininfo.bazarshop.service.mapper.GestionFideliteMapper;

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

import com.fininfo.bazarshop.domain.enumeration.Devise;
/**
 * Integration tests for the {@link GestionFideliteResource} REST controller.
 */
@SpringBootTest(classes = BazarshopApp.class)
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
@WithMockUser
public class GestionFideliteResourceIT {

    private static final String DEFAULT_NOM = "AAAAAAAAAA";
    private static final String UPDATED_NOM = "BBBBBBBBBB";

    private static final Integer DEFAULT_POINTS = 1;
    private static final Integer UPDATED_POINTS = 2;

    private static final Double DEFAULT_VALEUR = 1D;
    private static final Double UPDATED_VALEUR = 2D;

    private static final Integer DEFAULT_CLIENTSILVERMIN = 1;
    private static final Integer UPDATED_CLIENTSILVERMIN = 2;

    private static final Integer DEFAULT_CLIENTSILVERMAX = 1;
    private static final Integer UPDATED_CLIENTSILVERMAX = 2;

    private static final Integer DEFAULT_CLIENTGOLDMIN = 1;
    private static final Integer UPDATED_CLIENTGOLDMIN = 2;

    private static final Integer DEFAULT_CLIENTGOLDMAX = 1;
    private static final Integer UPDATED_CLIENTGOLDMAX = 2;

    private static final Integer DEFAULT_CLIENTPREMIUMMIN = 1;
    private static final Integer UPDATED_CLIENTPREMIUMMIN = 2;

    private static final Integer DEFAULT_CLIENTPREMIUMMAX = 1;
    private static final Integer UPDATED_CLIENTPREMIUMMAX = 2;

    private static final Devise DEFAULT_DEVISE = Devise.TND;
    private static final Devise UPDATED_DEVISE = Devise.EUR;

    private static final Boolean DEFAULT_ETAT = false;
    private static final Boolean UPDATED_ETAT = true;

    private static final LocalDate DEFAULT_CREE_LE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_CREE_LE = LocalDate.now(ZoneId.systemDefault());

    private static final String DEFAULT_CREE_PAR = "AAAAAAAAAA";
    private static final String UPDATED_CREE_PAR = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_MODIFIE_LE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_MODIFIE_LE = LocalDate.now(ZoneId.systemDefault());

    private static final String DEFAULT_MODIFIE_PAR = "AAAAAAAAAA";
    private static final String UPDATED_MODIFIE_PAR = "BBBBBBBBBB";

    @Autowired
    private GestionFideliteRepository gestionFideliteRepository;

    @Autowired
    private GestionFideliteMapper gestionFideliteMapper;

    @Autowired
    private GestionFideliteService gestionFideliteService;

    /**
     * This repository is mocked in the com.fininfo.bazarshop.repository.search test package.
     *
     * @see com.fininfo.bazarshop.repository.search.GestionFideliteSearchRepositoryMockConfiguration
     */
    @Autowired
    private GestionFideliteSearchRepository mockGestionFideliteSearchRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restGestionFideliteMockMvc;

    private GestionFidelite gestionFidelite;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static GestionFidelite createEntity(EntityManager em) {
        GestionFidelite gestionFidelite = new GestionFidelite()
            .nom(DEFAULT_NOM)
            .points(DEFAULT_POINTS)
            .valeur(DEFAULT_VALEUR)
            .clientsilvermin(DEFAULT_CLIENTSILVERMIN)
            .clientsilvermax(DEFAULT_CLIENTSILVERMAX)
            .clientgoldmin(DEFAULT_CLIENTGOLDMIN)
            .clientgoldmax(DEFAULT_CLIENTGOLDMAX)
            .clientpremiummin(DEFAULT_CLIENTPREMIUMMIN)
            .clientpremiummax(DEFAULT_CLIENTPREMIUMMAX)
            .devise(DEFAULT_DEVISE)
            .etat(DEFAULT_ETAT)
            .creeLe(DEFAULT_CREE_LE)
            .creePar(DEFAULT_CREE_PAR)
            .modifieLe(DEFAULT_MODIFIE_LE)
            .modifiePar(DEFAULT_MODIFIE_PAR);
        return gestionFidelite;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static GestionFidelite createUpdatedEntity(EntityManager em) {
        GestionFidelite gestionFidelite = new GestionFidelite()
            .nom(UPDATED_NOM)
            .points(UPDATED_POINTS)
            .valeur(UPDATED_VALEUR)
            .clientsilvermin(UPDATED_CLIENTSILVERMIN)
            .clientsilvermax(UPDATED_CLIENTSILVERMAX)
            .clientgoldmin(UPDATED_CLIENTGOLDMIN)
            .clientgoldmax(UPDATED_CLIENTGOLDMAX)
            .clientpremiummin(UPDATED_CLIENTPREMIUMMIN)
            .clientpremiummax(UPDATED_CLIENTPREMIUMMAX)
            .devise(UPDATED_DEVISE)
            .etat(UPDATED_ETAT)
            .creeLe(UPDATED_CREE_LE)
            .creePar(UPDATED_CREE_PAR)
            .modifieLe(UPDATED_MODIFIE_LE)
            .modifiePar(UPDATED_MODIFIE_PAR);
        return gestionFidelite;
    }

    @BeforeEach
    public void initTest() {
        gestionFidelite = createEntity(em);
    }

    @Test
    @Transactional
    public void createGestionFidelite() throws Exception {
        int databaseSizeBeforeCreate = gestionFideliteRepository.findAll().size();

        // Create the GestionFidelite
        GestionFideliteDTO gestionFideliteDTO = gestionFideliteMapper.toDto(gestionFidelite);
        restGestionFideliteMockMvc.perform(post("/api/gestion-fidelites")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(gestionFideliteDTO)))
            .andExpect(status().isCreated());

        // Validate the GestionFidelite in the database
        List<GestionFidelite> gestionFideliteList = gestionFideliteRepository.findAll();
        assertThat(gestionFideliteList).hasSize(databaseSizeBeforeCreate + 1);
        GestionFidelite testGestionFidelite = gestionFideliteList.get(gestionFideliteList.size() - 1);
        assertThat(testGestionFidelite.getNom()).isEqualTo(DEFAULT_NOM);
        assertThat(testGestionFidelite.getPoints()).isEqualTo(DEFAULT_POINTS);
        assertThat(testGestionFidelite.getValeur()).isEqualTo(DEFAULT_VALEUR);
        assertThat(testGestionFidelite.getClientsilvermin()).isEqualTo(DEFAULT_CLIENTSILVERMIN);
        assertThat(testGestionFidelite.getClientsilvermax()).isEqualTo(DEFAULT_CLIENTSILVERMAX);
        assertThat(testGestionFidelite.getClientgoldmin()).isEqualTo(DEFAULT_CLIENTGOLDMIN);
        assertThat(testGestionFidelite.getClientgoldmax()).isEqualTo(DEFAULT_CLIENTGOLDMAX);
        assertThat(testGestionFidelite.getClientpremiummin()).isEqualTo(DEFAULT_CLIENTPREMIUMMIN);
        assertThat(testGestionFidelite.getClientpremiummax()).isEqualTo(DEFAULT_CLIENTPREMIUMMAX);
        assertThat(testGestionFidelite.getDevise()).isEqualTo(DEFAULT_DEVISE);
        assertThat(testGestionFidelite.isEtat()).isEqualTo(DEFAULT_ETAT);
        assertThat(testGestionFidelite.getCreeLe()).isEqualTo(DEFAULT_CREE_LE);
        assertThat(testGestionFidelite.getCreePar()).isEqualTo(DEFAULT_CREE_PAR);
        assertThat(testGestionFidelite.getModifieLe()).isEqualTo(DEFAULT_MODIFIE_LE);
        assertThat(testGestionFidelite.getModifiePar()).isEqualTo(DEFAULT_MODIFIE_PAR);

        // Validate the GestionFidelite in Elasticsearch
        verify(mockGestionFideliteSearchRepository, times(1)).save(testGestionFidelite);
    }

    @Test
    @Transactional
    public void createGestionFideliteWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = gestionFideliteRepository.findAll().size();

        // Create the GestionFidelite with an existing ID
        gestionFidelite.setId(1L);
        GestionFideliteDTO gestionFideliteDTO = gestionFideliteMapper.toDto(gestionFidelite);

        // An entity with an existing ID cannot be created, so this API call must fail
        restGestionFideliteMockMvc.perform(post("/api/gestion-fidelites")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(gestionFideliteDTO)))
            .andExpect(status().isBadRequest());

        // Validate the GestionFidelite in the database
        List<GestionFidelite> gestionFideliteList = gestionFideliteRepository.findAll();
        assertThat(gestionFideliteList).hasSize(databaseSizeBeforeCreate);

        // Validate the GestionFidelite in Elasticsearch
        verify(mockGestionFideliteSearchRepository, times(0)).save(gestionFidelite);
    }


    @Test
    @Transactional
    public void checkNomIsRequired() throws Exception {
        int databaseSizeBeforeTest = gestionFideliteRepository.findAll().size();
        // set the field null
        gestionFidelite.setNom(null);

        // Create the GestionFidelite, which fails.
        GestionFideliteDTO gestionFideliteDTO = gestionFideliteMapper.toDto(gestionFidelite);

        restGestionFideliteMockMvc.perform(post("/api/gestion-fidelites")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(gestionFideliteDTO)))
            .andExpect(status().isBadRequest());

        List<GestionFidelite> gestionFideliteList = gestionFideliteRepository.findAll();
        assertThat(gestionFideliteList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkPointsIsRequired() throws Exception {
        int databaseSizeBeforeTest = gestionFideliteRepository.findAll().size();
        // set the field null
        gestionFidelite.setPoints(null);

        // Create the GestionFidelite, which fails.
        GestionFideliteDTO gestionFideliteDTO = gestionFideliteMapper.toDto(gestionFidelite);

        restGestionFideliteMockMvc.perform(post("/api/gestion-fidelites")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(gestionFideliteDTO)))
            .andExpect(status().isBadRequest());

        List<GestionFidelite> gestionFideliteList = gestionFideliteRepository.findAll();
        assertThat(gestionFideliteList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkValeurIsRequired() throws Exception {
        int databaseSizeBeforeTest = gestionFideliteRepository.findAll().size();
        // set the field null
        gestionFidelite.setValeur(null);

        // Create the GestionFidelite, which fails.
        GestionFideliteDTO gestionFideliteDTO = gestionFideliteMapper.toDto(gestionFidelite);

        restGestionFideliteMockMvc.perform(post("/api/gestion-fidelites")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(gestionFideliteDTO)))
            .andExpect(status().isBadRequest());

        List<GestionFidelite> gestionFideliteList = gestionFideliteRepository.findAll();
        assertThat(gestionFideliteList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkClientsilverminIsRequired() throws Exception {
        int databaseSizeBeforeTest = gestionFideliteRepository.findAll().size();
        // set the field null
        gestionFidelite.setClientsilvermin(null);

        // Create the GestionFidelite, which fails.
        GestionFideliteDTO gestionFideliteDTO = gestionFideliteMapper.toDto(gestionFidelite);

        restGestionFideliteMockMvc.perform(post("/api/gestion-fidelites")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(gestionFideliteDTO)))
            .andExpect(status().isBadRequest());

        List<GestionFidelite> gestionFideliteList = gestionFideliteRepository.findAll();
        assertThat(gestionFideliteList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkClientsilvermaxIsRequired() throws Exception {
        int databaseSizeBeforeTest = gestionFideliteRepository.findAll().size();
        // set the field null
        gestionFidelite.setClientsilvermax(null);

        // Create the GestionFidelite, which fails.
        GestionFideliteDTO gestionFideliteDTO = gestionFideliteMapper.toDto(gestionFidelite);

        restGestionFideliteMockMvc.perform(post("/api/gestion-fidelites")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(gestionFideliteDTO)))
            .andExpect(status().isBadRequest());

        List<GestionFidelite> gestionFideliteList = gestionFideliteRepository.findAll();
        assertThat(gestionFideliteList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkClientgoldminIsRequired() throws Exception {
        int databaseSizeBeforeTest = gestionFideliteRepository.findAll().size();
        // set the field null
        gestionFidelite.setClientgoldmin(null);

        // Create the GestionFidelite, which fails.
        GestionFideliteDTO gestionFideliteDTO = gestionFideliteMapper.toDto(gestionFidelite);

        restGestionFideliteMockMvc.perform(post("/api/gestion-fidelites")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(gestionFideliteDTO)))
            .andExpect(status().isBadRequest());

        List<GestionFidelite> gestionFideliteList = gestionFideliteRepository.findAll();
        assertThat(gestionFideliteList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkClientgoldmaxIsRequired() throws Exception {
        int databaseSizeBeforeTest = gestionFideliteRepository.findAll().size();
        // set the field null
        gestionFidelite.setClientgoldmax(null);

        // Create the GestionFidelite, which fails.
        GestionFideliteDTO gestionFideliteDTO = gestionFideliteMapper.toDto(gestionFidelite);

        restGestionFideliteMockMvc.perform(post("/api/gestion-fidelites")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(gestionFideliteDTO)))
            .andExpect(status().isBadRequest());

        List<GestionFidelite> gestionFideliteList = gestionFideliteRepository.findAll();
        assertThat(gestionFideliteList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkClientpremiumminIsRequired() throws Exception {
        int databaseSizeBeforeTest = gestionFideliteRepository.findAll().size();
        // set the field null
        gestionFidelite.setClientpremiummin(null);

        // Create the GestionFidelite, which fails.
        GestionFideliteDTO gestionFideliteDTO = gestionFideliteMapper.toDto(gestionFidelite);

        restGestionFideliteMockMvc.perform(post("/api/gestion-fidelites")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(gestionFideliteDTO)))
            .andExpect(status().isBadRequest());

        List<GestionFidelite> gestionFideliteList = gestionFideliteRepository.findAll();
        assertThat(gestionFideliteList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkClientpremiummaxIsRequired() throws Exception {
        int databaseSizeBeforeTest = gestionFideliteRepository.findAll().size();
        // set the field null
        gestionFidelite.setClientpremiummax(null);

        // Create the GestionFidelite, which fails.
        GestionFideliteDTO gestionFideliteDTO = gestionFideliteMapper.toDto(gestionFidelite);

        restGestionFideliteMockMvc.perform(post("/api/gestion-fidelites")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(gestionFideliteDTO)))
            .andExpect(status().isBadRequest());

        List<GestionFidelite> gestionFideliteList = gestionFideliteRepository.findAll();
        assertThat(gestionFideliteList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllGestionFidelites() throws Exception {
        // Initialize the database
        gestionFideliteRepository.saveAndFlush(gestionFidelite);

        // Get all the gestionFideliteList
        restGestionFideliteMockMvc.perform(get("/api/gestion-fidelites?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(gestionFidelite.getId().intValue())))
            .andExpect(jsonPath("$.[*].nom").value(hasItem(DEFAULT_NOM)))
            .andExpect(jsonPath("$.[*].points").value(hasItem(DEFAULT_POINTS)))
            .andExpect(jsonPath("$.[*].valeur").value(hasItem(DEFAULT_VALEUR.doubleValue())))
            .andExpect(jsonPath("$.[*].clientsilvermin").value(hasItem(DEFAULT_CLIENTSILVERMIN)))
            .andExpect(jsonPath("$.[*].clientsilvermax").value(hasItem(DEFAULT_CLIENTSILVERMAX)))
            .andExpect(jsonPath("$.[*].clientgoldmin").value(hasItem(DEFAULT_CLIENTGOLDMIN)))
            .andExpect(jsonPath("$.[*].clientgoldmax").value(hasItem(DEFAULT_CLIENTGOLDMAX)))
            .andExpect(jsonPath("$.[*].clientpremiummin").value(hasItem(DEFAULT_CLIENTPREMIUMMIN)))
            .andExpect(jsonPath("$.[*].clientpremiummax").value(hasItem(DEFAULT_CLIENTPREMIUMMAX)))
            .andExpect(jsonPath("$.[*].devise").value(hasItem(DEFAULT_DEVISE.toString())))
            .andExpect(jsonPath("$.[*].etat").value(hasItem(DEFAULT_ETAT.booleanValue())))
            .andExpect(jsonPath("$.[*].creeLe").value(hasItem(DEFAULT_CREE_LE.toString())))
            .andExpect(jsonPath("$.[*].creePar").value(hasItem(DEFAULT_CREE_PAR)))
            .andExpect(jsonPath("$.[*].modifieLe").value(hasItem(DEFAULT_MODIFIE_LE.toString())))
            .andExpect(jsonPath("$.[*].modifiePar").value(hasItem(DEFAULT_MODIFIE_PAR)));
    }
    
    @Test
    @Transactional
    public void getGestionFidelite() throws Exception {
        // Initialize the database
        gestionFideliteRepository.saveAndFlush(gestionFidelite);

        // Get the gestionFidelite
        restGestionFideliteMockMvc.perform(get("/api/gestion-fidelites/{id}", gestionFidelite.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(gestionFidelite.getId().intValue()))
            .andExpect(jsonPath("$.nom").value(DEFAULT_NOM))
            .andExpect(jsonPath("$.points").value(DEFAULT_POINTS))
            .andExpect(jsonPath("$.valeur").value(DEFAULT_VALEUR.doubleValue()))
            .andExpect(jsonPath("$.clientsilvermin").value(DEFAULT_CLIENTSILVERMIN))
            .andExpect(jsonPath("$.clientsilvermax").value(DEFAULT_CLIENTSILVERMAX))
            .andExpect(jsonPath("$.clientgoldmin").value(DEFAULT_CLIENTGOLDMIN))
            .andExpect(jsonPath("$.clientgoldmax").value(DEFAULT_CLIENTGOLDMAX))
            .andExpect(jsonPath("$.clientpremiummin").value(DEFAULT_CLIENTPREMIUMMIN))
            .andExpect(jsonPath("$.clientpremiummax").value(DEFAULT_CLIENTPREMIUMMAX))
            .andExpect(jsonPath("$.devise").value(DEFAULT_DEVISE.toString()))
            .andExpect(jsonPath("$.etat").value(DEFAULT_ETAT.booleanValue()))
            .andExpect(jsonPath("$.creeLe").value(DEFAULT_CREE_LE.toString()))
            .andExpect(jsonPath("$.creePar").value(DEFAULT_CREE_PAR))
            .andExpect(jsonPath("$.modifieLe").value(DEFAULT_MODIFIE_LE.toString()))
            .andExpect(jsonPath("$.modifiePar").value(DEFAULT_MODIFIE_PAR));
    }

    @Test
    @Transactional
    public void getNonExistingGestionFidelite() throws Exception {
        // Get the gestionFidelite
        restGestionFideliteMockMvc.perform(get("/api/gestion-fidelites/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateGestionFidelite() throws Exception {
        // Initialize the database
        gestionFideliteRepository.saveAndFlush(gestionFidelite);

        int databaseSizeBeforeUpdate = gestionFideliteRepository.findAll().size();

        // Update the gestionFidelite
        GestionFidelite updatedGestionFidelite = gestionFideliteRepository.findById(gestionFidelite.getId()).get();
        // Disconnect from session so that the updates on updatedGestionFidelite are not directly saved in db
        em.detach(updatedGestionFidelite);
        updatedGestionFidelite
            .nom(UPDATED_NOM)
            .points(UPDATED_POINTS)
            .valeur(UPDATED_VALEUR)
            .clientsilvermin(UPDATED_CLIENTSILVERMIN)
            .clientsilvermax(UPDATED_CLIENTSILVERMAX)
            .clientgoldmin(UPDATED_CLIENTGOLDMIN)
            .clientgoldmax(UPDATED_CLIENTGOLDMAX)
            .clientpremiummin(UPDATED_CLIENTPREMIUMMIN)
            .clientpremiummax(UPDATED_CLIENTPREMIUMMAX)
            .devise(UPDATED_DEVISE)
            .etat(UPDATED_ETAT)
            .creeLe(UPDATED_CREE_LE)
            .creePar(UPDATED_CREE_PAR)
            .modifieLe(UPDATED_MODIFIE_LE)
            .modifiePar(UPDATED_MODIFIE_PAR);
        GestionFideliteDTO gestionFideliteDTO = gestionFideliteMapper.toDto(updatedGestionFidelite);

        restGestionFideliteMockMvc.perform(put("/api/gestion-fidelites")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(gestionFideliteDTO)))
            .andExpect(status().isOk());

        // Validate the GestionFidelite in the database
        List<GestionFidelite> gestionFideliteList = gestionFideliteRepository.findAll();
        assertThat(gestionFideliteList).hasSize(databaseSizeBeforeUpdate);
        GestionFidelite testGestionFidelite = gestionFideliteList.get(gestionFideliteList.size() - 1);
        assertThat(testGestionFidelite.getNom()).isEqualTo(UPDATED_NOM);
        assertThat(testGestionFidelite.getPoints()).isEqualTo(UPDATED_POINTS);
        assertThat(testGestionFidelite.getValeur()).isEqualTo(UPDATED_VALEUR);
        assertThat(testGestionFidelite.getClientsilvermin()).isEqualTo(UPDATED_CLIENTSILVERMIN);
        assertThat(testGestionFidelite.getClientsilvermax()).isEqualTo(UPDATED_CLIENTSILVERMAX);
        assertThat(testGestionFidelite.getClientgoldmin()).isEqualTo(UPDATED_CLIENTGOLDMIN);
        assertThat(testGestionFidelite.getClientgoldmax()).isEqualTo(UPDATED_CLIENTGOLDMAX);
        assertThat(testGestionFidelite.getClientpremiummin()).isEqualTo(UPDATED_CLIENTPREMIUMMIN);
        assertThat(testGestionFidelite.getClientpremiummax()).isEqualTo(UPDATED_CLIENTPREMIUMMAX);
        assertThat(testGestionFidelite.getDevise()).isEqualTo(UPDATED_DEVISE);
        assertThat(testGestionFidelite.isEtat()).isEqualTo(UPDATED_ETAT);
        assertThat(testGestionFidelite.getCreeLe()).isEqualTo(UPDATED_CREE_LE);
        assertThat(testGestionFidelite.getCreePar()).isEqualTo(UPDATED_CREE_PAR);
        assertThat(testGestionFidelite.getModifieLe()).isEqualTo(UPDATED_MODIFIE_LE);
        assertThat(testGestionFidelite.getModifiePar()).isEqualTo(UPDATED_MODIFIE_PAR);

        // Validate the GestionFidelite in Elasticsearch
        verify(mockGestionFideliteSearchRepository, times(1)).save(testGestionFidelite);
    }

    @Test
    @Transactional
    public void updateNonExistingGestionFidelite() throws Exception {
        int databaseSizeBeforeUpdate = gestionFideliteRepository.findAll().size();

        // Create the GestionFidelite
        GestionFideliteDTO gestionFideliteDTO = gestionFideliteMapper.toDto(gestionFidelite);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restGestionFideliteMockMvc.perform(put("/api/gestion-fidelites")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(gestionFideliteDTO)))
            .andExpect(status().isBadRequest());

        // Validate the GestionFidelite in the database
        List<GestionFidelite> gestionFideliteList = gestionFideliteRepository.findAll();
        assertThat(gestionFideliteList).hasSize(databaseSizeBeforeUpdate);

        // Validate the GestionFidelite in Elasticsearch
        verify(mockGestionFideliteSearchRepository, times(0)).save(gestionFidelite);
    }

    @Test
    @Transactional
    public void deleteGestionFidelite() throws Exception {
        // Initialize the database
        gestionFideliteRepository.saveAndFlush(gestionFidelite);

        int databaseSizeBeforeDelete = gestionFideliteRepository.findAll().size();

        // Delete the gestionFidelite
        restGestionFideliteMockMvc.perform(delete("/api/gestion-fidelites/{id}", gestionFidelite.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<GestionFidelite> gestionFideliteList = gestionFideliteRepository.findAll();
        assertThat(gestionFideliteList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the GestionFidelite in Elasticsearch
        verify(mockGestionFideliteSearchRepository, times(1)).deleteById(gestionFidelite.getId());
    }

    @Test
    @Transactional
    public void searchGestionFidelite() throws Exception {
        // Initialize the database
        gestionFideliteRepository.saveAndFlush(gestionFidelite);
        when(mockGestionFideliteSearchRepository.search(queryStringQuery("id:" + gestionFidelite.getId())))
            .thenReturn(Collections.singletonList(gestionFidelite));
        // Search the gestionFidelite
        restGestionFideliteMockMvc.perform(get("/api/_search/gestion-fidelites?query=id:" + gestionFidelite.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(gestionFidelite.getId().intValue())))
            .andExpect(jsonPath("$.[*].nom").value(hasItem(DEFAULT_NOM)))
            .andExpect(jsonPath("$.[*].points").value(hasItem(DEFAULT_POINTS)))
            .andExpect(jsonPath("$.[*].valeur").value(hasItem(DEFAULT_VALEUR.doubleValue())))
            .andExpect(jsonPath("$.[*].clientsilvermin").value(hasItem(DEFAULT_CLIENTSILVERMIN)))
            .andExpect(jsonPath("$.[*].clientsilvermax").value(hasItem(DEFAULT_CLIENTSILVERMAX)))
            .andExpect(jsonPath("$.[*].clientgoldmin").value(hasItem(DEFAULT_CLIENTGOLDMIN)))
            .andExpect(jsonPath("$.[*].clientgoldmax").value(hasItem(DEFAULT_CLIENTGOLDMAX)))
            .andExpect(jsonPath("$.[*].clientpremiummin").value(hasItem(DEFAULT_CLIENTPREMIUMMIN)))
            .andExpect(jsonPath("$.[*].clientpremiummax").value(hasItem(DEFAULT_CLIENTPREMIUMMAX)))
            .andExpect(jsonPath("$.[*].devise").value(hasItem(DEFAULT_DEVISE.toString())))
            .andExpect(jsonPath("$.[*].etat").value(hasItem(DEFAULT_ETAT.booleanValue())))
            .andExpect(jsonPath("$.[*].creeLe").value(hasItem(DEFAULT_CREE_LE.toString())))
            .andExpect(jsonPath("$.[*].creePar").value(hasItem(DEFAULT_CREE_PAR)))
            .andExpect(jsonPath("$.[*].modifieLe").value(hasItem(DEFAULT_MODIFIE_LE.toString())))
            .andExpect(jsonPath("$.[*].modifiePar").value(hasItem(DEFAULT_MODIFIE_PAR)));
    }
}
