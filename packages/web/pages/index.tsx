
import { GetServerSideProps, GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import { useState, MouseEvent } from 'react'
import { Api } from '../api'
import { requiresAuthentication } from '../lib/auth.session'
import type { ITodo, AuthPageProps } from '../interfaces/index'

const api = new Api()

type PageProps = {
  todos: ITodo[],
  selectedTodo?: ITodo,  
} & AuthPageProps;


const internalGetServerSideProps : GetServerSideProps<PageProps> = async (context) => {
  const todos = await api.getAllTodos()
  const selectedTodo = todos.at(0)

  return {
    props: { todos, selectedTodo } as PageProps
  }
}


export const getServerSideProps = requiresAuthentication<PageProps>(internalGetServerSideProps);

const Home = ({ todos, selectedTodo }: InferGetServerSidePropsType<typeof internalGetServerSideProps>) => {
  const [todoList] = useState<ITodo[]>(todos)
  const [selectedTodoItem, setSelectedTodoItem] = useState<ITodo | undefined>(selectedTodo)

  const selectTodo = (e: MouseEvent<HTMLAnchorElement>, todoId: string) => {
    e.preventDefault()

    selectedTodo = todoList.find((t) => t.id === todoId)

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
