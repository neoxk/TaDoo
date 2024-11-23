package si.feri.ris.kirbis.todo.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import si.feri.ris.kirbis.todo.entities.Task;

import java.util.List;

public interface TaskRepository extends JpaRepository<Task, Integer> {
    List<Task> findByTasklistId(int tasklistId);
}
