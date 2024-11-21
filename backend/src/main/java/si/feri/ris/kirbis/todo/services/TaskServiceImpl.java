package si.feri.ris.kirbis.todo.services;

import org.springframework.stereotype.Service;
import si.feri.ris.kirbis.todo.entities.Task;
import si.feri.ris.kirbis.todo.repositories.TaskRepository;

import java.util.List;
import java.util.Optional;

@Service
public class TaskServiceImpl implements TaskService {

    private final TaskRepository repository;

    // Constructor injection of the repository
    public TaskServiceImpl(TaskRepository repository) {
        this.repository = repository;
    }

    @Override
    public void create(Task task) {
        repository.save(task);
    }

    @Override
    public void setDone(int id) {
        Optional<Task> optionalTask = repository.findById(id);
        if (optionalTask.isPresent()) {
            Task task = optionalTask.get();
            task.setDone(true);
            repository.save(task);
        }
    }

    @Override
    public void update(int id, Task task) {
        if (repository.existsById(id)) {
            task.setTask_id(id);
            repository.save(task);
        }
    }

    @Override
    public void delete(int id) {
        repository.deleteById(id);
    }

    @Override
    public List<Task> getAll() {
        return repository.findAll();
    }

    @Override
    public Optional<Task> getById(int id) {
        return repository.findById(id);
    }
}
