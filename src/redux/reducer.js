import { ADD_TODO, DELETE_TODO, UPDATE_TODO } from "./actionTypes";

const initialState = {
  todos: [
    { id: 0, title: "Learn React", completed: true, description: "We need to learn react from basic to advance in 2 months" },
    { id: 1, title: "Learn Redux", completed: false, description: "We need to learn redux after react from basic to advance in 15 days" },
    { id: 2, title: "Build something fun!", completed: false, description: "We need to build a project based on react and redux " },
  ],
};

const returnUpdatedState = (state, action) => {
  return {
    ...state,
    todos: action.payload,
  };
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case ADD_TODO: {
      // Can return just the new todos array - no extra object around it
      console.log(console.log(state));
      return {
        ...state,
        todos: [
          ...state.todos,
          {
            id: state.todos.length,
            title: action.payload,
            desc: "hello",
            completed: false,
          },
        ],
      };
    }
    case DELETE_TODO:
      return returnUpdatedState(state, action);
    case UPDATE_TODO:
      return returnUpdatedState(state, action);

    default:
      return state;
  }
}

export default reducer;
