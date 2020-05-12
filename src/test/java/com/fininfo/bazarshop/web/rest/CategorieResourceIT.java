package com.fininfo.bazarshop.web.rest;

import com.fininfo.bazarshop.BazarshopApp;
import com.fininfo.bazarshop.domain.Categorie;
import com.fininfo.bazarshop.repository.CategorieRepository;
import com.fininfo.bazarshop.repository.search.CategorieSearchRepository;
import com.fininfo.bazarshop.service.CategorieService;
import com.fininfo.bazarshop.service.dto.CategorieDTO;
import com.fininfo.bazarshop.service.mapper.CategorieMapper;

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

/**
 * Integration tests for the {@link CategorieResource} REST controller.
 */
@SpringBootTest(classes = BazarshopApp.class)
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
@WithMockUser
public class CategorieResourceIT {

    private static final String DEFAULT_NOM = "AAAAAAAAAA";
    private static final String UPDATED_NOM = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final Integer DEFAULT_POSITION = 1;
    private static final Integer UPDATED_POSITION = 2;

    private static final Boolean DEFAULT_ETAT = false;
    private static final Boolean UPDATED_ETAT = true;

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
    private CategorieRepository categorieRepository;

    @Autowired
    private CategorieMapper categorieMapper;

    @Autowired
    private CategorieService categorieService;

    /**
     * This repository is mocked in the com.fininfo.bazarshop.repository.search test package.
     *
     * @see com.fininfo.bazarshop.repository.search.CategorieSearchRepositoryMockConfiguration
     */
    @Autowired
    private CategorieSearchRepository mockCategorieSearchRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restCategorieMockMvc;

    private Categorie categorie;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Categorie createEntity(EntityManager em) {
        Categorie categorie = new Categorie()
            .nom(DEFAULT_NOM)
            .description(DEFAULT_DESCRIPTION)
            .position(DEFAULT_POSITION)
            .etat(DEFAULT_ETAT)
            .image(DEFAULT_IMAGE)
            .imageContentType(DEFAULT_IMAGE_CONTENT_TYPE)
            .creeLe(DEFAULT_CREE_LE)
            .creePar(DEFAULT_CREE_PAR)
            .modifieLe(DEFAULT_MODIFIE_LE)
            .modifiePar(DEFAULT_MODIFIE_PAR);
        return categorie;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Categorie createUpdatedEntity(EntityManager em) {
        Categorie categorie = new Categorie()
            .nom(UPDATED_NOM)
            .description(UPDATED_DESCRIPTION)
            .position(UPDATED_POSITION)
            .etat(UPDATED_ETAT)
            .image(UPDATED_IMAGE)
            .imageContentType(UPDATED_IMAGE_CONTENT_TYPE)
            .creeLe(UPDATED_CREE_LE)
            .creePar(UPDATED_CREE_PAR)
            .modifieLe(UPDATED_MODIFIE_LE)
            .modifiePar(UPDATED_MODIFIE_PAR);
        return categorie;
    }

    @BeforeEach
    public void initTest() {
        categorie = createEntity(em);
    }

    @Test
    @Transactional
    public void createCategorie() throws Exception {
        int databaseSizeBeforeCreate = categorieRepository.findAll().size();

        // Create the Categorie
        CategorieDTO categorieDTO = categorieMapper.toDto(categorie);
        restCategorieMockMvc.perform(post("/api/categories")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(categorieDTO)))
            .andExpect(status().isCreated());

        // Validate the Categorie in the database
        List<Categorie> categorieList = categorieRepository.findAll();
        assertThat(categorieList).hasSize(databaseSizeBeforeCreate + 1);
        Categorie testCategorie = categorieList.get(categorieList.size() - 1);
        assertThat(testCategorie.getNom()).isEqualTo(DEFAULT_NOM);
        assertThat(testCategorie.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testCategorie.getPosition()).isEqualTo(DEFAULT_POSITION);
        assertThat(testCategorie.isEtat()).isEqualTo(DEFAULT_ETAT);
        assertThat(testCategorie.getImage()).isEqualTo(DEFAULT_IMAGE);
        assertThat(testCategorie.getImageContentType()).isEqualTo(DEFAULT_IMAGE_CONTENT_TYPE);
        assertThat(testCategorie.getCreeLe()).isEqualTo(DEFAULT_CREE_LE);
        assertThat(testCategorie.getCreePar()).isEqualTo(DEFAULT_CREE_PAR);
        assertThat(testCategorie.getModifieLe()).isEqualTo(DEFAULT_MODIFIE_LE);
        assertThat(testCategorie.getModifiePar()).isEqualTo(DEFAULT_MODIFIE_PAR);

        // Validate the Categorie in Elasticsearch
        verify(mockCategorieSearchRepository, times(1)).save(testCategorie);
    }

