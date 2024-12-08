package si.feri.ris.kirbis.todo.services;

import com.google.zxing.BarcodeFormat;
import com.google.zxing.EncodeHintType;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.qrcode.QRCodeWriter;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;
import si.feri.ris.kirbis.todo.entities.Tag;
import si.feri.ris.kirbis.todo.entities.Task;
import si.feri.ris.kirbis.todo.entities.Tasklist;
import si.feri.ris.kirbis.todo.repositories.TaskRepository;
import si.feri.ris.kirbis.todo.repositories.TasklistRepository;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Hashtable;
import java.util.List;
import java.util.Optional;

@Service
public class TaskServiceImpl implements TaskService {

    private final TaskRepository repository;
    private final TasklistRepository tasklistRepository;

    public TaskServiceImpl(TaskRepository repository, TasklistRepository tasklistRepository) {
        this.repository = repository;
        this.tasklistRepository = tasklistRepository;
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

            if (task.getTag() == null) {
                Task existingTask = repository.findById(id).orElseThrow(() -> new RuntimeException("Task not found"));
                task.setTag(existingTask.getTag());
            }

            if (task.getTasklistId() == 0) {
                Task existingTask = repository.findById(id).orElseThrow(() -> new RuntimeException("Task not found"));
                task.setTasklistId(existingTask.getTasklistId());
            }

            if (task.getName() == null) {
                Task existingTask = repository.findById(id).orElseThrow(() -> new RuntimeException("Task not found"));
                task.setName(existingTask.getName());
            }

            repository.save(task);
        } else {
            throw new RuntimeException("Task not found with id: " + id);
        }
    }



    @Override
    public String share(int id) {
        if (repository.existsById(id)) {
            return "http://localhost:8080/api/task/" + id;
        } else {
            return "Task not found";
        }
    }

    @Override
    public ResponseEntity<byte[]> createQRCode(int id) {
        if (repository.existsById(id)) {
            String baseUrl = "http://localhost:8080/api/task/";
            String taskUrl = baseUrl + id;

            try {
                ByteArrayOutputStream qrCodeOutputStream = new ByteArrayOutputStream();
                QRCodeWriter qrCodeWriter = new QRCodeWriter();

                Hashtable<EncodeHintType, Object> hintMap = new Hashtable<>();
                hintMap.put(EncodeHintType.CHARACTER_SET, StandardCharsets.UTF_8.name());
                hintMap.put(EncodeHintType.MARGIN, 1);

                BitMatrix bitMatrix = qrCodeWriter.encode(taskUrl, BarcodeFormat.QR_CODE, 100, 100, hintMap);
                MatrixToImageWriter.writeToStream(bitMatrix, "PNG", qrCodeOutputStream);
                byte[] qrCodeImage = qrCodeOutputStream.toByteArray();

                HttpHeaders headers = new HttpHeaders();
                headers.set("Content-Type", "image/png");
                return new ResponseEntity<>(qrCodeImage, headers, HttpStatus.OK);
            } catch (Exception e) {
                return new ResponseEntity<>(new byte[0], HttpStatus.INTERNAL_SERVER_ERROR);
            }
        } else {
            return new ResponseEntity<>(new byte[0], HttpStatus.NOT_FOUND);
        }
    }

    @Override
    public String fileUpload(int id, MultipartFile file) {
        String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();

        String appRoot = System.getProperty("user.dir");
        Path uploadPath = Paths.get(appRoot, "uploads", fileName);

        try {
            if (!Files.exists(uploadPath.getParent())) {
                Files.createDirectories(uploadPath.getParent());
            }

            file.transferTo(uploadPath.toFile());

            Task task = repository.findById(id).orElseThrow(() -> new RuntimeException("Task not found"));

            String relativeFilePath = "/uploads/" + fileName;
            task.setFile_path(relativeFilePath);
            task.setHas_file(true);

            repository.save(task);

            String fileUrl = "/uploads/" + fileName;
            return fileUrl;

        } catch (IOException e) {
            throw new RuntimeException("Failed to upload file", e);
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
