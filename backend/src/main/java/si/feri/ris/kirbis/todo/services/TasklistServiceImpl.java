package si.feri.ris.kirbis.todo.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import si.feri.ris.kirbis.todo.entities.Tasklist;
import si.feri.ris.kirbis.todo.repositories.TasklistRepository;

import java.util.List;
import java.util.Optional;

@Service
public class TasklistServiceImpl implements TasklistService {
    @Autowired
    private TasklistRepository repository;

    @Override
    public void create(Tasklist tasklist) {
        repository.save(tasklist);
    }

    @Override
    public List<Tasklist> getAll() {
        return repository.findAll();
    }

    @Override
    public void update(int id, Tasklist tasklist) {
        Optional<Tasklist> searched = repository.findById(id);
        searched.ifPresent(tasklist_old -> {
            tasklist_old.setName(tasklist.getName());
            repository.save(tasklist_old);
        });
    }

    @Override
    public void delete(int id) {
        Optional<Tasklist> searched = repository.findById(id);
        searched.ifPresent(tasklist -> repository.delete(tasklist));
    }

    @Override
    public Optional<Tasklist> getById(int id) {
        return repository.findById(id);
    }
}
