# Development Environment Setup
This guide outlines how to set up and run the local development environment for the project.

## Prerequisites
Ensure you have the following installed on your system:
- **Node.js** (Latest LTS recommended)
- **npm** (Comes with Node.js)
- **MongoDB** (If not using Docker)
- **Git** (For version control)
- **Docker & Docker Compose** (Optional, for containerized setup)


## Clone the Repository
```sh
git clone git@github.com:tchiappa/CS555.git
```

## Project Structure
```sh
/project-root
│── /backend       # Express.js server
│── /frontend      # React (Vite) client
│── /data          # (Optional) MongoDB data storage
│── docker-compose.yml  # (Optional) Containerized setup
│── README.md      # Documentation
```

## Environment Variables
Create a `.env` file in the `/backend` directory with:
```sh
dbURI="mongodb://localhost:27017/test"
port=4000
baseURL="http:localhost:"
```
Modify values as needed.

## Running with Docker Compose (Optional)
Instead of running each service manually, you can use `docker-compose` to start everything at once.

1. Ensure Docker and Docker Compose are installed.
2. In the project root, run:
   ```sh
   docker-compose up --build
   ```
3. This will start:
    - The backend at `http://localhost:4000`
    - The frontend at `http://localhost:5173`
    - MongoDB at `mongodb://localhost:27017`
4. To stop the containers, run:
    ```sh
    docker-compose down
    ```

## Running the Full Stack (Without Docker)
Start the backend and frontend servers separately:

### Backend Setup (Express.js)
1. Navigate to the `/backend` directory:
   ```sh
   cd backend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the backend server:
   ```sh
   npm run dev
   ```
4. The backend should now be running at `http://localhost:4000`.

### Frontend Setup (Vite + React)
1. Navigate to the `/frontend` directory:
   ```sh
   cd frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the frontend server:
   ```sh
   npm run dev
   ```
4. The frontend should now be available at `http://localhost:5173`.

### Database Setup (MongoDB)
Ensure MongoDB is running locally on `localhost:27017`. If MongoDB is not running:
- Start the service (for Linux/macOS):
  ```sh
  mongod --dbpath ./data
  ```

## Once everything is running (Docker and Direct):
- **Backend API:** `http://localhost:4000`
- **Frontend UI:** `http://localhost:5173`
- **Database:** `mongodb://localhost:27017`