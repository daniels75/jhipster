package org.jhipster.org.web.rest;

import org.jhipster.org.BlogApp;
import org.jhipster.org.domain.SimpleTable;
import org.jhipster.org.repository.SimpleTableRepository;
import org.jhipster.org.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.List;

import static org.jhipster.org.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link SimpleTableResource} REST controller.
 */
@SpringBootTest(classes = BlogApp.class)
public class SimpleTableResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_CONTENT = "AAAAAAAAAA";
    private static final String UPDATED_CONTENT = "BBBBBBBBBB";

    @Autowired
    private SimpleTableRepository simpleTableRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restSimpleTableMockMvc;

    private SimpleTable simpleTable;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final SimpleTableResource simpleTableResource = new SimpleTableResource(simpleTableRepository);
        this.restSimpleTableMockMvc = MockMvcBuilders.standaloneSetup(simpleTableResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static SimpleTable createEntity(EntityManager em) {
        SimpleTable simpleTable = new SimpleTable()
            .name(DEFAULT_NAME)
            .content(DEFAULT_CONTENT);
        return simpleTable;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static SimpleTable createUpdatedEntity(EntityManager em) {
        SimpleTable simpleTable = new SimpleTable()
            .name(UPDATED_NAME)
            .content(UPDATED_CONTENT);
        return simpleTable;
    }

    @BeforeEach
    public void initTest() {
        simpleTable = createEntity(em);
    }

    @Test
    @Transactional
    public void createSimpleTable() throws Exception {
        int databaseSizeBeforeCreate = simpleTableRepository.findAll().size();

        // Create the SimpleTable
        restSimpleTableMockMvc.perform(post("/api/simple-tables")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(simpleTable)))
            .andExpect(status().isCreated());

        // Validate the SimpleTable in the database
        List<SimpleTable> simpleTableList = simpleTableRepository.findAll();
        assertThat(simpleTableList).hasSize(databaseSizeBeforeCreate + 1);
        SimpleTable testSimpleTable = simpleTableList.get(simpleTableList.size() - 1);
        assertThat(testSimpleTable.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testSimpleTable.getContent()).isEqualTo(DEFAULT_CONTENT);
    }

    @Test
    @Transactional
    public void createSimpleTableWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = simpleTableRepository.findAll().size();

        // Create the SimpleTable with an existing ID
        simpleTable.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restSimpleTableMockMvc.perform(post("/api/simple-tables")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(simpleTable)))
            .andExpect(status().isBadRequest());

        // Validate the SimpleTable in the database
        List<SimpleTable> simpleTableList = simpleTableRepository.findAll();
        assertThat(simpleTableList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = simpleTableRepository.findAll().size();
        // set the field null
        simpleTable.setName(null);

        // Create the SimpleTable, which fails.

        restSimpleTableMockMvc.perform(post("/api/simple-tables")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(simpleTable)))
            .andExpect(status().isBadRequest());

        List<SimpleTable> simpleTableList = simpleTableRepository.findAll();
        assertThat(simpleTableList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkContentIsRequired() throws Exception {
        int databaseSizeBeforeTest = simpleTableRepository.findAll().size();
        // set the field null
        simpleTable.setContent(null);

        // Create the SimpleTable, which fails.

        restSimpleTableMockMvc.perform(post("/api/simple-tables")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(simpleTable)))
            .andExpect(status().isBadRequest());

        List<SimpleTable> simpleTableList = simpleTableRepository.findAll();
        assertThat(simpleTableList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllSimpleTables() throws Exception {
        // Initialize the database
        simpleTableRepository.saveAndFlush(simpleTable);

        // Get all the simpleTableList
        restSimpleTableMockMvc.perform(get("/api/simple-tables?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(simpleTable.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)))
            .andExpect(jsonPath("$.[*].content").value(hasItem(DEFAULT_CONTENT)));
    }
    
    @Test
    @Transactional
    public void getSimpleTable() throws Exception {
        // Initialize the database
        simpleTableRepository.saveAndFlush(simpleTable);

        // Get the simpleTable
        restSimpleTableMockMvc.perform(get("/api/simple-tables/{id}", simpleTable.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(simpleTable.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME))
            .andExpect(jsonPath("$.content").value(DEFAULT_CONTENT));
    }

    @Test
    @Transactional
    public void getNonExistingSimpleTable() throws Exception {
        // Get the simpleTable
        restSimpleTableMockMvc.perform(get("/api/simple-tables/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateSimpleTable() throws Exception {
        // Initialize the database
        simpleTableRepository.saveAndFlush(simpleTable);

        int databaseSizeBeforeUpdate = simpleTableRepository.findAll().size();

        // Update the simpleTable
        SimpleTable updatedSimpleTable = simpleTableRepository.findById(simpleTable.getId()).get();
        // Disconnect from session so that the updates on updatedSimpleTable are not directly saved in db
        em.detach(updatedSimpleTable);
        updatedSimpleTable
            .name(UPDATED_NAME)
            .content(UPDATED_CONTENT);

        restSimpleTableMockMvc.perform(put("/api/simple-tables")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedSimpleTable)))
            .andExpect(status().isOk());

        // Validate the SimpleTable in the database
        List<SimpleTable> simpleTableList = simpleTableRepository.findAll();
        assertThat(simpleTableList).hasSize(databaseSizeBeforeUpdate);
        SimpleTable testSimpleTable = simpleTableList.get(simpleTableList.size() - 1);
        assertThat(testSimpleTable.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testSimpleTable.getContent()).isEqualTo(UPDATED_CONTENT);
    }

    @Test
    @Transactional
    public void updateNonExistingSimpleTable() throws Exception {
        int databaseSizeBeforeUpdate = simpleTableRepository.findAll().size();

        // Create the SimpleTable

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restSimpleTableMockMvc.perform(put("/api/simple-tables")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(simpleTable)))
            .andExpect(status().isBadRequest());

        // Validate the SimpleTable in the database
        List<SimpleTable> simpleTableList = simpleTableRepository.findAll();
        assertThat(simpleTableList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteSimpleTable() throws Exception {
        // Initialize the database
        simpleTableRepository.saveAndFlush(simpleTable);

        int databaseSizeBeforeDelete = simpleTableRepository.findAll().size();

        // Delete the simpleTable
        restSimpleTableMockMvc.perform(delete("/api/simple-tables/{id}", simpleTable.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<SimpleTable> simpleTableList = simpleTableRepository.findAll();
        assertThat(simpleTableList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(SimpleTable.class);
        SimpleTable simpleTable1 = new SimpleTable();
        simpleTable1.setId(1L);
        SimpleTable simpleTable2 = new SimpleTable();
        simpleTable2.setId(simpleTable1.getId());
        assertThat(simpleTable1).isEqualTo(simpleTable2);
        simpleTable2.setId(2L);
        assertThat(simpleTable1).isNotEqualTo(simpleTable2);
        simpleTable1.setId(null);
        assertThat(simpleTable1).isNotEqualTo(simpleTable2);
    }
}
