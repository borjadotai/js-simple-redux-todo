/*
  Pure functions
  1) Always return the same result if the same args are passed in
  2) They depends only on the args passed into them
  3) Never produce any side effects
*/
function todoReducer(state = [], action) {
  switch (action.type) {
    case "ADD_TODO":
      return state.concat([action.todo]);
    case "REMOVE_TODO":
      return state.filter(({ id }) => id !== action.id);
    case "TOGGLE_TODO":
      return state.map((todo) =>
        todo.id === action.id ? { ...todo, complete: !todo.complete } : todo
      );
    default:
      return state;
  }
}

function goalsReducer(state = [], action) {
  switch (action.type) {
    case "ADD_GOAL":
      return state.concat([action.goal]);
    case "REMOVE_GOAL":
      return state.filter(({ id }) => id !== action.id);
    default:
      return state;
  }
}

export default function appReducer(state = {}, action) {
  return {
    todos: todoReducer(state.todos, action),
    goals: goalsReducer(state.goals, action)
  };
}
