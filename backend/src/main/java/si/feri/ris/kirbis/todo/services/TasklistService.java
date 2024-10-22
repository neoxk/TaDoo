package si.feri.ris.kirbis.todo.services;

import si.feri.ris.kirbis.todo.entities.Task;
import si.feri.ris.kirbis.todo.entities.Tasklist;

import java.util.List;
import java.util.Optional;

public interface TasklistService {
    public void create(Tasklist tasklist);
    public List<Tasklist> getAll();
    public void update(long id, Tasklist tasklist);
    public void delete(long id);

    Optional<Tasklist> getById(long id);
}
