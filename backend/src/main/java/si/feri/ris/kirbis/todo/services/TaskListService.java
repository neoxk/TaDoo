package si.feri.ris.kirbis.todo.services;

import si.feri.ris.kirbis.todo.entities.Task;

public interface TaskListService {
    public void create(Task task);
    public Task[] getAll();
    public Task update(int id, Task task);
    public void delete(int id);
}
