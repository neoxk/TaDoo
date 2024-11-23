package si.feri.ris.kirbis.todo.services;

import si.feri.ris.kirbis.todo.entities.Task;
import si.feri.ris.kirbis.todo.entities.Tasklist;

import java.util.List;
import java.util.Optional;

public interface TaskService {
    public void create(Task task);
    public void setDone(int id);
    public void update(int id, Task task);
    public void delete(int id);
    public String share(int id);
    public List<Task> getAll();
    public Optional<Task> getById(int id);
}
