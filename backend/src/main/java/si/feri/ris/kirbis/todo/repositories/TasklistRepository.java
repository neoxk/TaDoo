package si.feri.ris.kirbis.todo.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import si.feri.ris.kirbis.todo.entities.Tasklist;

public interface TasklistRepository extends JpaRepository<Tasklist, Integer> {
}
