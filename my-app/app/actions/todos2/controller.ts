import { createController } from "remix/router";
import { routes } from "../../routes.ts";

type Todo = {
  id: number;
  title: string;
  done: boolean;
};

const todos: Todo[] = [
  {
    id: 1,
    title: "TODO1",
    done: false,
  },
  {
    id: 2,
    title: "TODO2",
    done: true,
  },
];

export const todos2Controller = createController(routes.todos2, {
  actions: {
    index() {
      return Response.json(todos);
    },
    show(context) {
      const todo = todos.find((todo) => todo.id === Number(context.params.id));
      return todo
        ? Response.json(todo)
        : Response.json({ error: "Todo not found" }, { status: 404 });
    },
  },
});
