# TODO-Express-FS

A simple todo list API built with Express, file system (fs) module, and UUID for generating unique IDs for each todo item. This project demonstrates how to create, read, update, and delete (CRUD) todos while persisting the data in a JSON file.

## Features

- Create, Read, Update, and Delete Todos
- Data persistence using `fs` to write and read from `data.json`
- CORS enabled to allow requests from any origin
- Lightweight API with endpoints for managing todos
- Error handling for non-existent resources

## Endpoints

### Health Check
- **GET** `/health`
  - Returns a simple "Hello World" message.
  
  **Example Response:**
  ```json
  "Hello World."
  ```

### Get All Todos
- **GET** `/todos`
  - Returns a list of all todos.
  
  **Example Response:**
  ```json
  [
    {
      "id": "unique-id-1",
      "content": "Learn Node.js",
      "completed": false
    },
    {
      "id": "unique-id-2",
      "content": "Build a Todo App",
      "completed": true
    }
  ]
  ```

### Add a New Todo
- **POST** `/todos`
  - Creates a new todo with the provided content.
  - Request body should contain the `todo` content.
  
  **Example Request:**
  ```json
  {
    "todo": "Complete the API"
  }
  ```

  **Example Response:**
  ```json
  {
    "id": "unique-id-3",
    "content": "Complete the API",
    "completed": false
  }
  ```

### Update a Todo
- **PUT** `/todos/:id`
  - Updates the todo with the specified ID.
  - Can update both `content` and `completed` status of the todo.
  
  **Example Request:**
  ```json
  {
    "content": "Learn Express.js",
    "completed": true
  }
  ```

  **Example Response:**
  ```json
  {
    "id": "unique-id-1",
    "content": "Learn Express.js",
    "completed": true
  }
  ```

### Delete a Todo
- **DELETE** `/todos/:id`
  - Deletes the todo with the specified ID.
  
  **Example Response:**
  ```json
  {
    "Message": "Successfully deleted todo with ID: unique-id-1"
  }
  ```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/en/) installed on your local machine.
- [npm](https://www.npmjs.com/) package manager.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/DipanshuShukla/TODO-express-fs.git
   ```

2. Navigate to the project directory:
   ```bash
   cd TODO-express-fs
   ```

3. Install the dependencies:
   ```bash
   npm install
   ```

4. Run the development server using nodemon:
   ```bash
   npm run dev
   ```

   The server will start on `http://localhost:3000`.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

Dipanshu Shukla - [https://github.com/DipanshuShukla](https://github.com/DipanshuShukla)
