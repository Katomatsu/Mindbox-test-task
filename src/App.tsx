import './App.css'
import TodoList from "./components/TodoList.tsx";
import AddTodoForm from "./components/AddTodoForm.tsx";
import {TodoModel} from "./models/TodoModel.ts";
import {useEffect, useState} from "react";

const getLocalStorageTodos = () : TodoModel[]  => {
    const storedTodos  = localStorage.getItem("todos");
    if (storedTodos) {
        return JSON.parse(storedTodos);
    }
    return []
}

function App() {
    const [todos, setTodos] = useState<TodoModel[]>(getLocalStorageTodos)

    const addTodo = (todo: TodoModel) => {
        setTodos(prevTodos => [todo, ...prevTodos]);
    }

    const deleteTodo = (id: string) => {
        setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
    }

    const clearCompletedTodos = () => {
        setTodos(prevTodos => prevTodos.filter(todo => !todo.isComplete));
    }

    const changeTodoProgress = (id: string) => {
        const updatedTodos = todos.map((todo: TodoModel) => {
            return todo.id === id ? {...todo, isComplete: !todo.isComplete} : todo
        })
        setTodos(updatedTodos)
    }

    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos))
    }, [todos]);


    return (
        <>
            <h1 className={'text-5xl'}>Todos</h1>
            <AddTodoForm onAddTodo={addTodo} />
            <TodoList onClearCompletedTodos={clearCompletedTodos} onChangeTodoProgress={changeTodoProgress} onDeleteTodo={deleteTodo} todos={todos} />
        </>
    )
}

export default App
