package si.feri.ris.kirbis.todo.entityTests;

import jakarta.validation.Validation;
import jakarta.validation.Validator;
import jakarta.validation.ValidatorFactory;
import org.junit.jupiter.api.*;
import org.mockito.Mockito;
import si.feri.ris.kirbis.todo.entities.Board;
import si.feri.ris.kirbis.todo.repositories.BoardRepository;

import static org.junit.jupiter.api.Assertions.*;

class BoardTest {

    private Validator validator; // for validating entity constraints
    private BoardRepository mockRepository; // mocked repository to simulate database interactions

    @BeforeEach
    void setUp() {
        // Initialize the Validator and mock the BoardRepository
        ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
        validator = factory.getValidator();
        mockRepository = Mockito.mock(BoardRepository.class);
    }

    @AfterEach
    void verifyMocksAndCleanup() {
        // Verify no unexpected interactions
        Mockito.verifyNoMoreInteractions(mockRepository);

        // Clean up resources after verification
        validator = null;
        mockRepository = null;
    }

    @Test
    @DisplayName("Positive Scenario: Valid Board and Mock Save")
    void testValidBoardAndMockSave() {
        // Create a valid Board instance (Positive Scenario)
        Board board = new Board();
        board.setBoardId(1);
        board.setName("Team Board");
        board.setUserId(5);

        // Validate the board using the validator
        var violations = validator.validate(board);
        assertTrue(violations.isEmpty(), "There should be no validation errors for a valid board");

        // Mock the save operation in the repository
        Mockito.when(mockRepository.save(board)).thenReturn(board);

        // Simulate saving the board
        Board savedBoard = mockRepository.save(board);
        assertEquals(board, savedBoard, "The saved board should match the original board");

        // Verify that the save method was called exactly once
        Mockito.verify(mockRepository, Mockito.times(1)).save(board);
    }

    @Test
    @DisplayName("Negative Scenario: Invalid Board Name with Mock Find")
    void testInvalidBoardNameAndMockFind() {
        // Create an invalid Board instance (Negative Scenario: null name)
        Board board = new Board();
        board.setBoardId(2);
        board.setName(null); // Invalid name
        board.setUserId(3);

        // Validate the board to confirm it fails validation
        var violations = validator.validate(board);
        assertFalse(violations.isEmpty(), "Validation should fail when the name is null");
        assertEquals(1, violations.size(), "There should be exactly one validation error");

        // Mock the findById operation in the repository
        Mockito.when(mockRepository.findById(2)).thenReturn(java.util.Optional.of(board));

        // Simulate finding the board by ID
        var foundBoard = mockRepository.findById(2);
        assertTrue(foundBoard.isPresent(), "The board should be present in the mocked repository");
        assertEquals(board, foundBoard.get(), "The retrieved board should match the mocked board");

        // Verify that the findById method was called exactly once
        Mockito.verify(mockRepository, Mockito.times(1)).findById(2);
    }

    @Test
    @DisplayName("Positive Scenario: Lazy Loaded Tasklists with Mock Interaction")
    void testLazyLoadedTasklistsWithMock() {
        // Board instance with tasklists set to null (Positive Scenario: lazy loading)
        Board board = new Board();
        board.setBoardId(3);
        board.setTasklists(null); // Simulating lazy-loaded association

        // Mock the findById operation in the repository
        Mockito.when(mockRepository.findById(3)).thenReturn(java.util.Optional.of(board));

        // Simulate finding the board by ID
        var retrievedBoard = mockRepository.findById(3).orElse(null);

        // Verify the board was retrieved successfully
        assertNotNull(retrievedBoard, "The board should be retrieved successfully");
        assertNull(retrievedBoard.getTasklists(), "Tasklists should still be null as it's not loaded");

        // Verify that the findById method was called exactly once
        Mockito.verify(mockRepository, Mockito.times(1)).findById(3);
    }
}
