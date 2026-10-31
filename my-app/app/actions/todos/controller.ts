import { createController } from "remix/router";

import { routes } from "../../routes.ts";
import {
  createTodo,
  deleteTodo,
  getTodo,
  listTodos,
  updateTodo,
  type Todo,
} from "./store.ts";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

async function readJson(request: Request): Promise<unknown> {
  try {
    return await request.json();
  } catch (error) {
    if (error instanceof SyntaxError) {
      return null;
    }

    throw error;
  }
}

function parseCreateInput(value: unknown): Omit<Todo, "id"> | undefined {
  if (!isRecord(value) || typeof value.title !== "string") {
    return undefined;
  }

  const title = value.title.trim();
  if (!title || (value.completed !== undefined && typeof value.completed !== "boolean")) {
    return undefined;
  }

  return { title, completed: value.completed ?? false };
}

function parseUpdateInput(
  value: unknown,
): Partial<Omit<Todo, "id">> | undefined {
  if (!isRecord(value)) {
    return undefined;
  }

  const input: Partial<Omit<Todo, "id">> = {};

  if (value.title !== undefined) {
    if (typeof value.title !== "string" || !value.title.trim()) {
      return undefined;
    }
    input.title = value.title.trim();
  }

  if (value.completed !== undefined) {
    if (typeof value.completed !== "boolean") {
      return undefined;
    }
    input.completed = value.completed;
  }

  return Object.keys(input).length > 0 ? input : undefined;
}

export default createController(routes.todos, {
  actions: {
    index() {
      return Response.json(listTodos());
    },
    show(context) {
      const todo = getTodo(context.params.id);
      return todo
        ? Response.json(todo)
        : Response.json({ error: "Todo not found" }, { status: 404 });
    },
    async create(context) {
      const input = parseCreateInput(await readJson(context.request));
      if (!input) {
        return Response.json(
          { error: "A non-empty title is required" },
          { status: 400 },
        );
      }

      const todo = createTodo(input);
      return Response.json(todo, {
        status: 201,
        headers: {
          Location: routes.todos.show.href({ id: todo.id }),
        },
      });
    },
    async update(context) {
      const input = parseUpdateInput(await readJson(context.request));
      if (!input) {
        return Response.json(
          { error: "Provide a non-empty title or a boolean completed value" },
          { status: 400 },
        );
      }

      const todo = updateTodo(context.params.id, input);
      return todo
        ? Response.json(todo)
        : Response.json({ error: "Todo not found" }, { status: 404 });
    },
    destroy(context) {
      return deleteTodo(context.params.id)
        ? new Response(null, { status: 204 })
        : Response.json({ error: "Todo not found" }, { status: 404 });
    },
  },
});
