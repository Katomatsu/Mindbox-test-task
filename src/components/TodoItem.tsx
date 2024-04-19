import {TodoModel} from "../models/TodoModel.ts";

import trashIcon from '../assets/trash.svg'

interface TodoItemProps {
    todo: TodoModel,
    onDeleteTodo: (id: string) => void,
    onChangeTodoProgress: (id: string) => void,
}

const TodoItem = ({todo, onDeleteTodo, onChangeTodoProgress}: TodoItemProps) => {

    const deleteItemHandler = () => {
        onDeleteTodo(todo.id);
    }

    const changeProgressHandler = () => {
        onChangeTodoProgress(todo.id);
    }

    return (
        <li
            className={`h-[50px] cursor-pointer flex justify-between items-center border-b-2 border px-4  border-gray-200 shadow-lg ${todo.isComplete ? ' text-gray-300 line-through' : ''}`}
        >
            <h2 className={'text-2xl overflow-hidden'}>{todo.text}</h2>
            <div className={'flex gap-x-4 justify-center items-center'}>
                <input className={' w-6 h-6 rounded-full  border-2 checked:bg-blue-500  border-gray-300'}
                       onChange={changeProgressHandler} checked={todo.isComplete} type="checkbox"/>
                <button className="cursor-pointer"
                        title={'After clicking on the element, it will be deleted'} onClick={deleteItemHandler}>
                    <img src={trashIcon} alt="trash"/>
                </button>
            </div>
        </li>
    );
};

export default TodoItem;