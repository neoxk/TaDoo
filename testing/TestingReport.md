# Testing Report

## Test Descriptions

### BoardControllerTest
- **Description**:
  - These tests verify the proper functioning of the controller for the `Board` entity. The main functionalities tested include:
    1. **Fetching an entity by ID**: Tests whether the method returns the correct response (200 OK) and the correct entity when it exists.
    2. **Handling a non-existent entity**: Verifies that the method correctly returns a 404 NOT FOUND status when the entity does not exist.
    3. **Deleting an entity**: Tests successful and unsuccessful deletion scenarios, including handling exceptions.
  - These tests are important because they ensure the application handles client requests correctly and appropriately responds to different scenarios.

- **Analysis**:
  - All tests for `BoardControllerTest` passed without any errors. The implementation was robust, and no issues were found during testing.

- **Author**:
  - Ena Imamović

---

### TaskControllerTest
- **Description**:
  - These tests verify the functionality of the `TaskController`, focusing on CRUD operations for `Task` entities:
    1. **Task creation**: Tests whether a new task can be successfully created with valid tasklist IDs.
    2. **Fetching tasks**: Tests retrieving tasks by ID and ensuring correct status codes (200 OK for existing tasks, 404 NOT FOUND for non-existent ones).
    3. **Updating tasks**: Tests updating an existing task's attributes, such as marking it as done.
    4. **Fetching all tasks**: Tests retrieving all tasks and verifying the correct number is returned.

- **Analysis**:
  - All tests for `TaskControllerTest` passed successfully without any errors. The implementation of task-related endpoints was verified to be functional and robust.

- **Author**:
  - Neo Xander Kirbiš
  - 
---

### UserControllerTest
- **Description**:
  - These tests validate the `UserController` functionalities:
    1. **User creation**: Tests the successful creation of a user with valid data.
    2. **Handling service exceptions**: Verifies that the controller handles exceptions gracefully, such as when a database error occurs.

- **Analysis**:
  - All tests passed successfully, and no issues were identified. The controller correctly handles both success and failure scenarios for user creation.

- **Author**:
  - Neo Xander Kirbiš

---

### BoardRepositoryTest
- **Description**:
  - These tests validate the behavior of the `BoardRepository`:
    1. **Saving boards**: Ensures that a `Board` is successfully saved to the database.
    2. **Finding boards by user ID**: Tests whether the repository returns an empty list when there are no boards associated with a given user ID.

- **Analysis**:
  - All tests passed without errors. The repository methods were verified to function as expected.

- **Author**:
  - Gal Petelin

---

### TasklistRepositoryTest
- **Description**:
  - These tests validate the `TasklistRepository` functionalities:
    1. **Saving task lists**: Ensures that a `Tasklist` is successfully saved to the database.
    2. **Deleting task lists by ID**: Verifies that a task list is properly removed from the database when deleted.

- **Analysis**:
  - All tests passed without issues. The repository methods for saving and deleting task lists worked as intended.

- **Author**:
  - Gal Petelin

---

### BoardTest
- **Description**:
  - These tests verify the behavior of the `Board` entity, focusing on validation and interactions with a mocked repository:
    1. **Validating a correct `Board` instance**: Ensures that a valid `Board` object passes all validation rules.
    2. **Validating an invalid `Board` instance**: Checks that an invalid `Board` (e.g., `name` is `null`) fails validation and triggers appropriate errors.
    3. **Simulating lazy loading**: Tests the handling of lazy-loaded associations by mocking repository interactions.

  - These tests are critical to ensure the integrity of the `Board` entity, particularly in scenarios with invalid data or database interactions.

- **Analysis**:
  - During testing, issues were encountered with the validation and mock interactions:
    1. Validation for a `null` `name` field did not fail as expected. This was resolved by adding the `@NotNull` annotation to the `name` field in the `Board` entity.
    2. A `Mockito NullInsteadOfMockException` occurred because of improper resource cleanup. The `@AfterEach` method was adjusted to verify interactions before nullifying resources.
  - After addressing these issues, all tests for `BoardTest` passed successfully.

- **Author**:
  - Ena Imamović