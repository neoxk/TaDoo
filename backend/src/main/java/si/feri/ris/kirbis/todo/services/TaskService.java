package si.feri.ris.kirbis.todo.services;

import si.feri.ris.kirbis.todo.entities.Task;
import si.feri.ris.kirbis.todo.entities.TaskList;

public interface TaskService {
    public void create(Task task);
    public Task[] getAll(TaskList taskList);
    public void setDone(int id);
    public void update(int id, Task task);
    public void delete(int id);
}
