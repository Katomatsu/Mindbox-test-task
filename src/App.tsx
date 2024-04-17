import './App.css'
import TodoList from "./components/TodoList.tsx";
import AddTodoForm from "./components/AddTodoForm.tsx";
import {TodoModel} from "./models/TodoModel.ts";
import {useState} from "react";

function App() {
    const [todos, setTodos] = useState<TodoModel[]>([])

    const addTodo = (todo: TodoModel) => {
        setTodos(prevTodos => [todo, ...prevTodos]);
    }

    const deleteTodo = (id: string) => {
        const filteredTodos: TodoModel[] = todos.filter(todo => todo.id !== id);
        setTodos(filteredTodos);
    }

    const clearCompletedTodos = () => {
        const filteredTodos: TodoModel[] = todos.filter(todo => !todo.isComplete);
        setTodos(filteredTodos);
    }

    const changeTodoProgress = (id: string) => {
        const updatedTodos = todos.map((todo: TodoModel) => {
            return todo.id === id ? {...todo, isComplete: !todo.isComplete} : todo
        })
        setTodos(updatedTodos)
    }

    return (
        <>
            <h1 className={'text-5xl'}>Todos</h1>
            <AddTodoForm onAddTodo={addTodo} />
            <TodoList onClearCompletedTodos={clearCompletedTodos} onChangeTodoProgress={changeTodoProgress} onDeleteTodo={deleteTodo} todos={todos} />
        </>
    )
}

export default App
