package si.feri.ris.kirbis.todo.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import si.feri.ris.kirbis.todo.entities.Task;

public interface TaskRepository extends JpaRepository<Task, Long> {
}
