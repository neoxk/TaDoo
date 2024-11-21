package si.feri.ris.kirbis.todo.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import si.feri.ris.kirbis.todo.entities.Board;

public interface BoardRepository extends JpaRepository<Board, Integer> {
}
