package si.feri.ris.kirbis.todo.services;

import si.feri.ris.kirbis.todo.entities.Board;

public interface BoardService {
    public void create(Board board);
    public Board[] getAll();
    public void update(int id, Board newBoard);
    public void delete(int id);

}
