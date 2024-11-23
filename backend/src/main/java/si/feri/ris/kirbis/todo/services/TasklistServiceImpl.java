package si.feri.ris.kirbis.todo.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import si.feri.ris.kirbis.todo.entities.Board;
import si.feri.ris.kirbis.todo.entities.BoardTaskList;
import si.feri.ris.kirbis.todo.entities.Tasklist;
import si.feri.ris.kirbis.todo.repositories.BoardRepository;
import si.feri.ris.kirbis.todo.repositories.BoardTaskListRepository;
import si.feri.ris.kirbis.todo.repositories.TaskRepository;
import si.feri.ris.kirbis.todo.repositories.TasklistRepository;

import java.util.List;
import java.util.Optional;

@Service
public class TasklistServiceImpl implements TasklistService {

    @Autowired
    private TasklistRepository repository;

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private BoardRepository boardRepository;

    @Autowired
    private BoardTaskListRepository boardTaskListRepository;

    @Override
    public void create(int boardId, Tasklist tasklist) {
        // Find the board by boardId
        Board board = boardRepository.findById(boardId)
                .orElseThrow(() -> new IllegalArgumentException("Board not found: " + boardId));

        // Save the tasklist first (this inserts into the task_list table)
        tasklist = repository.save(tasklist);  // Save tasklist and get the generated tasklist_id

        // Create the BoardTaskList entry to link Tasklist and Board
        BoardTaskList boardTaskList = new BoardTaskList();
        boardTaskList.setBoard(board);  // Set the board entity
        boardTaskList.setTasklist(tasklist);  // Set the tasklist entity

        // Save the BoardTaskList entry (this inserts into the board_task_list table)
        boardTaskListRepository.save(boardTaskList);
    }


    @Override
    public List<Tasklist> getAll(int boardId) {
        List<Tasklist> tasklists = repository.findByBoard_BoardId(boardId);
        tasklists.forEach(tasklist -> tasklist.setTasks(taskRepository.findByTasklistId(tasklist.getTasklistId())));
        return tasklists;
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

