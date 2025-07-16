import { useGetTodosQuery } from '@/services/api';
import type { ITodo } from '@/services/types/Todo';
import { Card } from 'antd';

const AllTodos = () => {
  const { data: todos, error, isLoading } = useGetTodosQuery();
  return (
    <>
      {error && <div>Error: {error.message}</div>}
      {isLoading && <div>Loading...</div>}
      {!isLoading && !error && (
        <div className=" p-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {todos.map((todo: ITodo) => (
            <Card
              key={todo.id}
              style={{ maxWidth: 300, backgroundColor: 'var(--c-card)' }}>
              <h2 className="text-lg mb-2">{todo.title}</h2>
              <p>{todo.description}</p>
            </Card>
          ))}
        </div>
      )}
    </>
  );
};

export default AllTodos;
