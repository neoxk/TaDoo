package si.feri.ris.kirbis.todo.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import si.feri.ris.kirbis.todo.entities.Board;
import si.feri.ris.kirbis.todo.repositories.BoardRepository;

@Service
public class BoardServiceImpl implements BoardService{
    @Autowired
    private BoardRepository boardRepository;
    @Override
    public void create(Board board) {
    }

    @Override
    public Board[] getAll() {
        return new Board[0];
    }

    @Override
    public void update(int id, Board newBoard) {

    }

    @Override
    public void delete(int id) {

    }
}
