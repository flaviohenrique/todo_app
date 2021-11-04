
import { InferGetServerSidePropsType, GetServerSidePropsContext } from 'next'
import { useState, MouseEvent } from 'react'
import { TodoService } from '../services/todo.service'

const service = new TodoService()

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const todos = await service.getAllTodos()
  const selectedTodo = todos.at(0)

  return {
    props: {
      todos,
      selectedTodo
    }
  }
}

const Home = ({ todos = [], selectedTodo }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [todoList] = useState(todos)
  const [selectedTodoItem, setSelectedTodoItem] = useState(selectedTodo)

  const selectTodo = (e: MouseEvent<HTMLAnchorElement>, todoId: string) => {
    e.preventDefault()

    selectedTodo = todos.find((t) => t.id === todoId)

    setSelectedTodoItem(selectedTodo)
  }

  return (
    <>
      <section>
        <h2>My todo list</h2>
        <ul>
          {todoList.map((todo) => (
            <li key={todo.id}>
              <a href="#" onClick={(e) => selectTodo(e, todo.id)}> {todo.description} </a>
            </li>
          ))}
        </ul>
      </section >
      <section>
        {
          selectedTodoItem ?
            <>
              <h1>{selectedTodoItem.description}</h1>
              <p>{selectedTodoItem.moreDescription}</p>
            </>
            : <p>No itens found</p>
        }
      </section>
    </>
  )
}

export default Home
