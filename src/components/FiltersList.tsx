import {FiltersModel} from "../models/FiltersModel.ts";
import {useState} from "react";
import {TodoModel} from "../models/TodoModel.ts";

interface FilterListProps {
    todos: TodoModel[]
    onChangeFilter: (filter: 'All' | 'Active' | 'Completed') => void;
    onClearCompletedTodos: () => void;
}

const FiltersList = ({onChangeFilter, todos, onClearCompletedTodos}: FilterListProps) => {
    const [filters, setFilters] = useState<FiltersModel[]>([{name: 'All', isActive: true},
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
        <ul className={'flex justify-between items-center mt-2'}>
            <li>{activeTodosCount()} {activeTodosCount() !== 1 ? 'items left' : 'item left'}</li>
            <div className={'flex justify-center items-center gap-x-4'}>{filters.map((filter) => (
                <li key={filter.name} onClick={() => filterChangeHandler(filter.name)}
                    className={`cursor-pointer ${filter.isActive ? 'p-2 border' : ''}`}>{filter.name}</li>
            ))}</div>
            <li className={'cursor-pointer'} onClick={onClearCompletedTodos}>Clear completed</li>
        </ul>
    );
};

export default FiltersList;