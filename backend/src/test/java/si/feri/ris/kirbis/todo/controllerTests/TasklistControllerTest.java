package si.feri.ris.kirbis.todo.controllerTests;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import si.feri.ris.kirbis.todo.controllers.TasklistController;
import si.feri.ris.kirbis.todo.entities.Tasklist;
import si.feri.ris.kirbis.todo.services.TasklistService;

import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@DisplayName("TasklistController Tests")
class TasklistControllerTest {

    @Mock
    private TasklistService tasklistService;

    private TasklistController tasklistController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        tasklistController = new TasklistController(tasklistService);
    }

    @Nested
    @DisplayName("Tasklist Creation Tests")
    class CreateTasklistTests {

        @Test
        @DisplayName("Should create tasklist successfully with valid board ID")
        void createTasklist_ValidBoardId_ReturnsNewTasklist() {
            // Arrange
            int boardId = 1;
            Tasklist expectedTasklist = new Tasklist();
            expectedTasklist.setName("New Tasklist");

            doNothing().when(tasklistService).create(eq(boardId), any(Tasklist.class));

            // Act
            Tasklist result = tasklistController.create(boardId);

            // Assert
            assertNotNull(result, "Created tasklist should not be null");
            assertEquals("New Tasklist", result.getName(), "Tasklist should have default name 'New Tasklist'");
            verify(tasklistService, times(1)).create(eq(boardId), any(Tasklist.class));
        }
    }

    @Nested
    @DisplayName("Tasklist Retrieval Tests")
    class GetTasklistTests {

        @Test
        @DisplayName("Should return all tasklists for a given board ID")
        void getTasklists_ReturnsAllTasklists() {
            // Arrange
            int boardId = 1;
            List<Tasklist> expectedTasklists = Arrays.asList(new Tasklist(), new Tasklist());
            when(tasklistService.getAll(boardId)).thenReturn(expectedTasklists);

            // Act
            List<Tasklist> result = tasklistController.get(boardId);

            // Assert
            assertNotNull(result, "Result should not be null");
            assertEquals(expectedTasklists.size(), result.size(), "Should return correct number of tasklists");
            verify(tasklistService, times(1)).getAll(boardId);
        }

        @Test
        @DisplayName("Should return the percentage of tasks marked as done")
        void percentDone_ValidId_ReturnsPercentage() {
            // Arrange
            int tasklistId = 1;
            int expectedPercentage = 75;
            when(tasklistService.percentDone(tasklistId)).thenReturn(expectedPercentage);

            // Act
            int result = tasklistController.percentDone(tasklistId);

            // Assert
            assertEquals(expectedPercentage, result, "Should return the correct percentage of tasks done");
            verify(tasklistService, times(1)).percentDone(tasklistId);
        }

        @Test
        @DisplayName("Should return the time when all tasks in the tasklist were completed")
        void timeFinished_ValidId_ReturnsCompletionTime() {
            // Arrange
            int tasklistId = 1;
            String expectedTime = "2024-12-17T14:30:00"; // Example time
            when(tasklistService.timeFinished(tasklistId)).thenReturn(expectedTime);

            // Act
            String result = tasklistController.timeFinished(tasklistId);

            // Assert
            assertEquals(expectedTime, result, "Should return the correct completion time");
            verify(tasklistService, times(1)).timeFinished(tasklistId);
        }
    }

    @Nested
    @DisplayName("Tasklist Update Tests")
    class UpdateTasklistTests {

        @Test
        @DisplayName("Should update tasklist successfully with valid ID")
        void updateTasklist_ValidId_ReturnsUpdatedTasklist() {
            // Arrange
            int tasklistId = 1;
            Tasklist updatedTasklist = new Tasklist();
            updatedTasklist.setName("Updated Tasklist");

            when(tasklistService.getById(tasklistId)).thenReturn(Optional.of(updatedTasklist));
            doNothing().when(tasklistService).update(eq(tasklistId), any(Tasklist.class));

            // Act
            ResponseEntity<Tasklist> response = tasklistController.update(tasklistId, updatedTasklist);

            // Assert
            assertEquals(HttpStatus.OK, response.getStatusCode(), "Response should have 200 OK status");
            assertEquals("Updated Tasklist", response.getBody().getName(), "Tasklist should be updated");
            verify(tasklistService, times(1)).update(eq(tasklistId), any(Tasklist.class));
        }
    }

    @Nested
    @DisplayName("Tasklist Deletion Tests")
    class DeleteTasklistTests {

        @Test
        @DisplayName("Should delete tasklist successfully with valid ID")
        void deleteTasklist_ValidId_ReturnsSuccessResponse() {
            // Arrange
            int tasklistId = 1;
            doNothing().when(tasklistService).delete(tasklistId);

            // Act
            Map<String, String> response = tasklistController.delete(tasklistId);

            // Assert
            assertEquals("success", response.get("status"), "Response should indicate success");
            verify(tasklistService, times(1)).delete(tasklistId);
        }
    }
}
