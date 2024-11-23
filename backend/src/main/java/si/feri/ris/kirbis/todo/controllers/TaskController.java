package si.feri.ris.kirbis.todo.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import si.feri.ris.kirbis.todo.entities.Task;
import si.feri.ris.kirbis.todo.services.TaskService;
import si.feri.ris.kirbis.todo.services.TasklistService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(path= "/api/task")
public class TaskController {
    private TaskService service;
    private TasklistService tasklistService;


    public TaskController(TaskService service, TasklistService tasklistService) {
        this.service = service;
        this.tasklistService = tasklistService;
    }

    @PostMapping("")
    public ResponseEntity<String> create(@RequestBody Task task) {
        if (tasklistService.getById(task.getTasklistId()).isEmpty()) {
            return ResponseEntity.badRequest().body("Tasklist not found");
        }
        service.create(task);
        return ResponseEntity.ok("Created");
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
    public ResponseEntity<String> update(@PathVariable int id, @RequestBody Task task) {
        service.update(id, task);
        Optional<Task> searched = service.getById(id); // assuming getById is implemented in TaskService
        return ResponseEntity.ok("Updated");
    }

    @DeleteMapping(path = "{id}")
    public ResponseEntity<String> delete(@PathVariable int id) {
        service.delete(id);
        return ResponseEntity.ok("Deleted");
    }

    @PatchMapping("/{id}/done")
    public ResponseEntity<String> markAsDone(@PathVariable int id) {
        service.setDone(id);
        return ResponseEntity.ok("Marked as Done");
    }

    @GetMapping("/{id}/share")
    public ResponseEntity<String> share(@PathVariable int id) {
        return ResponseEntity.ok(service.share(id));
    }
}
