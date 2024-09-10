const express = require("express");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const cors = require("cors");

const dataFileName = "data.json";

async function existTodoFile() {
    try {
        await fs.promises.access(dataFileName);
        return true;
    } catch (e) {
        return false;
    }
}

async function readTodoFile() {
    let data = [];
    if (!(await existTodoFile())) {
        console.log("File does not exist. Creating a new one...");
        await writeTodoFile(data); // Initialize file with an empty array
    } else {
        const fileData = await fs.promises.readFile(dataFileName, "utf8");
        data = fileData.trim() ? JSON.parse(fileData) : []; // Handle empty file scenario
    }
    return data;
}

async function writeTodoFile(dataObj) {
    await fs.promises.writeFile(dataFileName, JSON.stringify(dataObj, null, 2));
}

async function getTodos() {
    return await readTodoFile();
}

async function updateTodo(id, updatedTodoText, updatedCompletionStatus) {
    todos = await readTodoFile();
    todoIndex = todos.findIndex((todo) => todo.id === id);
    if (todoIndex !== -1) {
        if (updatedTodoText !== undefined)
            todos[todoIndex].content = updatedTodoText;
        if (updatedCompletionStatus !== undefined)
            todos[todoIndex].completed = updatedCompletionStatus;

        await writeTodoFile(todos);
        return todos[todoIndex];
    } else {
        return [];
    }
}

async function addTodo(todo) {
    var todos = await readTodoFile();
    todos.push({
        id: uuidv4(),
        content: todo,
        completed: false,
    });

    await writeTodoFile(todos);

    return todos[todos.length - 1];
}

async function deleteTodo(id) {
    const todos = await readTodoFile();
    const newTodos = todos.filter((todo) => todo.id !== id);
    await writeTodoFile(newTodos);
    return todos.length === newTodos.length;
}

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

app.get("/health", (req, res) => {
    res.json("Hello World.");
});

app.get("/todos", async (req, res) => {
    res.json(await getTodos());
});

app.post("/todos", async (req, res) => {
    newTodo = await addTodo(req.body.todo);
    res.send(newTodo);
});

app.put("/todos/:id", async (req, res) => {
    const id = req.params.id;
    const updatedTodoText = req.body.content;
    const updatedCompletionStatus = req.body.completed;

    const updatedTodo = await updateTodo(
        id,
        updatedTodoText,
        updatedCompletionStatus
    );

    updatedTodo
        ? res.json(updatedTodo)
        : res.status(404).json({ error: `Todo ID: ${id} Not Found` });
});

app.delete("/todos/:id", (req, res) => {
    const id = req.params.id;
    deleteTodo(id)
        ? res.json({ Message: `Successfully deleted todo with ID: ${id}` })
        : res.status(404).json({ Error: `Not Found Todo with ID: ${id}` });
});

app.listen(port, () => {
    console.log(`App is listening on http://localhost:${port}`);
});
