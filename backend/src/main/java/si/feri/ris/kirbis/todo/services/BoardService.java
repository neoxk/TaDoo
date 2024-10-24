package si.feri.ris.kirbis.todo.services;

import si.feri.ris.kirbis.todo.entities.Board;

import java.util.List;
import java.util.Optional;

public interface BoardService {
    public void create(Board board);
    public List<Board> getAll();
    public void update(long id, Board newBoard);
    public void delete(long id);
    public Optional<Board> getById(long id);

}
