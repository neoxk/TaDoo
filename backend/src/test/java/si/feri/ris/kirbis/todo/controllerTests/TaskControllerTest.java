package si.feri.ris.kirbis.todo.controllerTests;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mock.web.MockMultipartFile;
import si.feri.ris.kirbis.todo.entities.Task;
import si.feri.ris.kirbis.todo.entities.Tag;
import si.feri.ris.kirbis.todo.repositories.TaskRepository;
import si.feri.ris.kirbis.todo.services.TaskService;
import si.feri.ris.kirbis.todo.services.TasklistService;
import si.feri.ris.kirbis.todo.controllers.TaskController;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@DisplayName("TaskController Tests")
class TaskControllerTest {

    @Mock
    private TaskService taskService;

    @Mock
    private TasklistService tasklistService;

    @Mock
    private TaskRepository taskRepository;

    private TaskController taskController;
    private Task testTask;
    private Tag testTag;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        taskController = new TaskController(taskService, tasklistService, taskService, taskRepository);
        
        // Initialize test data
        testTag = new Tag();
        testTag.setTag_id(1);
        
        testTask = new Task();
        testTask.setTask_id(1);
        testTask.setName("Test Task");
        testTask.setDone(false);
        testTask.setTasklistId(1);
        testTask.setTag(testTag);
        testTask.setFile_path("/uploads/test.txt");
    }

    @Nested
    @DisplayName("Task Creation Tests")
    class CreateTaskTests {
        
        /**
         * Tests successful creation of a new task with valid tasklist ID
         */
        @Test
        @DisplayName("Should create task successfully with valid tasklist ID")
        void createTask_ValidTasklistId_ReturnsNewTask() {
            // Arrange
            int tasklistId = 1;
            Task expectedTask = new Task();
            expectedTask.setName("New Task");
            expectedTask.setTasklistId(tasklistId);
            expectedTask.setDone(false);
            
            doNothing().when(taskService).create(any(Task.class));

            // Act
            Task result = taskController.create(tasklistId);

            // Assert
            assertNotNull(result, "Created task should not be null");
            assertEquals("New Task", result.getName(), "Task should have default name 'New Task'");
            assertEquals(tasklistId, result.getTasklistId(), "Task should be associated with correct tasklist");
            assertFalse(result.isDone(), "New task should not be marked as done");
            verify(taskService, times(1)).create(any(Task.class));
        }
    }

    @Nested
    @DisplayName("Task Retrieval Tests")
    class GetTaskTests {
        
        /**
         * Tests successful retrieval of existing task
         */
        @Test
        @DisplayName("Should return task when it exists")
        void getById_ExistingTask_ReturnsTask() {
            // Arrange
            when(taskService.getById(testTask.getTask_id())).thenReturn(Optional.of(testTask));

            // Act
            ResponseEntity<Task> response = taskController.getById(testTask.getTask_id());

            // Assert
            assertTrue(response.getStatusCode().is2xxSuccessful(), 
                "Response should have 200 OK status");
            assertNotNull(response.getBody(), 
                "Response body should not be null");
            assertEquals(testTask.getTask_id(), response.getBody().getTask_id(), 
                "Returned task should have correct ID");
            assertEquals(testTask.getTag(), response.getBody().getTag(),
                "Returned task should have correct tag");
            verify(taskService, times(1)).getById(testTask.getTask_id());
        }

        /**
         * Tests retrieval of non-existent task
         */
        @Test
        @DisplayName("Should return 404 when task doesn't exist")
        void getById_NonExistentTask_ReturnsNotFound() {
            // Arrange
            int nonExistentTaskId = 999;
            when(taskService.getById(nonExistentTaskId)).thenReturn(Optional.empty());

            // Act
            ResponseEntity<Task> response = taskController.getById(nonExistentTaskId);

            // Assert
            assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode(), 
                "Response should have 404 NOT FOUND status");
            assertNull(response.getBody(), 
                "Response body should be null for non-existent task");
            verify(taskService, times(1)).getById(nonExistentTaskId);
        }

        /**
         * Tests successful retrieval of all tasks
         */
        @Test
        @DisplayName("Should return all tasks")
        void getAll_ReturnsAllTasks() {
            // Arrange
            List<Task> expectedTasks = Arrays.asList(testTask);
            when(taskService.getAll()).thenReturn(expectedTasks);

            // Act
            List<Task> result = taskController.get();

            // Assert
            assertNotNull(result, "Result should not be null");
            assertFalse(result.isEmpty(), "Result should not be empty");
            assertEquals(expectedTasks.size(), result.size(), "Should return correct number of tasks");
            assertEquals(expectedTasks.get(0).getTask_id(), result.get(0).getTask_id(), 
                "Should return task with correct ID");
            verify(taskService, times(1)).getAll();
        }
    }

    @Nested
    @DisplayName("Task Update Tests")
    class UpdateTaskTests {
        
        /**
         * Tests successful task update
         */
        @Test
        @DisplayName("Should update task successfully")
        void update_ExistingTask_ReturnsUpdatedTask() {
            // Arrange
            Task updatedTask = new Task();
            updatedTask.setTask_id(testTask.getTask_id());
            updatedTask.setName("Updated Task");
            updatedTask.setDone(true);
            
            doNothing().when(taskService).update(testTask.getTask_id(), updatedTask);
            when(taskService.getById(testTask.getTask_id())).thenReturn(Optional.of(updatedTask));

            // Act
            ResponseEntity<Task> response = taskController.update(testTask.getTask_id(), updatedTask);

            // Assert
            assertTrue(response.getStatusCode().is2xxSuccessful(), 
                "Response should have 200 OK status");
            assertNotNull(response.getBody(), 
                "Response body should not be null");
            assertEquals("Updated Task", response.getBody().getName(), 
                "Task name should be updated");
            assertTrue(response.getBody().isDone(), 
                "Task should be marked as done");
            verify(taskService, times(1)).update(testTask.getTask_id(), updatedTask);
        }
    }

    @Nested
    @DisplayName("File Management Tests")
    class FileManagementTests {

        @Test
        @DisplayName("Should upload file successfully")
        void uploadFile_Success() throws IOException {
            // Arrange
            String fileName = "test.txt";
            String filePath = System.getProperty("user.dir") + "/uploads/" + fileName;
            MockMultipartFile mockFile = new MockMultipartFile(
                    "file", fileName, "text/plain", "File content".getBytes()
            );

            Task mockTask = new Task();
            mockTask.setTask_id(testTask.getTask_id());
            mockTask.setFile_path(null);

            when(taskService.fileUpload(eq(testTask.getTask_id()), any())).thenAnswer(invocation -> {
                Path uploadPath = Paths.get(filePath);
                Files.createDirectories(uploadPath.getParent());
                Files.write(uploadPath, mockFile.getBytes());
                mockTask.setFile_path("/uploads/" + fileName);
                return mockTask.getFile_path();
            });

            ResponseEntity<String> response = taskController.uploadFile(testTask.getTask_id(), mockFile);

            assertEquals(HttpStatus.OK, response.getStatusCode(), "Response should have 200 OK status");
            assertTrue(response.getBody().contains("File uploaded successfully"), "Response body should confirm upload");
            assertTrue(Files.exists(Paths.get(filePath)), "Uploaded file should exist");
            verify(taskService, times(1)).fileUpload(eq(testTask.getTask_id()), any());

            Files.deleteIfExists(Paths.get(filePath));
        }

        @Test
        @DisplayName("Should return 400 when uploading empty file")
        void uploadFile_EmptyFile() {
            MockMultipartFile emptyFile = new MockMultipartFile(
                    "file", "empty.txt", "text/plain", new byte[0]
            );

            ResponseEntity<String> response = taskController.uploadFile(testTask.getTask_id(), emptyFile);

            assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode(), "Response should have 400 Bad Request status");
            assertEquals("No file selected.", response.getBody(), "Response body should indicate no file selected");
        }


    }
}