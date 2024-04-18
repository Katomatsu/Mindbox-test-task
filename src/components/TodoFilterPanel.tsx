import {FiltersModel} from "../models/FiltersModel.ts";
import {useState} from "react";
import {TodoModel} from "../models/TodoModel.ts";

interface FilterListProps {
    todos: TodoModel[]
    onChangeFilter: (filter: 'All' | 'Active' | 'Completed') => void;
    onClearCompletedTodos: () => void;
}

const TodoFilterPanel = ({onChangeFilter, todos, onClearCompletedTodos}: FilterListProps) => {
    const [filters, setFilters] = useState<FiltersModel[]>([
        {name: 'All', isActive: true},
        {name: 'Active', isActive: false},
        {name: 'Completed', isActive: false}
    ])

    const activeTodosCount = () => {
        return todos.filter((todo: TodoModel) => !todo.isComplete).length
    }

    const filterChangeHandler = (filter: 'All' | 'Active' | 'Completed') => {
        onChangeFilter(filter)
        const updatedFilters = filters.map(item => {
            return item.name === filter ? {...item, isActive: true} : {...item, isActive: false}
        })
        setFilters(updatedFilters)
    }

    return (
        <div className={'flex justify-between items-center mt-2'}>
            <div>{activeTodosCount()} {activeTodosCount() !== 1 ? 'items left' : 'item left'}</div>
            <div className={'flex justify-center items-center gap-x-4'}>{filters.map((filter) => (
                <button key={filter.name} onClick={() => filterChangeHandler(filter.name)}
                    className={`cursor-pointer ${filter.isActive ? 'p-2 border' : ''}`}>{filter.name}</button>
            ))}</div>
            <button className={'cursor-pointer'} onClick={onClearCompletedTodos}>Clear completed</button>
        </div>
    );
};

export default TodoFilterPanel;