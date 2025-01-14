package si.feri.ris.kirbis.todo.services;

import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;
import si.feri.ris.kirbis.todo.entities.Task;
import si.feri.ris.kirbis.todo.entities.Tasklist;

import java.util.List;
import java.util.Optional;

public interface TaskService {
    public void create(Task task);
    public void setDone(int id);
    public void update(int id, Task task);
    public void updateDescription(int id, String description);
    public void delete(int id);
    public String share(int id);
    public ResponseEntity<byte[]> createQRCode(int id);
    public List<Task> getAll();
    public Optional<Task> getById(int id);
    public String fileUpload(int id, MultipartFile file);
}
