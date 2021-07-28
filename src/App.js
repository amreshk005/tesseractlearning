import { Route } from "react-router-dom";
import Todo from "./components/Todo";

function App() {
  return (
    <div className="App">
      <Route path="/">
        <Todo />
      </Route>
    </div>
  );
}

export default App;
