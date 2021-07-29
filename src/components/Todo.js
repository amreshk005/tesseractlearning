import React, { useState } from "react";
import { connect } from "react-redux";
import { addTodo, updateTodo, deleteTodo } from "../redux/actions";
import { Link } from "react-router-dom";
import style from "./Todo.module.css";

function Todo(props) {
  const [input, setInput] = useState("");
  const [selectedItem, setSelectedItem] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input) {
      props.addTodo(input);
    }
  };

  const handleUpdate = (id) => {
    let getTodo = props.todos.map((e) => {
      if (e.id === id) {
        return { ...e, completed: !e.completed };
      }
      return e;
    });
    props.updateTodo(getTodo);
  };

  const handleCheckbox = (id) => {
    if (!selectedItem.includes(id)) {
      setSelectedItem([...selectedItem, id]);
    } else {
      setSelectedItem(selectedItem.filter((e) => e !== id));
    }
  };
  const handleDelete = () => {
    let updatedTodo = props.todos.filter((e) => !selectedItem.includes(e.id));
    updatedTodo.map((e, index) => ({ ...e, id: index }));
    props.deleteTodo(updatedTodo);
    setSelectedItem([]);
  };
  return (
    <div className={style.container}>
      <form onSubmit={handleSubmit}>
        <input className={style.input} type="text" value={input} onChange={(e) => setInput(e.target.value)} />
        <button className={`${style.createbtn} ${style.btn}`} type="submit">
          Create
        </button>
      </form>
      <div>
        <table className={style.todotable}>
          <tbody>
            <tr>
              <th></th>
              <th>My Todo's</th>
              <th>Status</th>
            </tr>
            {props.todos.map((e, index) => {
              return (
                //here we can uuid library for key but that need to install a library, so currently i'm writing like this
                <tr key={`${Date.now()} + ${index}`}>
                  <td>
                    <input type="checkbox" defaultChecked={selectedItem.includes(e.id)} onClick={() => handleCheckbox(e.id)} />
                  </td>
                  <td>
                    <Link to={{ pathname: `${e.title}`, state: { ...e } }}>{e.title}</Link>
                  </td>
                  <td>
                    <button className={`${style.statusbtn} ${style.btn}`} onClick={() => handleUpdate(e.id)}>
                      {e.completed ? "Completed" : "uncomplete"}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className={style.deleteContainer}>
          <button className={`${style.deletebtn} ${style.btn}`} onClick={handleDelete}>
            Delete {selectedItem.length} items
          </button>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    todos: state.todos,
  };
};

export default connect(mapStateToProps, { addTodo, updateTodo, deleteTodo })(Todo);
