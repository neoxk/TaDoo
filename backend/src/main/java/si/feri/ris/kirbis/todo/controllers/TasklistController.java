package si.feri.ris.kirbis.todo.controllers;


import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import si.feri.ris.kirbis.todo.entities.Tasklist;
import si.feri.ris.kirbis.todo.services.TasklistService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(path= "/api/tasklist")
public class TasklistController {
    private TasklistService service;

    public TasklistController(TasklistService service) {
        this.service = service;
    }

    @PostMapping("")
    public ResponseEntity<String> create(@RequestBody Tasklist tasklist) {
        service.create(tasklist);
        return ResponseEntity.ok("Created");
    }

    @GetMapping("")
    public List<Tasklist> get() {
        return service.getAll();
    }

    @PutMapping("")
    public ResponseEntity<String> update(@PathVariable int id, @RequestBody Tasklist tasklist) {
        service.update(id, tasklist);
        Optional<Tasklist> searched = service.getById(id);
        return ResponseEntity.ok("Updated");
    }

    @DeleteMapping(path = "{id}")
    public ResponseEntity<String> delete(@PathVariable int id) {
        service.delete(id);
        return ResponseEntity.ok("Deleted");
    }
}

