import {TodoModel} from "../models/TodoModel.ts";

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
        <li title={'After clicking on the element, it will be deleted'}
            className={`h-[50px] cursor-pointer flex justify-between items-center border-b-2 border px-4  border-gray-200 shadow-lg ${todo.isComplete ? ' text-gray-300 line-through' : ''}`}
            onClick={deleteItemHandler}>
            <h2 className={'text-2xl overflow-hidden'}>{todo.text}</h2>
            <input className={' w-6 h-6 rounded-full  border-2 checked:bg-blue-500  border-gray-300'}
                   onChange={changeProgressHandler} checked={todo.isComplete} type="checkbox"/>
        </li>
    );
};

export default TodoItem;