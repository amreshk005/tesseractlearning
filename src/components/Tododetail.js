import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { deleteTodo, updateTodo } from "../redux/actions";
import style from "./Todo.module.css";

function Tododetail(props) {
  const history = useHistory();
  const [input, setInput] = useState({
    id: 0,
    title: "",
    description: "",
  });

  console.log(history);
  useEffect(() => {
    if (history.location.state) {
      console.log(history);
      let { id, title, description } = history.location.state;
      setInput({
        id: id,
        title: title,
        description: description,
      });
    }
  }, []);

  const handleInput = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };
  const handleUpdate = (e) => {
    e.preventDefault();
    let { id, title, description } = input;
    let getTodo = props.todos.map((e) => {
      if (e.id === id) {
        return { ...e, title: title, description: description };
      }
      return e;
    });
    props.updateTodo(getTodo);
  };
  const handleDelete = (e) => {
    let { id } = input;
    let updatedTodo = props.todos.filter((e) => e.id !== id);
    updatedTodo.map((e, index) => ({ ...e, id: index }));
    props.deleteTodo(updatedTodo);
    history.push("/");
  };
  return (
    <div className={style.container}>
      <form>
        <label className={style.label}>Name</label> <br />
        <input className={style.input} type="text" name="title" value={input.title} onChange={handleInput} />
        <br />
        <label className={style.label}>Descritpion</label> <br />
        <textarea className={style.input} type="text" name="description" placeholder="Enter Description" value={input.description} onChange={handleInput} />
        <br />
        <div className={style.deleteContainer}>
          <button className={`${style.updatebtn} ${style.btn}`} onClick={handleUpdate}>
            Update
          </button>
          <button className={`${style.createbtn} ${style.btn}`} onClick={handleDelete}>
            Delete
          </button>
        </div>
      </form>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    todos: state.todos,
  };
};

export default connect(mapStateToProps, { deleteTodo, updateTodo })(Tododetail);
