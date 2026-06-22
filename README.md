# AI Travel Planner

AI Travel Planner is a full-stack web application that helps users plan trips more efficiently. Users can create travel plans by entering their destination, trip duration, budget preference, and interests. The application can then generate an AI-based itinerary to help organize the trip.

## Features

* User Registration and Login
* Secure JWT Authentication
* Create and Manage Trips
* View Personal Travel Plans
* Delete Trips
* AI-Generated Travel Itineraries
* Responsive and Modern User Interface

## Tech Stack

### Frontend

* Next.js
* TypeScript
* Tailwind CSS
* Axios

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* bcryptjs

### AI Integration

* Gemini API

## Project Structure

```text
ai-travel-planner
│
├── backend
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── services
│   ├── server.js
│   └── package.json
│
├── frontend
│   ├── src
│   │   ├── app
│   │   ├── utils
│   │   └── components
│   ├── public
│   └── package.json
│
└── README.md
```

## Getting Started

### Clone the Repository

```bash
git clone <repository-url>
cd ai-travel-planner
```

### Backend Setup

Navigate to the backend folder:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file and add:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
GEMINI_API_KEY=your_api_key
```

Start the backend server:

```bash
npm run dev
```

The backend will run on:

```text
http://localhost:5000
```

### Frontend Setup

Open a new terminal and navigate to the frontend folder:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the frontend:

```bash
npm run dev
```

The frontend will run on:

```text
http://localhost:3000
```

## API Endpoints

### Authentication

* POST `/api/auth/register`
* POST `/api/auth/login`
* GET `/api/auth/profile`

### Trips

* POST `/api/trips`
* GET `/api/trips`
* POST `/api/trips/:id/generate`
* DELETE `/api/trips/:id`

## Challenges Faced

During development, I worked on:

* Implementing JWT authentication
* Protecting private routes
* Connecting MongoDB with the backend
* Integrating AI itinerary generation
* Handling API errors and validation
* Building a clean and responsive UI

## Future Improvements

* Edit existing trips
* Hotel recommendations
* Flight recommendations
* Trip sharing
* User profile management
* Deployment to production

## Author

Vikas Akula

Full Stack Developer
