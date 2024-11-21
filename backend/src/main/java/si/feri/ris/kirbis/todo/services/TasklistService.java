package si.feri.ris.kirbis.todo.services;

import si.feri.ris.kirbis.todo.entities.Task;
import si.feri.ris.kirbis.todo.entities.Tasklist;

import java.util.List;
import java.util.Optional;

public interface TasklistService {
    public void create(Tasklist tasklist);
    public List<Tasklist> getAll();
    public void update(int id, Tasklist tasklist);
    public void delete(int id);

    Optional<Tasklist> getById(int id);
}