    @Test
    @Transactional
    public void createCategorieWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = categorieRepository.findAll().size();

        // Create the Categorie with an existing ID
        categorie.setId(1L);
        CategorieDTO categorieDTO = categorieMapper.toDto(categorie);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCategorieMockMvc.perform(post("/api/categories")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(categorieDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Categorie in the database
        List<Categorie> categorieList = categorieRepository.findAll();
        assertThat(categorieList).hasSize(databaseSizeBeforeCreate);

        // Validate the Categorie in Elasticsearch
        verify(mockCategorieSearchRepository, times(0)).save(categorie);
    }


    @Test
    @Transactional
    public void checkNomIsRequired() throws Exception {
        int databaseSizeBeforeTest = categorieRepository.findAll().size();
        // set the field null
        categorie.setNom(null);

        // Create the Categorie, which fails.
        CategorieDTO categorieDTO = categorieMapper.toDto(categorie);

        restCategorieMockMvc.perform(post("/api/categories")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(categorieDTO)))
            .andExpect(status().isBadRequest());

        List<Categorie> categorieList = categorieRepository.findAll();
        assertThat(categorieList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkPositionIsRequired() throws Exception {
        int databaseSizeBeforeTest = categorieRepository.findAll().size();
        // set the field null
        categorie.setPosition(null);

        // Create the Categorie, which fails.
        CategorieDTO categorieDTO = categorieMapper.toDto(categorie);

        restCategorieMockMvc.perform(post("/api/categories")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(categorieDTO)))
            .andExpect(status().isBadRequest());

        List<Categorie> categorieList = categorieRepository.findAll();
        assertThat(categorieList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllCategories() throws Exception {
        // Initialize the database
        categorieRepository.saveAndFlush(categorie);

        // Get all the categorieList
        restCategorieMockMvc.perform(get("/api/categories?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(categorie.getId().intValue())))
            .andExpect(jsonPath("$.[*].nom").value(hasItem(DEFAULT_NOM)))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION)))
            .andExpect(jsonPath("$.[*].position").value(hasItem(DEFAULT_POSITION)))
            .andExpect(jsonPath("$.[*].etat").value(hasItem(DEFAULT_ETAT.booleanValue())))
            .andExpect(jsonPath("$.[*].imageContentType").value(hasItem(DEFAULT_IMAGE_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].image").value(hasItem(Base64Utils.encodeToString(DEFAULT_IMAGE))))
            .andExpect(jsonPath("$.[*].creeLe").value(hasItem(DEFAULT_CREE_LE.toString())))
            .andExpect(jsonPath("$.[*].creePar").value(hasItem(DEFAULT_CREE_PAR)))
            .andExpect(jsonPath("$.[*].modifieLe").value(hasItem(DEFAULT_MODIFIE_LE.toString())))
            .andExpect(jsonPath("$.[*].modifiePar").value(hasItem(DEFAULT_MODIFIE_PAR)));
    }
    
    @Test
    @Transactional
    public void getCategorie() throws Exception {
        // Initialize the database
        categorieRepository.saveAndFlush(categorie);

        // Get the categorie
        restCategorieMockMvc.perform(get("/api/categories/{id}", categorie.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(categorie.getId().intValue()))
            .andExpect(jsonPath("$.nom").value(DEFAULT_NOM))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION))
            .andExpect(jsonPath("$.position").value(DEFAULT_POSITION))
            .andExpect(jsonPath("$.etat").value(DEFAULT_ETAT.booleanValue()))
            .andExpect(jsonPath("$.imageContentType").value(DEFAULT_IMAGE_CONTENT_TYPE))
            .andExpect(jsonPath("$.image").value(Base64Utils.encodeToString(DEFAULT_IMAGE)))
            .andExpect(jsonPath("$.creeLe").value(DEFAULT_CREE_LE.toString()))
            .andExpect(jsonPath("$.creePar").value(DEFAULT_CREE_PAR))
            .andExpect(jsonPath("$.modifieLe").value(DEFAULT_MODIFIE_LE.toString()))
            .andExpect(jsonPath("$.modifiePar").value(DEFAULT_MODIFIE_PAR));
    }

    @Test
    @Transactional
    public void getNonExistingCategorie() throws Exception {
        // Get the categorie
        restCategorieMockMvc.perform(get("/api/categories/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCategorie() throws Exception {
        // Initialize the database
        categorieRepository.saveAndFlush(categorie);

        int databaseSizeBeforeUpdate = categorieRepository.findAll().size();

        // Update the categorie
        Categorie updatedCategorie = categorieRepository.findById(categorie.getId()).get();
        // Disconnect from session so that the updates on updatedCategorie are not directly saved in db
        em.detach(updatedCategorie);
        updatedCategorie
            .nom(UPDATED_NOM)
            .description(UPDATED_DESCRIPTION)
            .position(UPDATED_POSITION)
            .etat(UPDATED_ETAT)
            .image(UPDATED_IMAGE)
            .imageContentType(UPDATED_IMAGE_CONTENT_TYPE)
            .creeLe(UPDATED_CREE_LE)
            .creePar(UPDATED_CREE_PAR)
            .modifieLe(UPDATED_MODIFIE_LE)
            .modifiePar(UPDATED_MODIFIE_PAR);
        CategorieDTO categorieDTO = categorieMapper.toDto(updatedCategorie);

        restCategorieMockMvc.perform(put("/api/categories")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(categorieDTO)))
            .andExpect(status().isOk());

        // Validate the Categorie in the database
        List<Categorie> categorieList = categorieRepository.findAll();
        assertThat(categorieList).hasSize(databaseSizeBeforeUpdate);
        Categorie testCategorie = categorieList.get(categorieList.size() - 1);
        assertThat(testCategorie.getNom()).isEqualTo(UPDATED_NOM);
        assertThat(testCategorie.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testCategorie.getPosition()).isEqualTo(UPDATED_POSITION);
        assertThat(testCategorie.isEtat()).isEqualTo(UPDATED_ETAT);
        assertThat(testCategorie.getImage()).isEqualTo(UPDATED_IMAGE);
        assertThat(testCategorie.getImageContentType()).isEqualTo(UPDATED_IMAGE_CONTENT_TYPE);
        assertThat(testCategorie.getCreeLe()).isEqualTo(UPDATED_CREE_LE);
        assertThat(testCategorie.getCreePar()).isEqualTo(UPDATED_CREE_PAR);
        assertThat(testCategorie.getModifieLe()).isEqualTo(UPDATED_MODIFIE_LE);
        assertThat(testCategorie.getModifiePar()).isEqualTo(UPDATED_MODIFIE_PAR);

        // Validate the Categorie in Elasticsearch
        verify(mockCategorieSearchRepository, times(1)).save(testCategorie);
    }

    @Test
    @Transactional
    public void updateNonExistingCategorie() throws Exception {
        int databaseSizeBeforeUpdate = categorieRepository.findAll().size();

        // Create the Categorie
        CategorieDTO categorieDTO = categorieMapper.toDto(categorie);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCategorieMockMvc.perform(put("/api/categories")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(categorieDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Categorie in the database
        List<Categorie> categorieList = categorieRepository.findAll();
        assertThat(categorieList).hasSize(databaseSizeBeforeUpdate);

        // Validate the Categorie in Elasticsearch
        verify(mockCategorieSearchRepository, times(0)).save(categorie);
    }

    @Test
    @Transactional
    public void deleteCategorie() throws Exception {
        // Initialize the database
        categorieRepository.saveAndFlush(categorie);

        int databaseSizeBeforeDelete = categorieRepository.findAll().size();

        // Delete the categorie
        restCategorieMockMvc.perform(delete("/api/categories/{id}", categorie.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Categorie> categorieList = categorieRepository.findAll();
        assertThat(categorieList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the Categorie in Elasticsearch
        verify(mockCategorieSearchRepository, times(1)).deleteById(categorie.getId());
    }

    @Test
    @Transactional
    public void searchCategorie() throws Exception {
        // Initialize the database
        categorieRepository.saveAndFlush(categorie);
        when(mockCategorieSearchRepository.search(queryStringQuery("id:" + categorie.getId())))
            .thenReturn(Collections.singletonList(categorie));
        // Search the categorie
        restCategorieMockMvc.perform(get("/api/_search/categories?query=id:" + categorie.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(categorie.getId().intValue())))
            .andExpect(jsonPath("$.[*].nom").value(hasItem(DEFAULT_NOM)))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION)))
            .andExpect(jsonPath("$.[*].position").value(hasItem(DEFAULT_POSITION)))
            .andExpect(jsonPath("$.[*].etat").value(hasItem(DEFAULT_ETAT.booleanValue())))
            .andExpect(jsonPath("$.[*].imageContentType").value(hasItem(DEFAULT_IMAGE_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].image").value(hasItem(Base64Utils.encodeToString(DEFAULT_IMAGE))))
            .andExpect(jsonPath("$.[*].creeLe").value(hasItem(DEFAULT_CREE_LE.toString())))
            .andExpect(jsonPath("$.[*].creePar").value(hasItem(DEFAULT_CREE_PAR)))
            .andExpect(jsonPath("$.[*].modifieLe").value(hasItem(DEFAULT_MODIFIE_LE.toString())))
            .andExpect(jsonPath("$.[*].modifiePar").value(hasItem(DEFAULT_MODIFIE_PAR)));
    }
}
