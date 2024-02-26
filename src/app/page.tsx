'use client'

import { todosReducer } from "@/reducers/todosReducer"
import { useReducer, useState } from "react"

export default function Home() {
  const [ inputTodo, setInputTodo ] = useState('')
  const [ todos, todoDispath ] = useReducer(todosReducer, [])

  const handleInsertNewTodo = () => {
    const btnInsert = document.getElementById('addTodo')
    btnInsert?.classList.add('animate-ping')
    
    if(inputTodo.trim() !== ""){
      todoDispath({
        type: 'add',
        payload: {
          text: inputTodo
        }
      })

      setInputTodo('')
    }
    setTimeout(() => {
      btnInsert?.classList.remove('animate-ping')
    }, 1100);
    
  }

  const handleToggleDoneTodo = (id: number) => {
    todoDispath({
      type: 'toggleDone',
      payload: {
        id
      }
    })
  }

  const handleDeleteTodo = (id: number) => {
    todoDispath({
      type: 'delete',
      payload: {
        id
      }
    })
  }

  return (
    <main className="select-none px-4 w-screen h-screen flex items-center justify-center bg-gradient-to-tr from-sky-600 to-purple-600 overflow-hidden">
      <div className="w-full max-w-5xl max-h-lvh m-6 bg-white shadow-md rounded-md py-4 text-black">
        <h1 className="text-center font-bold text-4xl border-b-2 pb-4">My TODO list</h1>
        <div className="w-full p-4 border-b-2 flex items-center justify-between gap-9">
          <input 
            type="text" 
            value={inputTodo}
            onChange={(e) => setInputTodo(e.target.value)}
            placeholder="Type new ToDo"
            className="flex-1 min-w-14 bg-slate-500 p-4 rounded-md focus:outline-none text-white text-md"
          />
          <button id="addTodo" onClick={handleInsertNewTodo} className="flex-2 p-4 text-md rounded-md bg-gradient-to-tr from-sky-600 to-purple-600
          text-white">Insert now</button>
        </div>
        <div className="px-4 pt-4 w-full">
          <ul className="w-full max-h-96 flex flex-col items-start justify-start overflow-y-auto">
          {todos.length > 0 &&
            todos.map((todo, index) => (
                <li key={todo.id} onClick={() => handleToggleDoneTodo(todo.id)} className={`select-none	cursor-pointer w-full p-4 text-xl border-b-2 text-gray-800 flex justify-between items-center
                ${todos.length === index + 1 && 'border-none'}
                `}>
                  <p className={`${todo.done ? 'line-through opacity-60' : ''}`}>{todo.text}</p>
                  <button onClick={() => handleDeleteTodo(todo.id)} className="bg-red-500 w-8 h-8 text-white font-bold rounded-md hover:rounded-full">x</button>
                </li>
            ))
          }
          </ul>

          {todos.length === 0 &&
            <p className="text-center text-2xl">Sem dados...😞</p>
          }

        </div>
      </div>
    </main>
  );
}
