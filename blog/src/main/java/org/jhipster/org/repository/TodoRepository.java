package org.jhipster.org.repository;
import org.jhipster.org.domain.Todo;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Todo entity.
 */
@Repository
public interface TodoRepository extends JpaRepository<Todo, Long> {

}
