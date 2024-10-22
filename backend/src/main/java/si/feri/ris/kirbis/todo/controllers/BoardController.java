package si.feri.ris.kirbis.todo.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import si.feri.ris.kirbis.todo.entities.Board;
import si.feri.ris.kirbis.todo.services.BoardService;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:5174")
@RestController
public class BoardController {
    private BoardService service;

    public BoardController(BoardService service) {
        this.service = service;
    }

    @PostMapping(path="/board")
    public ResponseEntity<String> create(@RequestBody Board board) {
        service.create(board);
        return ResponseEntity.ok("Created");
    }

    @GetMapping(path="/board")
    public List<Board> get() {
        System.out.println(service.getAll());
        return service.getAll();
    }

    @PutMapping(path="/board/{id}")
    public ResponseEntity<String> update(@PathVariable long id, @RequestBody Board board) {
        service.update(id, board);
        Optional<Board> searched = service.getById(id);
        return ResponseEntity.ok("Updated");
    }

    @DeleteMapping(path = "/board/{id}")
    public ResponseEntity<String> delete(@PathVariable long id) {
        service.delete(id);
        return ResponseEntity.ok("deleted");
    }

}
