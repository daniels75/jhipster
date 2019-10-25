package org.jhipster.org.repository;
import org.jhipster.org.domain.SimpleTable;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the SimpleTable entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SimpleTableRepository extends JpaRepository<SimpleTable, Long> {

}
