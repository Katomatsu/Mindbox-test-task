import {TodoModel} from "../models/TodoModel.ts";
import {FormEvent, useRef, useState} from "react";
import {v4 as uuid} from 'uuid'


interface AddTodoFormProps {
    onAddTodo: (todo: TodoModel) => void;
}

const AddTodoForm = ({onAddTodo}: AddTodoFormProps) => {
    const [classes, setClasses] = useState('')
    const inputRef = useRef<HTMLInputElement | null>(null);

    const addTodoHandler = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (inputRef.current!.value.trim() !== '') {
            const todo: TodoModel = {
                text: inputRef.current!.value ,
                isComplete: false,
                id: uuid()
            }
            onAddTodo(todo);
            inputRef.current!.value = ''
            setClasses('')
            return
        } else {
            setClasses( 'border-red-700')
        }
    }

    return (
        <form className={'w-[100%] flex items-center justify-center h-[50px] mt-4'}
              onSubmit={(event) => addTodoHandler(event)}>
            <input ref={inputRef} className={`w-[70%] outline-none h-[100%] border-2 ${classes}`} type="text"
                   placeholder={'What needs to be done...'}/>
            <button className={'bg-blue-300 w-[30%] h-[100%] px-1'} type={"submit"}>Add new Todo</button>
        </form>
    );
};

export default AddTodoForm;