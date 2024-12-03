package si.feri.ris.kirbis.todo.controllerTests; /**
 * Unit tests for UserController class.
 * Tests cover user creation functionality with both successful and error scenarios.
 */

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import si.feri.ris.kirbis.todo.controllers.UserController;
import si.feri.ris.kirbis.todo.entities.User;
import si.feri.ris.kirbis.todo.services.UserService;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@DisplayName("UserController Tests")
class UserControllerTest {

    @Mock
    private UserService userService;

    private UserController userController;
    private User testUser;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        userController = new UserController(userService);
        
        // Initialize test data
        testUser = new User();
        testUser.setUsername("testUser");
        testUser.setEmail("test@example.com");
    }

    @Nested
    @DisplayName("User Creation Tests")
    class CreateUserTests {
        
        /**
         * Tests successful creation of a new user
         */
        @Test
        @DisplayName("Should create user successfully with valid data")
        void createUser_ValidData_ReturnsCreated() {
            // Arrange
            doNothing().when(userService).create(any(User.class));

            // Act
            ResponseEntity<String> response = userController.create(testUser);

            // Assert
            assertEquals(HttpStatus.OK, response.getStatusCode(), 
                "Response should have 200 OK status");
            assertEquals("Created", response.getBody(), 
                "Response body should contain 'Created' message");
            verify(userService, times(1)).create(testUser);
        }

        /**
         * Tests user creation with service layer exception
         */
        @Test
        @DisplayName("Should handle service exception during user creation")
        void createUser_ServiceException_ThrowsException() {
            // Arrange
            doThrow(new RuntimeException("Database error")).when(userService).create(any(User.class));

            // Act & Assert
            assertThrows(RuntimeException.class, 
                () -> userController.create(testUser),
                "Should throw exception when service layer fails");
            verify(userService, times(1)).create(testUser);
        }

    }
}