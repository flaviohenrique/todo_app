
import { ITodo } from '../interfaces'

type props = {
  todos: ITodo[],
  children?: React.ReactNode
}

const Home = ({ todos = [] }: props): JSX.Element => {
  return (
    <section>
      <h2>My todo list</h2>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <strong>{todo.description}</strong>
            {todo.moreDescription}
          </li>
        ))}
      </ul>
    </section>
  )
}

export default Home
