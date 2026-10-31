import * as assert from "remix/assert";
import { describe, it } from "remix/test";

import { router } from "../../router.ts";
import { routes } from "../../routes.ts";

const origin = "http://localhost";

describe("todo API", () => {
  it("supports creating, reading, updating, and deleting a todo", async () => {
    const createResponse = await router.fetch(
      new Request(new URL(routes.todos.create.href(), origin), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: "Practice API" }),
      }),
    );

    assert.equal(createResponse.status, 201);
    const createdTodo = await createResponse.json();
    assert.equal(createdTodo.title, "Practice API");
    assert.equal(createdTodo.completed, false);
    assert.equal(
      createResponse.headers.get("Location"),
      routes.todos.show.href({ id: createdTodo.id }),
    );

    const showResponse = await router.fetch(
      new URL(routes.todos.show.href({ id: createdTodo.id }), origin),
    );
    assert.equal(showResponse.status, 200);
    assert.equal((await showResponse.json()).id, createdTodo.id);

    const updateResponse = await router.fetch(
      new Request(
        new URL(routes.todos.update.href({ id: createdTodo.id }), origin),
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ completed: true }),
        },
      ),
    );
    assert.equal(updateResponse.status, 200);
    assert.equal((await updateResponse.json()).completed, true);

    const listResponse = await router.fetch(
      new URL(routes.todos.index.href(), origin),
    );
    assert.equal(listResponse.status, 200);
    assert.equal(
      (await listResponse.json()).some(
        (todo: { id: string }) => todo.id === createdTodo.id,
      ),
      true,
    );

    const deleteResponse = await router.fetch(
      new Request(
        new URL(routes.todos.destroy.href({ id: createdTodo.id }), origin),
        { method: "DELETE" },
      ),
    );
    assert.equal(deleteResponse.status, 204);

    const missingResponse = await router.fetch(
      new URL(routes.todos.show.href({ id: createdTodo.id }), origin),
    );
    assert.equal(missingResponse.status, 404);
  });

  it("rejects invalid input", async () => {
    const response = await router.fetch(
      new Request(new URL(routes.todos.create.href(), origin), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: "   " }),
      }),
    );

    assert.equal(response.status, 400);
    assert.deepEqual(await response.json(), {
      error: "A non-empty title is required",
    });

    const malformedResponse = await router.fetch(
      new Request(new URL(routes.todos.create.href(), origin), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: "{",
      }),
    );

    assert.equal(malformedResponse.status, 400);
  });
});
