package si.feri.ris.kirbis.todo.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import si.feri.ris.kirbis.todo.entities.Board;
import si.feri.ris.kirbis.todo.repositories.BoardRepository;

import java.util.List;
import java.util.Optional;

@Service
public class BoardServiceImpl implements BoardService{
    @Autowired
    private BoardRepository repository;
    @Override
    public void create(Board board) {
        System.out.println("Creating board: " + board.getName());
        repository.save(board);
    }

    @Override
    public List<Board> getAll() {
        return repository.findAll();
    }

    @Override
    public void update(long id, Board newBoard) {
      Optional<Board> oldBoard = repository.findById(id);
      oldBoard.ifPresent(board -> {
          board.setName(newBoard.getName());
          repository.save(board);
      });
    }

    @Override
    public void delete(long id) {
        Optional<Board> board = repository.findById(id);
        board.ifPresent(foundBoard -> repository.delete(foundBoard));
    }

    @Override
    public Optional<Board> getById(long id) {
       return repository.findById(id);
    }
}
