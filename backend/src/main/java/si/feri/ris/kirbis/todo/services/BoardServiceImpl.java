package si.feri.ris.kirbis.todo.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import si.feri.ris.kirbis.todo.entities.Board;
import si.feri.ris.kirbis.todo.entities.BoardTaskList;
import si.feri.ris.kirbis.todo.entities.Task;
import si.feri.ris.kirbis.todo.entities.Tasklist;
import si.feri.ris.kirbis.todo.repositories.BoardRepository;
import si.feri.ris.kirbis.todo.repositories.BoardTaskListRepository;
import si.feri.ris.kirbis.todo.repositories.TaskRepository;
import si.feri.ris.kirbis.todo.repositories.TasklistRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class BoardServiceImpl implements BoardService{

    @Autowired
    private BoardRepository boardRepository;
    @Autowired
    private TasklistRepository tasklistRepository;
    @Autowired
    private TaskRepository taskRepository;
    @Autowired
    private BoardTaskListRepository boardTaskListRepository;

    @Override
    public void create(Board board) {
        System.out.println("Creating board: " + board.getName());
        boardRepository.save(board);
    }

    @Override
    public List<Board> getAll() {
        return boardRepository.findAll();
    }

    @Override
    public Optional<Board> getById(int boardId) {
        Optional<Board> board = boardRepository.findById(boardId);

        board.ifPresent(b -> {
            List<BoardTaskList> boardTaskLists = boardTaskListRepository.findByBoard_BoardId(boardId);

            List<Tasklist> tasklists = new ArrayList<>();
            boardTaskLists.forEach(boardTaskList -> {
                Tasklist tasklist = boardTaskList.getTasklist();
                tasklists.add(tasklist);
            });

            b.setTasklists(tasklists);

            tasklists.forEach(tasklist -> {
                List<Task> tasks = taskRepository.findByTasklistId(tasklist.getTasklistId());
                tasklist.setTasks(tasks);
            });
        });

        return board;
    }


    @Override
    public List<Board> getByUserId(int user_id) {
        return boardRepository.findByUserId(user_id);
    }

    @Override
    public void update(int id, Board newBoard) {
      Optional<Board> oldBoard = boardRepository.findById(id);
      oldBoard.ifPresent(board -> {
          board.setName(newBoard.getName());
          boardRepository.save(board);
      });
    }

    @Override
    public void delete(int id) {
        Optional<Board> board = boardRepository.findById(id);
        board.ifPresent(foundBoard -> boardRepository.delete(foundBoard));
    }
}
