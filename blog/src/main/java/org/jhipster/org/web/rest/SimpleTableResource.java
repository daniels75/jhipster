package org.jhipster.org.web.rest;

import org.jhipster.org.domain.SimpleTable;
import org.jhipster.org.repository.SimpleTableRepository;
import org.jhipster.org.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link org.jhipster.org.domain.SimpleTable}.
 */
@RestController
@RequestMapping("/api")
public class SimpleTableResource {

    private final Logger log = LoggerFactory.getLogger(SimpleTableResource.class);

    private static final String ENTITY_NAME = "simpleTable";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final SimpleTableRepository simpleTableRepository;

    public SimpleTableResource(SimpleTableRepository simpleTableRepository) {
        this.simpleTableRepository = simpleTableRepository;
    }

    /**
     * {@code POST  /simple-tables} : Create a new simpleTable.
     *
     * @param simpleTable the simpleTable to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new simpleTable, or with status {@code 400 (Bad Request)} if the simpleTable has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/simple-tables")
    public ResponseEntity<SimpleTable> createSimpleTable(@Valid @RequestBody SimpleTable simpleTable) throws URISyntaxException {
        log.debug("REST request to save SimpleTable : {}", simpleTable);
        if (simpleTable.getId() != null) {
            throw new BadRequestAlertException("A new simpleTable cannot already have an ID", ENTITY_NAME, "idexists");
        }
        SimpleTable result = simpleTableRepository.save(simpleTable);
        return ResponseEntity.created(new URI("/api/simple-tables/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /simple-tables} : Updates an existing simpleTable.
     *
     * @param simpleTable the simpleTable to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated simpleTable,
     * or with status {@code 400 (Bad Request)} if the simpleTable is not valid,
     * or with status {@code 500 (Internal Server Error)} if the simpleTable couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/simple-tables")
    public ResponseEntity<SimpleTable> updateSimpleTable(@Valid @RequestBody SimpleTable simpleTable) throws URISyntaxException {
        log.debug("REST request to update SimpleTable : {}", simpleTable);
        if (simpleTable.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        SimpleTable result = simpleTableRepository.save(simpleTable);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, simpleTable.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /simple-tables} : get all the simpleTables.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of simpleTables in body.
     */
    @GetMapping("/simple-tables")
    public List<SimpleTable> getAllSimpleTables() {
        log.debug("REST request to get all SimpleTables");
        return simpleTableRepository.findAll();
    }

    /**
     * {@code GET  /simple-tables/:id} : get the "id" simpleTable.
     *
     * @param id the id of the simpleTable to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the simpleTable, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/simple-tables/{id}")
    public ResponseEntity<SimpleTable> getSimpleTable(@PathVariable Long id) {
        log.debug("REST request to get SimpleTable : {}", id);
        Optional<SimpleTable> simpleTable = simpleTableRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(simpleTable);
    }

    /**
     * {@code DELETE  /simple-tables/:id} : delete the "id" simpleTable.
     *
     * @param id the id of the simpleTable to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/simple-tables/{id}")
    public ResponseEntity<Void> deleteSimpleTable(@PathVariable Long id) {
        log.debug("REST request to delete SimpleTable : {}", id);
        simpleTableRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
