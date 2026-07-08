import { todos } from "../data/todos.js";
import pool from "../db/pool.db.js";

export const getTodoById = async (id) => {
    //const todo = todos.find((todo) => todo.id === id);
    //return todo ? todo : null;
    const [rows] = await pool.execute("SELECT * FROM todos WHERE id = ?", [id]);
    if(rows.length === 0){
        return null;
    }
    const todo = rows[0];
    todo.completed = Boolean(todo.completed); //Convertimos el valor de completed en booleano
    return todo;
}

export const getTodos = async () => {
    const [rows] = await pool.execute("SELECT * FROM todos");
    return rows.map((todo) => ({
        ...todo,
        completed: Boolean(todo.completed),
    }));
}

export const createTodo = async (title) => {
    // const newTodo = {
    //     id: todos.length + 1,
    //     title: title,
    //     completed: false,
    // }
    // todos.push(newTodo);
    // return newTodo
    const [result] = await pool.execute("INSERT INTO todos (title) VALUES (?)", [title,]);
    if(result.affectedRows === 0){
        return null;
    }
    return {
        id: result.insertId,
        title,
        completed: false,
        created_at: new Date(),
    };
};

export const updateTodo = async (id, title, completed) => {
    //const todo = getTodoById(id);
    // Si no se encuentra la tarea devolvemos null
    //if (!todo) return null;
    // Actualizamo el título de la tarea
    //const found = todos.findIndex((currentTodo)=> currentTodo.id === todo.id);
    //todos[found].title = title;
    //todos[found].completed = completed ?? todos[found].completed;
    // if(completed !== undefined){
    //     todos[found].completed = completed;
    // }

    //return todos[found];
    const [result] = await pool.execute("UPDATE todos SET title = ?, completed = ? WHERE id = ?", [title, completed, id]);
    if(result.affectedRows === 0){
        return null;
    }
    return {id, title, completed};
}

export const deleteTodo = async (todo) => {
    // const todo = getTodoById(id);
    // //Si no se encuentra la tarea, devolvemos null
    // if (!todo) return null;
    // const found = todos.findIndex((currentTodo)=> currentTodo.id === todo.id);
    // const deletedTodo = todos.splice(found, 1)[0]
    // return deletedTodo;
    const [row] = await pool.execute("DELETE FROM todos WHERE id = ?", [todo.id]);
    if(row.affectedRows === 0){
        return null;
    }
    return todo;
}