import { Route } from "react-router-dom";
import "./App.css";
import Todo from "./components/Todo";
import Tododetail from "./components/Tododetail";

function App() {
  return (
    <div className="App">
      <Route exact path="/">
        <Todo />
      </Route>
      <Route exact path="/:title">
        <Tododetail />
      </Route>
    </div>
  );
}

export default App;
