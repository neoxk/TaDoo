# Coding Style Guide  
  
This coding style guide outlines best practices for maintaining clean, readable, and consistent code across the project.  
  
## 1. Naming Conventions  

- **Classes and Interfaces**: Use PascalCase for class and interface names.  
  - Examples: `BoardService`, `TaskCard`  
- **Variables and Functions**: Use camelCase for variable and function names.  
  - Examples: `getTaskList`, `renderSidebar`  
- **Constants**: Use UPPER_SNAKE_CASE for naming constants.  
  - Example: `DEFAULT_TASK_LIMIT`  
- **File Names**:  
  - Use PascalCase for component files (e.g., `TaskCard.tsx`).  
  - Use camelCase for hook files (e.g., `useBoards.ts`).  
  
## 2. File and Folder Structure  
  
### Frontend  
- Group related files within dedicated folders to enhance organization and maintainability.  
  - Example: Place all sidebar-related components in `components/sidebar`.  
  
### Backend  
- Follow a layered structure that separates different concerns:  
   - **Controllers**: Handle HTTP requests and responses.  
   - **Services**: Contain business logic.  
   - **Entities**: Represent database models.  
   - **Repositories**: Manage data access and interaction with the database.  
  
### Organizational Principle  
Ensure a clear and logical folder hierarchy that matches the domain model of the application, making navigation intuitive and development streamlined.  
  
## 3. Commenting Guidelines  
 
- **Inline Comments**:  
  - Only use for explaining complex logic to improve readability.  
  - Avoid comments that restate what the code already conveys.  
  
## 4. Best Practices  
  
### TypeScript Specific  
- Always define types and interfaces for component props and state to maintain type safety and reduce potential bugs.