/* eslint-disable react/prop-types */
import React from 'react';
import './App.css';

function Todo({
  todo, index, doneTodo, removeTodo,
}) {
  return (
    <div
      className="todo"
    >
      <span style={{ textDecoration: todo.isCompleted ? 'line-through' : '' }}>
        {' '}
        {todo.text}
        {' '}
      </span>
      <div style={{ marginLeft: 15 }}>
        <input
          type="checkbox"
          style={{
            padding: 5, margin: 4,
          }}
          onInput={() => doneTodo(index)}
        />
        <button
          type="button"
          style={{
            fontSize: 10, padding: 5, margin: 4, display: todo.isCompleted ? '' : 'none',
          }}
          disabled={!todo.isCompleted}
          onClick={() => removeTodo(index)}
        >
          {' '}
          Delete
        </button>
      </div>

    </div>
  );
}

function TodoForm({ addTodo, todos }) {
  const [value, setValue] = React.useState('');

  const firstLatterCapital = (str) => str.charAt(0).toUpperCase() + str.slice(1);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newArrTodo = todos.map((text) => text.text);
    const isDuplicate = newArrTodo.includes(firstLatterCapital(value));
    if (isDuplicate) {
      setValue('');
      return;
    }
    if (!value) return;
    addTodo(firstLatterCapital(value));
    setValue('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" className="input" placeholder="Input todo in this field" value={value} onChange={(e) => setValue(e.target.value)} />
    </form>
  );
}

function App() {
  const [todos, setTodos] = React.useState([
    {
      text: 'Makan',
      isCompleted: false,
    },
    {
      text: 'Minum',
      isCompleted: false,
    },
    {
      text: 'Mandi',
      isCompleted: false,
    },
  ]);

  const addTodo = (text) => {
    setTodos([...todos, { text }]);
  };

  const doneTodo = (index) => {
    const newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
  };

  const removeTodo = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  return (
    <div className="app">
      <div className="app-header">
        <h1>Todo Apps</h1>
      </div>

      <div className="todo">
        <div className="todo-list">
          {todos.map((todo, index) => (
            <Todo
              key={todo.text}
              index={index}
              todo={todo}
              doneTodo={doneTodo}
              removeTodo={removeTodo}
            />
          ))}
          <TodoForm addTodo={addTodo} todos={todos} />
        </div>
      </div>
    </div>
  );
}

export default App;
