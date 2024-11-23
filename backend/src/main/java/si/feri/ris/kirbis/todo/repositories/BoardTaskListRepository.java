package si.feri.ris.kirbis.todo.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import si.feri.ris.kirbis.todo.entities.BoardTaskList;

import java.util.List;

public interface BoardTaskListRepository extends JpaRepository<BoardTaskList, Integer> {
    List<BoardTaskList> findByBoard_BoardId(int boardId);
}

