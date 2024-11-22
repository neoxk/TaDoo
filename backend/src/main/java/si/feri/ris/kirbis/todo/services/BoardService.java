package si.feri.ris.kirbis.todo.services;

import si.feri.ris.kirbis.todo.entities.Board;

import java.util.List;
import java.util.Optional;

public interface BoardService {
    public void create(Board board);
    public List<Board> getAll();
    List<Board> getByUserId(int user_id);
    public void update(int id, Board newBoard);
    public void delete(int id);
    public Optional<Board> getById(int id);

}
