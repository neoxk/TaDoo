package si.feri.ris.kirbis.todo.services;

import si.feri.ris.kirbis.todo.entities.Task;
import si.feri.ris.kirbis.todo.entities.Tasklist;

import java.util.List;
import java.util.Optional;

public interface TaskService {
    public void create(Task task);
    public void setDone(long id);
    public void update(long id, Task task);
    public void delete(long id);
    public List<Task> getAll();
    public Optional<Task> getById(long id);
}
