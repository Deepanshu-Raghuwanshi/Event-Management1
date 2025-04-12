# Event Booking API Server

This is a standalone JSON Server that provides API endpoints for the Event Booking application.

## Setup

1. Install dependencies:

```
npm install
```

2. Start the server:

```
npm start
```

The server will run on http://localhost:3001 by default.

## Available Endpoints

- GET `/events` - Get all events
- GET `/events/:id` - Get event by ID
- GET `/events?userId=:userId` - Get events by user ID
- POST `/events` - Create a new event
- PUT `/events/:id` - Update an event
- DELETE `/events/:id` - Delete an event
- GET `/users` - Get all users
- GET `/users/:id` - Get user by ID
- POST `/users` - Create a new user
- PUT `/users/:id` - Update a user
- DELETE `/users/:id` - Delete a user

## Modifying Data

The data is stored in `db.json`. You can modify this file directly to add or change data.

## Environment Variables

- `PORT` - Set a custom port (default: 3001)
