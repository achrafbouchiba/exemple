package com.fininfo.bazarshop.web.rest;

import com.fininfo.bazarshop.BazarshopApp;
import com.fininfo.bazarshop.domain.Remise;
import com.fininfo.bazarshop.repository.RemiseRepository;
import com.fininfo.bazarshop.repository.search.RemiseSearchRepository;
import com.fininfo.bazarshop.service.RemiseService;
import com.fininfo.bazarshop.service.dto.RemiseDTO;
import com.fininfo.bazarshop.service.mapper.RemiseMapper;

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

import com.fininfo.bazarshop.domain.enumeration.CatClient;
/**
 * Integration tests for the {@link RemiseResource} REST controller.
 */
@SpringBootTest(classes = BazarshopApp.class)
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
@WithMockUser
public class RemiseResourceIT {

    private static final CatClient DEFAULT_CATEGORIE_CLIENT = CatClient.Silver;
    private static final CatClient UPDATED_CATEGORIE_CLIENT = CatClient.Gold;

    private static final Double DEFAULT_PRIX = 1D;
    private static final Double UPDATED_PRIX = 2D;

    private static final Double DEFAULT_REMISE = 1D;
    private static final Double UPDATED_REMISE = 2D;

    private static final Boolean DEFAULT_CUMULABLE = false;
    private static final Boolean UPDATED_CUMULABLE = true;

    private static final LocalDate DEFAULT_DEBUT_PROMO = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DEBUT_PROMO = LocalDate.now(ZoneId.systemDefault());

    private static final LocalDate DEFAULT_FIN_PROMO = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_FIN_PROMO = LocalDate.now(ZoneId.systemDefault());

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
    private RemiseRepository remiseRepository;

    @Autowired
    private RemiseMapper remiseMapper;

    @Autowired
    private RemiseService remiseService;

    /**
     * This repository is mocked in the com.fininfo.bazarshop.repository.search test package.
     *
     * @see com.fininfo.bazarshop.repository.search.RemiseSearchRepositoryMockConfiguration
     */
    @Autowired
    private RemiseSearchRepository mockRemiseSearchRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restRemiseMockMvc;

    private Remise remise;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Remise createEntity(EntityManager em) {
        Remise remise = new Remise()
            .categorieClient(DEFAULT_CATEGORIE_CLIENT)
            .prix(DEFAULT_PRIX)
            .remise(DEFAULT_REMISE)
            .cumulable(DEFAULT_CUMULABLE)
            .debutPromo(DEFAULT_DEBUT_PROMO)
            .finPromo(DEFAULT_FIN_PROMO)
            .etat(DEFAULT_ETAT)
            .creeLe(DEFAULT_CREE_LE)
            .creePar(DEFAULT_CREE_PAR)
            .modifieLe(DEFAULT_MODIFIE_LE)
            .modifiePar(DEFAULT_MODIFIE_PAR);
        return remise;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Remise createUpdatedEntity(EntityManager em) {
        Remise remise = new Remise()
            .categorieClient(UPDATED_CATEGORIE_CLIENT)
            .prix(UPDATED_PRIX)
            .remise(UPDATED_REMISE)
            .cumulable(UPDATED_CUMULABLE)
            .debutPromo(UPDATED_DEBUT_PROMO)
            .finPromo(UPDATED_FIN_PROMO)
            .etat(UPDATED_ETAT)
            .creeLe(UPDATED_CREE_LE)
            .creePar(UPDATED_CREE_PAR)
            .modifieLe(UPDATED_MODIFIE_LE)
            .modifiePar(UPDATED_MODIFIE_PAR);
        return remise;
    }

    @BeforeEach
    public void initTest() {
        remise = createEntity(em);
    }

    @Test
    @Transactional
    public void createRemise() throws Exception {
        int databaseSizeBeforeCreate = remiseRepository.findAll().size();

        // Create the Remise
        RemiseDTO remiseDTO = remiseMapper.toDto(remise);
        restRemiseMockMvc.perform(post("/api/remises")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(remiseDTO)))
            .andExpect(status().isCreated());

        // Validate the Remise in the database
        List<Remise> remiseList = remiseRepository.findAll();
        assertThat(remiseList).hasSize(databaseSizeBeforeCreate + 1);
        Remise testRemise = remiseList.get(remiseList.size() - 1);
        assertThat(testRemise.getCategorieClient()).isEqualTo(DEFAULT_CATEGORIE_CLIENT);
        assertThat(testRemise.getPrix()).isEqualTo(DEFAULT_PRIX);
        assertThat(testRemise.getRemise()).isEqualTo(DEFAULT_REMISE);
        assertThat(testRemise.isCumulable()).isEqualTo(DEFAULT_CUMULABLE);
        assertThat(testRemise.getDebutPromo()).isEqualTo(DEFAULT_DEBUT_PROMO);
        assertThat(testRemise.getFinPromo()).isEqualTo(DEFAULT_FIN_PROMO);
        assertThat(testRemise.isEtat()).isEqualTo(DEFAULT_ETAT);
        assertThat(testRemise.getCreeLe()).isEqualTo(DEFAULT_CREE_LE);
        assertThat(testRemise.getCreePar()).isEqualTo(DEFAULT_CREE_PAR);
        assertThat(testRemise.getModifieLe()).isEqualTo(DEFAULT_MODIFIE_LE);
        assertThat(testRemise.getModifiePar()).isEqualTo(DEFAULT_MODIFIE_PAR);

        // Validate the Remise in Elasticsearch
        verify(mockRemiseSearchRepository, times(1)).save(testRemise);
    }

