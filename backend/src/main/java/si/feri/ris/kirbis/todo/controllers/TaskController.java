package si.feri.ris.kirbis.todo.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import si.feri.ris.kirbis.todo.entities.Task;
import si.feri.ris.kirbis.todo.services.TaskService;
import si.feri.ris.kirbis.todo.services.TasklistService;
import si.feri.ris.kirbis.todo.util.SimpleBody;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:5174")
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

    @GetMapping("/{id}/share")
    public ResponseEntity<String> share(@PathVariable int id) {
        return ResponseEntity.ok(service.share(id));
    }
}
