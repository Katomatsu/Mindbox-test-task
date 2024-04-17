import TodoItem from "./TodoItem.tsx";
import {TodoModel} from "../models/TodoModel.ts";
import {useEffect, useState} from "react";
import FiltersList from "./FiltersList.tsx";

interface TodoListProps {
    todos: TodoModel[];
    onDeleteTodo: (id: string) => void;
    onChangeTodoProgress: (id: string) => void;
    onClearCompletedTodos: () => void;
}

const TodoList = ({todos, onDeleteTodo, onChangeTodoProgress, onClearCompletedTodos}: TodoListProps) => {
    const [filteredTodos, setFilteredTodos] = useState<TodoModel[]>([])
    const [currentFilter, setCurrentFilter] = useState<'All' | 'Active' | 'Completed'>('All')

    const changeFilter = (filter: 'All' | 'Active' | 'Completed') => {
        setCurrentFilter(filter)
    }

    useEffect(() => {
        let filteredTodos: TodoModel[];
        switch (currentFilter) {
            case 'Active':
                filteredTodos = todos.filter(todo => !todo.isComplete)
                break
            case 'Completed':
                filteredTodos = todos.filter(todo => todo.isComplete)
                break
            default:
                filteredTodos = [...todos]
                break
        }
        setFilteredTodos(filteredTodos)
    }, [todos, currentFilter]);


    return (
        <>
            <ul className={'mt-4'}>
                {filteredTodos.map((todo: TodoModel) => {
                    return <TodoItem key={todo.id} onChangeTodoProgress={onChangeTodoProgress}
                                     onDeleteTodo={onDeleteTodo} todo={todo}/>
                })}
            </ul>
            <FiltersList onClearCompletedTodos={onClearCompletedTodos} todos={todos} onChangeFilter={changeFilter}/>
        </>
    );
};

export default TodoList;