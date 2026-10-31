export type Todo = {
  id: string;
  title: string;
  completed: boolean;
};

let todos: Todo[] = [];
let nextId = 1;

export function listTodos() {
  return todos;
}

export function getTodo(id: string) {
  return todos.find((todo) => todo.id === id);
}

export function createTodo(input: Omit<Todo, "id">) {
  const todo = { id: String(nextId++), ...input };
  todos.push(todo);
  return todo;
}

export function updateTodo(id: string, input: Partial<Omit<Todo, "id">>) {
  const todo = getTodo(id);

  if (!todo) {
    return undefined;
  }

  Object.assign(todo, input);
  return todo;
}

export function deleteTodo(id: string) {
  const index = todos.findIndex((todo) => todo.id === id);

  if (index === -1) {
    return false;
  }

  todos.splice(index, 1);
  return true;
}