    @Test
    @Transactional
    public void createRemiseWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = remiseRepository.findAll().size();

        // Create the Remise with an existing ID
        remise.setId(1L);
        RemiseDTO remiseDTO = remiseMapper.toDto(remise);

        // An entity with an existing ID cannot be created, so this API call must fail
        restRemiseMockMvc.perform(post("/api/remises")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(remiseDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Remise in the database
        List<Remise> remiseList = remiseRepository.findAll();
        assertThat(remiseList).hasSize(databaseSizeBeforeCreate);

        // Validate the Remise in Elasticsearch
        verify(mockRemiseSearchRepository, times(0)).save(remise);
    }


    @Test
    @Transactional
    public void getAllRemises() throws Exception {
        // Initialize the database
        remiseRepository.saveAndFlush(remise);

        // Get all the remiseList
        restRemiseMockMvc.perform(get("/api/remises?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(remise.getId().intValue())))
            .andExpect(jsonPath("$.[*].categorieClient").value(hasItem(DEFAULT_CATEGORIE_CLIENT.toString())))
            .andExpect(jsonPath("$.[*].prix").value(hasItem(DEFAULT_PRIX.doubleValue())))
            .andExpect(jsonPath("$.[*].remise").value(hasItem(DEFAULT_REMISE.doubleValue())))
            .andExpect(jsonPath("$.[*].cumulable").value(hasItem(DEFAULT_CUMULABLE.booleanValue())))
            .andExpect(jsonPath("$.[*].debutPromo").value(hasItem(DEFAULT_DEBUT_PROMO.toString())))
            .andExpect(jsonPath("$.[*].finPromo").value(hasItem(DEFAULT_FIN_PROMO.toString())))
            .andExpect(jsonPath("$.[*].etat").value(hasItem(DEFAULT_ETAT.booleanValue())))
            .andExpect(jsonPath("$.[*].creeLe").value(hasItem(DEFAULT_CREE_LE.toString())))
            .andExpect(jsonPath("$.[*].creePar").value(hasItem(DEFAULT_CREE_PAR)))
            .andExpect(jsonPath("$.[*].modifieLe").value(hasItem(DEFAULT_MODIFIE_LE.toString())))
            .andExpect(jsonPath("$.[*].modifiePar").value(hasItem(DEFAULT_MODIFIE_PAR)));
    }
    
    @Test
    @Transactional
    public void getRemise() throws Exception {
        // Initialize the database
        remiseRepository.saveAndFlush(remise);

        // Get the remise
        restRemiseMockMvc.perform(get("/api/remises/{id}", remise.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(remise.getId().intValue()))
            .andExpect(jsonPath("$.categorieClient").value(DEFAULT_CATEGORIE_CLIENT.toString()))
            .andExpect(jsonPath("$.prix").value(DEFAULT_PRIX.doubleValue()))
            .andExpect(jsonPath("$.remise").value(DEFAULT_REMISE.doubleValue()))
            .andExpect(jsonPath("$.cumulable").value(DEFAULT_CUMULABLE.booleanValue()))
            .andExpect(jsonPath("$.debutPromo").value(DEFAULT_DEBUT_PROMO.toString()))
            .andExpect(jsonPath("$.finPromo").value(DEFAULT_FIN_PROMO.toString()))
            .andExpect(jsonPath("$.etat").value(DEFAULT_ETAT.booleanValue()))
            .andExpect(jsonPath("$.creeLe").value(DEFAULT_CREE_LE.toString()))
            .andExpect(jsonPath("$.creePar").value(DEFAULT_CREE_PAR))
            .andExpect(jsonPath("$.modifieLe").value(DEFAULT_MODIFIE_LE.toString()))
            .andExpect(jsonPath("$.modifiePar").value(DEFAULT_MODIFIE_PAR));
    }

    @Test
    @Transactional
    public void getNonExistingRemise() throws Exception {
        // Get the remise
        restRemiseMockMvc.perform(get("/api/remises/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateRemise() throws Exception {
        // Initialize the database
        remiseRepository.saveAndFlush(remise);

        int databaseSizeBeforeUpdate = remiseRepository.findAll().size();

        // Update the remise
        Remise updatedRemise = remiseRepository.findById(remise.getId()).get();
        // Disconnect from session so that the updates on updatedRemise are not directly saved in db
        em.detach(updatedRemise);
        updatedRemise
            .categorieClient(UPDATED_CATEGORIE_CLIENT)
            .prix(UPDATED_PRIX)
            .remise(UPDATED_REMISE)
            .cumulable(UPDATED_CUMULABLE)
            .debutPromo(UPDATED_DEBUT_PROMO)
            .finPromo(UPDATED_FIN_PROMO)
            .etat(UPDATED_ETAT)
            .creeLe(UPDATED_CREE_LE)
            .creePar(UPDATED_CREE_PAR)
            .modifieLe(UPDATED_MODIFIE_LE)
            .modifiePar(UPDATED_MODIFIE_PAR);
        RemiseDTO remiseDTO = remiseMapper.toDto(updatedRemise);

        restRemiseMockMvc.perform(put("/api/remises")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(remiseDTO)))
            .andExpect(status().isOk());

        // Validate the Remise in the database
        List<Remise> remiseList = remiseRepository.findAll();
        assertThat(remiseList).hasSize(databaseSizeBeforeUpdate);
        Remise testRemise = remiseList.get(remiseList.size() - 1);
        assertThat(testRemise.getCategorieClient()).isEqualTo(UPDATED_CATEGORIE_CLIENT);
        assertThat(testRemise.getPrix()).isEqualTo(UPDATED_PRIX);
        assertThat(testRemise.getRemise()).isEqualTo(UPDATED_REMISE);
        assertThat(testRemise.isCumulable()).isEqualTo(UPDATED_CUMULABLE);
        assertThat(testRemise.getDebutPromo()).isEqualTo(UPDATED_DEBUT_PROMO);
        assertThat(testRemise.getFinPromo()).isEqualTo(UPDATED_FIN_PROMO);
        assertThat(testRemise.isEtat()).isEqualTo(UPDATED_ETAT);
        assertThat(testRemise.getCreeLe()).isEqualTo(UPDATED_CREE_LE);
        assertThat(testRemise.getCreePar()).isEqualTo(UPDATED_CREE_PAR);
        assertThat(testRemise.getModifieLe()).isEqualTo(UPDATED_MODIFIE_LE);
        assertThat(testRemise.getModifiePar()).isEqualTo(UPDATED_MODIFIE_PAR);

        // Validate the Remise in Elasticsearch
        verify(mockRemiseSearchRepository, times(1)).save(testRemise);
    }

    @Test
    @Transactional
    public void updateNonExistingRemise() throws Exception {
        int databaseSizeBeforeUpdate = remiseRepository.findAll().size();

        // Create the Remise
        RemiseDTO remiseDTO = remiseMapper.toDto(remise);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restRemiseMockMvc.perform(put("/api/remises")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(remiseDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Remise in the database
        List<Remise> remiseList = remiseRepository.findAll();
        assertThat(remiseList).hasSize(databaseSizeBeforeUpdate);

        // Validate the Remise in Elasticsearch
        verify(mockRemiseSearchRepository, times(0)).save(remise);
    }

    @Test
    @Transactional
    public void deleteRemise() throws Exception {
        // Initialize the database
        remiseRepository.saveAndFlush(remise);

        int databaseSizeBeforeDelete = remiseRepository.findAll().size();

        // Delete the remise
        restRemiseMockMvc.perform(delete("/api/remises/{id}", remise.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Remise> remiseList = remiseRepository.findAll();
        assertThat(remiseList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the Remise in Elasticsearch
        verify(mockRemiseSearchRepository, times(1)).deleteById(remise.getId());
    }

    @Test
    @Transactional
    public void searchRemise() throws Exception {
        // Initialize the database
        remiseRepository.saveAndFlush(remise);
        when(mockRemiseSearchRepository.search(queryStringQuery("id:" + remise.getId())))
            .thenReturn(Collections.singletonList(remise));
        // Search the remise
        restRemiseMockMvc.perform(get("/api/_search/remises?query=id:" + remise.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(remise.getId().intValue())))
            .andExpect(jsonPath("$.[*].categorieClient").value(hasItem(DEFAULT_CATEGORIE_CLIENT.toString())))
            .andExpect(jsonPath("$.[*].prix").value(hasItem(DEFAULT_PRIX.doubleValue())))
            .andExpect(jsonPath("$.[*].remise").value(hasItem(DEFAULT_REMISE.doubleValue())))
            .andExpect(jsonPath("$.[*].cumulable").value(hasItem(DEFAULT_CUMULABLE.booleanValue())))
            .andExpect(jsonPath("$.[*].debutPromo").value(hasItem(DEFAULT_DEBUT_PROMO.toString())))
            .andExpect(jsonPath("$.[*].finPromo").value(hasItem(DEFAULT_FIN_PROMO.toString())))
            .andExpect(jsonPath("$.[*].etat").value(hasItem(DEFAULT_ETAT.booleanValue())))
            .andExpect(jsonPath("$.[*].creeLe").value(hasItem(DEFAULT_CREE_LE.toString())))
            .andExpect(jsonPath("$.[*].creePar").value(hasItem(DEFAULT_CREE_PAR)))
            .andExpect(jsonPath("$.[*].modifieLe").value(hasItem(DEFAULT_MODIFIE_LE.toString())))
            .andExpect(jsonPath("$.[*].modifiePar").value(hasItem(DEFAULT_MODIFIE_PAR)));
    }
}
