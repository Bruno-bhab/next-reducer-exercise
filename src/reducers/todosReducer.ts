import { Todo } from "@/types/Todo"

type AddAction = {
    type: 'add'
    payload: {
        text: string
    }
}

type DeleteAction = {
    type: 'delete'
    payload: {
        id: number
    }
}

type ToggleDoneAction = {
    type: 'toggleDone'
    payload: {
        id: number
    }
}

type todosActions = AddAction | DeleteAction | ToggleDoneAction

export const todosReducer = (todos: Todo[], action: todosActions) => {
    switch (action.type){
        case 'add':
            const newTodo: Todo = {
                id: todos.length + 1,
                text: action.payload.text,
                done: false
            }

            return [...todos, newTodo]
        case 'delete':
            return todos.filter(todo => todo.id !== action.payload.id)

        case 'toggleDone':
            return todos.map(todo => {
                if(todo.id === action.payload.id) todo.done = !todo.done
                return todo
            })

        default:
            return todos
    }
}