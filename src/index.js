import createStore from "./redux";
import appReducer from "./reducer";
import {
  addGoalAction,
  addTodoAction,
  toggleTodoAction,
  removeGoalAction,
  removeTodoAction
} from "./actions";

const LI_STYLES =
  "-mx-1 px-1 my-2 flex justify-between rounded-sm text-gray-300 hover:bg-neutral-800";

const todo = { id: 0, name: "Learn Redux", complete: false };
const goal = { id: 0, name: "Learn Spanish" };
const initialState = { todos: [todo], goals: [goal] };
const store = createStore(initialState, appReducer);

store.subscribe(() => {
  const { todos, goals } = store.getState();
  document.getElementById("todos").innerHTML = "";
  document.getElementById("goals").innerHTML = "";
  todos.forEach((todo) => addTodoToDOM(todo));
  goals.forEach((goal) => addGoalToDOM(goal));
});

function addTodoToDOM(todo) {
  const node = document.createElement("li");
  node.classList = LI_STYLES;
  const wrapper = document.createElement("span");
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.id = todo.name;
  checkbox.value = todo.name;
  checkbox.name = todo.name;
  checkbox.checked = todo.complete;
  const label = document.createElement("label");
  label.classList = "ml-2 cursor-pointer";
  label.htmlFor = todo.name;
  const text = document.createTextNode(todo.name);
  label.appendChild(text);
  wrapper.appendChild(checkbox);
  wrapper.appendChild(label);
  wrapper.addEventListener("click", () => {
    store.dispatch(toggleTodoAction(todo.id));
  });
  node.appendChild(wrapper);
  const removeButton = document.createElement("button");
  const removeImage = document.createElement("img");
  removeImage.src = "./remove.svg";
  removeButton.appendChild(removeImage);
  removeButton.addEventListener("click", () => {
    store.dispatch(removeTodoAction(todo.id));
  });
  node.appendChild(removeButton);
  document.getElementById("todos").appendChild(node);
}

function addGoalToDOM(goal) {
  const node = document.createElement("li");
  node.classList = LI_STYLES;
  const text = document.createTextNode(goal.name);
  node.appendChild(text);
  const removeButton = document.createElement("button");
  const removeImage = document.createElement("img");
  removeImage.src = "./remove.svg";
  removeButton.appendChild(removeImage);
  removeButton.addEventListener("click", () => {
    store.dispatch(removeGoalAction(goal.id));
  });
  node.appendChild(removeButton);
  document.getElementById("goals").appendChild(node);
}

function addTodo(e) {
  e.preventDefault();
  const name = document.getElementById("todosFormInput").value;
  document.getElementById("todosFormInput").value = "";
  name.length > 1 &&
    store.dispatch(
      addTodoAction({
        name,
        id: (Math.random() * 100).toFixed(0),
        complete: false
      })
    );
}

const todosForm = document.getElementById("todosForm");
if (todosForm.addEventListener) {
  todosForm.addEventListener("submit", addTodo, false);
}

function addGoal(e) {
  e.preventDefault();
  const name = document.getElementById("goalsFormInput").value;
  document.getElementById("goalsFormInput").value = "";
  name.length > 1 &&
    store.dispatch(
      addGoalAction({
        name,
        id: (Math.random() * 100).toFixed(0)
      })
    );
}

const goalsForm = document.getElementById("goalsForm");
if (goalsForm.addEventListener) {
  goalsForm.addEventListener("submit", addGoal, false);
}

function initReduxUI() {
  const { todos, goals } = store.getState();
  document.getElementById("todos").innerHTML = "";
  document.getElementById("goals").innerHTML = "";
  todos.forEach((todo) => addTodoToDOM(todo));
  goals.forEach((goal) => addGoalToDOM(goal));
}

if (document.readyState !== "loading") {
  initReduxUI();
} else {
  initReduxUI();
}
