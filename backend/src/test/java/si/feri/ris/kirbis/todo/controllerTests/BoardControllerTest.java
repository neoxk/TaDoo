package si.feri.ris.kirbis.todo.controllerTests;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;
import org.mockito.Mockito;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.ResponseEntity;
import si.feri.ris.kirbis.todo.controllers.BoardController;
import si.feri.ris.kirbis.todo.entities.Board;
import si.feri.ris.kirbis.todo.services.BoardService;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;

@SpringBootTest
class BoardControllerTest {

    private BoardController boardController; // controller that is being tested
    private BoardService boardService; // mocked service for testing purposes

    @BeforeEach
    void initialize() {
        boardService = Mockito.mock(BoardService.class);
        boardController = new BoardController(boardService, null, null);
    }

    @ParameterizedTest
    @ValueSource(ints = {1, 2})
    void testGetBoardById_Success(int boardId) {
        // positive scenario : board exists
        Board mockBoard = new Board();
        mockBoard.setBoardId(boardId);
        mockBoard.setName("Board " + boardId);

        // mock the service (for returning the board)
        Mockito.when(boardService.getById(boardId)).thenReturn(Optional.of(mockBoard));

        // calling the update function
        ResponseEntity<Board> response = boardController.update(boardId, mockBoard);

        // verify the response
        assertEquals(200, response.getStatusCodeValue()); // 200 OK
        assertEquals(boardId, response.getBody().getBoardId());
        assertEquals("Board " + boardId, response.getBody().getName());
    }

    @ParameterizedTest
    @ValueSource(ints = {3, 4})
    void testGetBoardById_NotFound(int boardId) {
        // negative scenario : board does not exist
        Mockito.when(boardService.getById(boardId)).thenReturn(Optional.empty());

        // calling the update function
        ResponseEntity<Board> response = boardController.update(boardId, new Board());

        // verify the response
        assertEquals(404, response.getStatusCodeValue()); // 404 NOT FOUND
        assertNull(response.getBody());
    }

    @ParameterizedTest
    @ValueSource(ints = {5, 6})
    void testDeleteBoard_Success(int boardId) {
        // positive scenario : deletion is successful
        Mockito.doNothing().when(boardService).delete(boardId);

        // calling the delete method
        boardController.delete(boardId);

        // verify the calling of the method delete
        Mockito.verify(boardService, Mockito.times(1)).delete(boardId);
    }

    @ParameterizedTest
    @ValueSource(ints = {7, 8})
    void testDeleteBoard_Failure(int boardId) {
        // negative scenario : deletion is not successful
        Mockito.doThrow(new RuntimeException("Deletion failed")).when(boardService).delete(boardId);

        try {
            // calling the delete method
            boardController.delete(boardId);
        } catch (RuntimeException e) {
            // verify the exception message
            assertEquals("Deletion failed", e.getMessage());
        }

        // verify the calling of the method delete
        Mockito.verify(boardService, Mockito.times(1)).delete(boardId);
    }
}
