package si.feri.ris.kirbis.todo.repositoryTests;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import si.feri.ris.kirbis.todo.entities.Board;
import si.feri.ris.kirbis.todo.repositories.BoardRepository;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
public class BoardRepositoryTest {

    @Autowired
    private BoardRepository boardRepository;

    private Board board;

    @BeforeEach
    void setUp() {
        board = new Board();
        board.setName("Test Board");
        board.setUserId(2);
        boardRepository.save(board);
    }

    @ParameterizedTest
    @ValueSource(ints = {1, 3})
    void findByUserId_shouldReturnEmptyList_whenUserDoesNotExist(int userId) {
        List<Board> boards = boardRepository.findByUserId(userId);
        assertThat(boards).isEmpty();
    }
}