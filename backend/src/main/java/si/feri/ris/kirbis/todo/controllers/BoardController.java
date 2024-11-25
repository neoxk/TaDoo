package si.feri.ris.kirbis.todo.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import si.feri.ris.kirbis.todo.entities.Board;
import si.feri.ris.kirbis.todo.entities.Tasklist;
import si.feri.ris.kirbis.todo.services.BoardService;
import si.feri.ris.kirbis.todo.services.TaskService;
import si.feri.ris.kirbis.todo.services.TasklistService;
import si.feri.ris.kirbis.todo.util.SimpleBody;

import java.util.*;

@CrossOrigin(origins = "http://localhost:5174")
@RestController
@RequestMapping(path= "/api/board")
public class BoardController {
    private final BoardService boardService;
    private final TasklistService tasklistService;
    private final TaskService taskService;

    public BoardController(BoardService boardService, TasklistService tasklistService, TaskService taskService) {
        this.boardService = boardService;
        this.tasklistService = tasklistService;
        this.taskService = taskService;
    }

    @PostMapping(path="")
    public Board create() {
        Board board = new Board();
        board.setName("New Board");
        boardService.create(board);
        return board;
    }

    @GetMapping(path="")
    public List<Board> get(@RequestParam(defaultValue = "1") int user_id) {
        return boardService.getByUserId(user_id);
    }

    @GetMapping(path="/{boardId}/tasklists")
    public List<Tasklist> getTasklists(@PathVariable int boardId) {
        Optional<Board> board = boardService.getById(boardId);
        return board.map(Board::getTasklists).orElse(new ArrayList<>());
    }


    /*
    @GetMapping("/user/{user_id}")
    public List<Board> getByUserId(@PathVariable int user_id) {
        return service.getByUserId(user_id);
    }
    */

    @PutMapping(path="/{id}")
    public ResponseEntity<Board> update(@PathVariable int id, @RequestBody Board board) {
        boardService.update(id, board);
        return boardService.getById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping(path = "/{id}")
    public Map delete(@PathVariable int id) {
        boardService.delete(id);
        return SimpleBody.success();
    }

}
