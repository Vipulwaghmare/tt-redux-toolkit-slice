import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createToDo,
  selectTodo,
  deleteTodo,
  toggleTodo,
  editTodo,
} from "store/todoSlice";

const ToDo = () => {
  const [editInput, setEditInput] = useState("");
  const [newInput, setNewInput] = useState("");
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos.todos);
  const selectedTodo = useSelector((state) => state.todos.selected);

  useEffect(() => {
    if (selectedTodo) {
      setEditInput(selectedTodo.title);
    }
  }, [selectedTodo]);

  const onAdd = (e) => {
    e.preventDefault();
    dispatch(createToDo(newInput));
    setNewInput("");
  };

  const onEdit = (e) => {
    e.preventDefault();
    dispatch(editTodo({ id: selectedTodo.id, title: editInput }));
  };

  const onDelete = (e) => {
    e.preventDefault();
    dispatch(deleteTodo(selectedTodo.id));
    dispatch(selectTodo(null));
  };

  const onToggle = (e) => {
    e.preventDefault();
    dispatch(toggleTodo(selectedTodo.id));
  };

  return (
    <div className="todo">
      <h2>To Do List</h2>
      <div>
        <form className="add">
          <input
            type="text"
            value={newInput}
            onChange={(e) => setNewInput(e.target.value)}
          />
          <button type="submit" onClick={onAdd}>
            Add Todo
          </button>
        </form>
      </div>
      <div className="todos-main">
        <div className="list">
          <p className="note">To Do List</p>
          {todos.length === 0 ? (
            <p>No Todos Available</p>
          ) : (
            todos.map((todo) => (
              <div
                onClick={() => dispatch(selectTodo(todo.id))}
                key={todo.id}
                className={`${todo.isComplete ? "line-through" : ""}`}
              >
                {todo.title}
              </div>
            ))
          )}
        </div>
        <div className="selected">
          {!selectedTodo ? (
            <p className="note">No To Do Selected</p>
          ) : (
            <form>
              <input
                value={editInput}
                onChange={(e) => setEditInput(e.target.value)}
              />
              <div>
                <button onClick={onEdit}>Edit</button>
                <button onClick={onToggle}>Toggle</button>
                <button onClick={onDelete}>Delete</button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ToDo;
