# Event Management System

Alows users to manage events. Users can register and log in, create and manage events, and view them in a responsive interface.

## Features

- **User Authentication**

  - Registration and login system
  - Protected routes for authenticated users
  - Persistent sessions using localStorage

- **Event Management**

  - Display a list of all events in a responsive grid layout
  - Create new events with detailed information
  - Edit and delete your own events
  - View detailed information about any event

- **Responsive Design**
  - Fully responsive interface that adapts to any screen size
  - Mobile-friendly navigation with hamburger menu
  - Optimized layouts for both desktop and mobile devices

## Tech Stack

- React 18 (with Vite for fast development)
- React Router v6 for navigation and routing
- Styled Components for component-based styling
- JSON Server for mock REST API
- Axios for API requests and data fetching

## Detailed Setup Guide

### Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Node.js** (v14.0.0 or later)
- **npm** (v6.0.0 or later, comes with Node.js)

### Installation

Follow these steps to set up the project on your local machine:

1. **Clone the repository** (or download and extract the ZIP file)

```bash
git clone https://github.com/Deepanshu-Raghuwanshi/Event-Management1.git
cd Event-Management1
```

2. **Install dependencies**

```bash
npm install
```

This will install all the required dependencies listed in the `package.json` file, including React, React Router, Styled Components, Axios, JSON Server, and Vite.

### Running the Application

The application requires two servers to run simultaneously:

1. **Start the JSON Server (mock backend)**

Open a terminal window and run:

```bash
npm run server
```

This will start JSON Server on port 3001, serving the mock API from the `db.json` file.

2. **Start the React development server**

Open a new terminal window (keep the JSON Server running) and run:

```bash
npm run dev
```

This will start the Vite development server, typically on port 5173.

3. **Access the application**

Open your browser and navigate to:

```
http://localhost:5173
```

### Default User Credentials

For testing purposes, the application comes with a pre-configured user:

- **Email**: user1@example.com
- **Password**: password123

You can use these credentials to log in, or register a new account.

## Usage Guide

1. **Register a new account or log in with an existing account**

   - Use the navigation bar to access the Register or Login pages
   - For quick testing, use the default credentials above

2. **Browse events on the events page**

   - Click on "Events" in the navigation bar
   - View all events in a responsive grid layout

3. **View event details**

   - Click on an event card or the "View Details" button
   - See comprehensive information about the event

4. **Create a new event (requires authentication)**

   - Click "Create Event" in the navigation bar or on the Events page
   - Fill in the event details (title, description, date, time, location)
   - Click "Create Event" to save

5. **Edit or delete your own events (requires authentication)**
   - Navigate to the event details page for an event you created
   - Use the "Edit" button to modify event details
   - Use the "Delete" button to remove the event

## API Endpoints

The JSON Server provides a RESTful API with the following endpoints:

### User Endpoints

- `GET /users` - Get all users
- `GET /users/:id` - Get user by ID
- `GET /users?email=:email` - Get user by email
- `POST /users` - Register a new user

### Event Endpoints

- `GET /events` - Get all events
- `GET /events/:id` - Get a specific event
- `GET /events?userId=:userId` - Get events by user ID
- `POST /events` - Create a new event
- `PUT /events/:id` - Update an event
- `DELETE /events/:id` - Delete an event

## Troubleshooting

### Common Issues and Solutions

1. **JSON Server not starting**

   - Ensure port 3001 is not in use by another application
   - Check if you have the correct permissions to run the server

2. **React app not starting**

   - Ensure port 5173 is not in use by another application
   - Check for any error messages in the terminal

3. **Authentication issues**

   - Clear your browser's localStorage: `localStorage.clear()` in the browser console
   - Ensure the JSON Server is running

4. **Edit/Delete buttons not showing**
   - Ensure you're logged in
   - Verify that you're the creator of the event
