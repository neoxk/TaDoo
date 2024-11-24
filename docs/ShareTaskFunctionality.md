
# Share Tasks Feature

## Overview

A **Task Sharing** feature is introduced to the TaDoo application! Users can now generate unique links and QR codes for their tasks, enabling them to share tasks effortlessly with team members or friends.


## Features

### New Functionalities:
1. **Generate Task Links:**  
   - Each task now comes with a shareable URL, which can be copied and sent to others for easy access.  

2. **Generate QR Codes:**  
   - Users can create QR codes for their tasks, making it even easier to share tasks via mobile devices.


## How It Works

### 1. Accessing the Task Sharing Modal:
- Each task card now includes a **Share** button (indicated by a `send` icon).  
- Clicking this button opens a modal window titled **Share Task**, where users can view the shareable URL and generate QR codes.

### 2. Modal Features:
#### Header:
- Displays the name of the task and a close button (✕).  

#### Body:
- **Shareable URL:** The modal shows a pre-generated URL for the task.  
- **Generate QR Code Button:** Clicking the `Generate QR Code` button generates a QR code for the task. The QR code will be displayed in the modal for easy scanning.

#### Footer:
- Includes a **Close** button to dismiss the modal.


## How to Test the Functionality

### Prerequisites:
1. Ensure the TaDoo application is running on your local or production server. 

### Steps to Test:
1. **Open the Application:**
   - Navigate to your TaDoo dashboard.

2. **Share a Task:**
   - Select a board.
   - Select a task from the task list.
   - Click the **Share** button (indicated by the `send` icon) on the task card.

3. **Generate a QR Code:**
   - In the **Share Task** modal, click the **Generate QR Code** button.
   - A QR code will appear below the URL field. Scan the QR code using your mobile device to verify the shared link.

4. **Close the Modal:**
   - Use the **Close** button or the ✕ icon in the header to dismiss the modal.
