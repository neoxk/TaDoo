package si.feri.ris.kirbis.todo.repositoryTests;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import si.feri.ris.kirbis.todo.entities.Tasklist;
import si.feri.ris.kirbis.todo.repositories.TasklistRepository;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
public class TasklistRepositoryTest {

    @Autowired
    private TasklistRepository taskListRepository;

    private Tasklist taskList;

    @BeforeEach
    void setUp() {
        taskList = new Tasklist();
        taskList.setName("Test Task List");
        taskListRepository.save(taskList);
    }

    @Test
    void deleteById_shouldRemoveTaskList() {
        taskListRepository.deleteById(taskList.getTasklistId());
        Optional<Tasklist> foundTaskList = taskListRepository.findById(taskList.getTasklistId());
        assertThat(foundTaskList).isNotPresent();
    }
}