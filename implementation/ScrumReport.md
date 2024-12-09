
# Scrum Implementation Report

## Project Overview
This document outlines the progress and methodology followed for implementing the assigned user story.

---

## User Story
**As a user, I want to add attachments (e.g., images or documents) to tasks so that all important information is centralized.**

---

## Story Points Explanation
**Story Points (SP)** are used to estimate the relative effort required to complete a task. They account for three key factors:
1. **Complexity:** How challenging is the task?
2. **Uncertainty:** Are there unknowns or risks involved?
3. **Scope:** How much work is required?

Story points do not directly translate to hours but help gauge effort based on team capacity and velocity. For this project, 1 story point represents a task that typically takes about **1-4 hours** to complete.

---

## Tasks Breakdown and Estimates
The user story was broken down into smaller, manageable tasks. Each task was assigned an estimated effort using the Planning Poker method, with story points (SP) as the unit of estimation.

| Task                                         | Details                                                                           | Time Estimate |
|----------------------------------------------|-----------------------------------------------------------------------------------|---------------|
| **Adjust the Data Model (Backend)**          | Add a field for storing paths or references to attachments in the task model.     | 2 SP          |
|                                              | Ensure support for file types like PDF, JPEG, and PNG.                            |               |
| **Implement REST API for Attachments**       | Create endpoints for uploading and retrieving files (download).                   | 3 SP          |
|                                              | Add basic file validation (e.g., type and size).                                  |               |
| **Add File Upload Functionality (Frontend)** | Add a button and modal for uploading files on the existing task page.             | 3 SP          |
|                                              | Implement frontend validation for errors (e.g., oversized files).                 |               |
| **Display Uploaded Attachments (Frontend)**  | Display a button for downloading and deleting attachments.                        | 2 SP          |
| **Connect Frontend and Backend**             | Connect the frontend with the backend to assure the functionality works properly. | 3 SP          |
| **Testing and Quality Assurance**            | Write unit tests for backend validation (e.g., file type and size).               | 2 SP          |
|                                              | Test frontend functionality and ensure a good user experience.                    |               |

---

## Scrum Workflow
### Task Progression
- **ToDo:** Tasks that are planned but not started.
    - Initial task setup and estimation.
- **In Progress:** Tasks currently in progress.
    - Ongoing implementation of backend and frontend functionality.
- **Done:** Completed tasks.
  - Completed tasks with functionality verification.

The board is updated regularly to reflect the current state of tasks.

---

## Implementation Details
### Backend
1. **Data Model Adjustments:**
    - Added file_path and has_file to task

2. **REST API:**
    - Added post endpoint for uploading files
    - Added get endpoint for retrieving files

### Frontend
1. **File Upload Functionality:**
    - Added a button and a details modal to the task for managing file attachments.
    - Implemented an upload button that is displayed when no file is attached to the task.
   
2. **Display Attachments:**
    - Created a download button that appears when a file is attached to the task, enabling users to retrieve the file.

### Connection
1. **Frontend Adjustments:**
    - Integrated event handlers to manage file upload and download operations seamlessly.

### Testing
1. **Backend Tests:**
    - Written Unit tests for validating the file upload and download options.

2. **Frontend Testing:** 
    - Manual tests were conducted to ensure functionality and a seamless user experience.

---

## Progress Summary
### Current Status:
| Task                              | Status |
|-----------------------------------|--------|
| Adjust Data Model (Backend)       | Done   |
| Implement REST API (Backend)      | Done   |
| Add File Upload (Frontend)        | Done   |
| Display Attachments (Frontend)    | Done   |
| Connect Frontend and Backend      | Done   |
| Testing and QA                    | Done   |



## GitHub Repository
- An agile board has been set up in the repository to track task progress:  
  **Columns:** ToDo, In Progress, Done.

---
