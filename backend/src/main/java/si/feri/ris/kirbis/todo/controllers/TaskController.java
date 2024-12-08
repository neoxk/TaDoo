package si.feri.ris.kirbis.todo.controllers;

import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import si.feri.ris.kirbis.todo.entities.Task;
import si.feri.ris.kirbis.todo.repositories.TaskRepository;
import si.feri.ris.kirbis.todo.services.TaskService;
import si.feri.ris.kirbis.todo.services.TasklistService;
import si.feri.ris.kirbis.todo.util.SimpleBody;

import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:5174")
@RestController
@RequestMapping(path= "/api/task")
public class TaskController {
    private final TaskService taskService;
    private final TaskRepository taskRepository;
    private TaskService service;
    private TasklistService tasklistService;


    public TaskController(TaskService service, TasklistService tasklistService, TaskService taskService, TaskRepository taskRepository) {
        this.service = service;
        this.tasklistService = tasklistService;
        this.taskService = taskService;
        this.taskRepository = taskRepository;
    }

    @PostMapping("")
    public Task create(@RequestParam int tasklist_id) {
        Task task = new Task();
        task.setName("New Task");
        task.setTasklistId(tasklist_id);

        service.create(task);

        return task;
    }


    @GetMapping("")
    public List<Task> get() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Task> getById(@PathVariable int id) {
        Optional<Task> task = service.getById(id);
        return task.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Task> update(@PathVariable int id, @RequestBody Task task) {
        service.update(id, task);
        return service.getById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping(path = "{id}")
    public Map<String, String> delete(@PathVariable int id) {
        service.delete(id);
        return SimpleBody.success();
    }

    @PatchMapping("/{id}/done")
    public ResponseEntity<String> markAsDone(@PathVariable int id) {
        service.setDone(id);
        return ResponseEntity.ok("Marked as Done");
    }

    @PostMapping("/{id}/file")
    public ResponseEntity<String> uploadFile(@PathVariable("id") int id, @RequestParam("file") MultipartFile file) {
        if (file.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("No file selected.");
        }
        try {
            String fileUrl = taskService.fileUpload(id, file);

            return ResponseEntity.status(HttpStatus.OK)
                    .body("File uploaded successfully. File URL: " + fileUrl);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to upload file.");
        }
    }

    @GetMapping("/{id}/file")
    public ResponseEntity<?> getFile(@PathVariable("id") int id) {
        try {
            Task task = taskRepository.findById(id).orElseThrow(() -> new RuntimeException("Task not found"));

            String filePath = task.getFile_path();
            String appRoot = System.getProperty("user.dir");
            Path absolutePath = Paths.get(appRoot, filePath);

            Resource resource = new FileSystemResource(absolutePath);

            if (resource.exists()) {
                return ResponseEntity.ok()
                        .contentType(MediaType.APPLICATION_OCTET_STREAM)
                        .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + absolutePath.getFileName().toString() + "\"")
                        .body(resource);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("File not found for task ID " + id);
            }

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An error occurred while processing the request.");
        }
    }

    @GetMapping("/{id}/share")
    public ResponseEntity<String> share(@PathVariable int id) {
        return ResponseEntity.ok(service.share(id));
    }

    @GetMapping("/{id}/qr")
    public ResponseEntity<byte[]> createQRCode(@PathVariable int id) {
        return service.createQRCode(id);
    }

//    @GetMapping(value = "/{id}/qr", produces = MediaType.IMAGE_PNG_VALUE)
//    public ResponseEntity<byte[]> createQRCode(@PathVariable int id) {
//        byte[] qrCode = service.createQRCode(id);
//
//        return ResponseEntity.ok()
//                .header("Content-Type", MediaType.IMAGE_PNG_VALUE)
//                .header("Content-Disposition", "inline; filename=\"qr.png\"")
//                .body(qrCode);
//    }
}
