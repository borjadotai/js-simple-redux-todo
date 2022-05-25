import {
  ADD_GOAL,
  ADD_TODO,
  REMOVE_GOAL,
  REMOVE_TODO,
  TOGGLE_TODO
} from "./constants";

/*
  ACTION CREATORS
*/

export function addTodoAction(todo) {
  return {
    type: ADD_TODO,
    todo
  };
}

export function addGoalAction(goal) {
  return {
    type: ADD_GOAL,
    goal
  };
}

export function removeGoalAction(id) {
  return {
    type: REMOVE_GOAL,
    id
  };
}

export function removeTodoAction(id) {
  return {
    type: REMOVE_TODO,
    id
  };
}

export function toggleTodoAction(id) {
  return {
    type: TOGGLE_TODO,
    id
  };
}
