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

import java.time.Duration;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

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
        Board board = boardRepository.findById(boardId)
                .orElseThrow(() -> new IllegalArgumentException("Board not found: " + boardId));

        tasklist = repository.save(tasklist);

        BoardTaskList boardTaskList = new BoardTaskList();
        boardTaskList.setBoard(board);
        boardTaskList.setTasklist(tasklist);

        boardTaskListRepository.save(boardTaskList);
    }

    @Override
    public List<Tasklist> getAll(int boardId) {
        Board board = boardRepository.findById(boardId)
                .orElseThrow(() -> new IllegalArgumentException("Board not found: " + boardId));

        System.out.println(board);

        List<BoardTaskList> boardTaskLists = boardTaskListRepository.findByBoard_BoardId(boardId);
        List<Tasklist> tasklists = boardTaskLists.stream()
                .map(BoardTaskList::getTasklist)
                .collect(Collectors.toList());

        System.out.println(tasklists);

        tasklists.forEach(tasklist -> {
            List<Task> tasks = taskRepository.findByTasklistId(tasklist.getTasklistId());
            tasklist.setTasks(tasks);
        });
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
    public int percentDone(int id) {
        List<Task> tasks = taskRepository.findByTasklistIdAndDone(id, true);
        if (tasks.isEmpty()) {
            return 0;
        }

        return (int) ((double) tasks.size() / taskRepository.findByTasklistId(id).size() * 100);
    }

    @Override
    public String timeFinished(int id) {
        List<Task> tasks = taskRepository.findByTasklistId(id);
        if (tasks.isEmpty()) {
            return "0 hours 0 minutes";
        }

        long totalTime = 0;
        int count = 0;

        for (Task task : tasks) {
            if (task.getCreated() != null && task.getFinished() != null) {
                Duration duration = Duration.between(task.getCreated().toLocalDateTime(), task.getFinished().toLocalDateTime());
                totalTime += duration.toMillis();
                count++;
                System.out.println(duration.toMillis());
            }
        }

        if (count == 0) {
            return "0 hours 0 minutes";
        }

        long averageTime = totalTime / count;

        long hours = averageTime / 3600000;
        long minutes = (averageTime % 3600000) / 60000;

        return hours + " hours " + minutes + " minutes";
    }



    @Override
    public Optional<Tasklist> getById(int id) {
        return repository.findById(id);
    }
}

