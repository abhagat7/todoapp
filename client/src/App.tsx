import React, { useEffect, useState } from 'react'
import TodoItem from './components/TodoItem'
import AddTodo from './components/AddTodo'
import { getTodos, addTodo, updateTodo, deleteTodo } from './API'

const App: React.FC = () => {
  const [todos, setTodos] = useState<ITodo[]>([])

  useEffect(() => {
    fetchTodos()
  }, [])

  const fetchTodos = (): void => {
    getTodos()
    .then( (response) => setTodos([...response.data.todos]))
    .catch((err: Error) => console.log(err))

  }

 const handleSaveTodo = (e: React.FormEvent, formData: ITodo): void => {
  console.log(formData)
   e.preventDefault()
   addTodo(formData)
   .then(({ status, data }) => {
    if (status !== 201) {
      throw new Error('Error! Todo not saved')
    }
    setTodos([...todos])
  })
  .catch((err) => console.log(err))
     window.location.reload();

 }

  const handleUpdateTodo = (todo: ITodo): void => {
    updateTodo(todo)
    .then(({ status, data }) => {
        if (status !== 200) {
          throw new Error('Error! Todo not updated')
        }
        setTodos([...todos])
      })
      .catch((err) => console.log(err))
      window.location.reload();

  }

  const handleDeleteTodo = (_id: string): void => {
    deleteTodo(_id)
    .then(({ status, data }) => {
        if (status !== 200) {
          throw new Error('Error! Todo not deleted')
        }
        setTodos([...todos])
      })

      .catch((err) => console.log(err))
      window.location.reload();

  }

  return (
    <main className='App'>
      <h1>My Todo List</h1>
      <AddTodo saveTodo={handleSaveTodo} />
      {todos.map((todo: ITodo) => (
        <TodoItem
          key={todo._id}
          updateTodo={handleUpdateTodo}
          deleteTodo={handleDeleteTodo}
          todo={todo}
        />
      ))}
    </main>
  )
}

export default App
