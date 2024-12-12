package si.feri.ris.kirbis.todo.controllers;


import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import si.feri.ris.kirbis.todo.entities.Tasklist;
import si.feri.ris.kirbis.todo.services.TasklistService;
import si.feri.ris.kirbis.todo.util.SimpleBody;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:5174")
@RestController
@RequestMapping(path= "/api/tasklist")
public class TasklistController {
    private TasklistService service;

    public TasklistController(TasklistService service) {
        this.service = service;
    }

    @PostMapping("")
    public Tasklist create(@RequestParam int boardId) {
        Tasklist tasklist = new Tasklist();
        tasklist.setName("New Tasklist");

        service.create(boardId, tasklist);
        return tasklist;
    }

    @GetMapping("")
    public List<Tasklist> get(@RequestParam int board_id) {
        return service.getAll(board_id);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Tasklist> update(@PathVariable int id, @RequestBody Tasklist tasklist) {
        service.update(id, tasklist);
        return service.getById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping(path = "{id}")
    public Map<String,String> delete(@PathVariable int id) {
        service.delete(id);
        return SimpleBody.success();
    }

    @GetMapping("/{id}/done")
    public int percentDone(@PathVariable int id) {
        return service.percentDone(id);
    }

    @GetMapping("/{id}/time")
    public String timeFinished(@PathVariable int id) {
        return service.timeFinished(id).toString();
    }
}

