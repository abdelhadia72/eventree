# Eventree - Event Management Application

**Eventree** is a web-based event management application built using the MERN stack (MongoDB, Express.js, React.js, Node.js). The platform is designed to simplify the process of creating, discovering, and managing events. With Eventree, users can enjoy a seamless experience that includes:

- **User Authentication**: Secure sign-up and login functionality.
- **Event Creation**: Effortlessly create and manage events.
- **Ticket Booking**: Simplified ticket booking process for attendees.
- **QR Code Generation**: Generate QR codes for event tickets.

## Features

1. **User Authentication**:
    
    - Secure registration and login.
    - Password encryption and authentication using JWT (JSON Web Tokens).
2. **Event Creation**:
    
    - Create events with details such as title, description, date, time, and location.
    - Upload event images.
    - Manage and edit existing events.
3. **Ticket Booking**:
    
    - Book tickets for events with ease.
4. **QR Code Generation**:
    
    - Generate QR codes for each booked ticket.
    - Use QR codes for event check-in.

## Screenshots

### Event Creation Page

![Event Creation](https://i.ibb.co/BwG1W1S/Screenshot-from-2024-07-04-08-16-31.png)

### Event List Page

![Event List](https://i.ibb.co/z4bYYQJ/Screenshot-from-2024-07-04-08-17-48.png)

## Technology Stack

- **Frontend**: React.js, useContext, useReducer
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Other Tools**: qrcode library for QR code generation, email integration

## Getting Started

### Prerequisites

- Node.js
- MongoDB

### Installation

1. Clone the repository:
    
    
    `git clone https://github.com/abdelhadia72/eventree.git`
    
2. Navigate to the project directory:
    
    
    `cd eventree`
    
3. Install dependencies for the backend:
    
    
    `cd backend npm install`
    
4. Install dependencies for the frontend:
    

    `cd ../frontend npm install`
    

### Running the Application

1. Start the backend server:
    
    
    `cd backend npm run dev`
    
2. Start the frontend server:
    

    `cd ../frontend npm run dev`
    
3. Open your browser and navigate to `http://localhost:3000` to view the application.
    

Thank you for checking out **Eventree**! We hope this platform helps you manage your events more efficiently. If you have any questions or feedback, feel free to reach out.
