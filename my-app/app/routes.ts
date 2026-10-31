import { del, get, patch, post, route } from "remix/routes";

export const routes = route({
  assets: get("/assets/*path"),
  home: "/",
  test: "/test",
  plane: "/plane",
  todos: route("/api/todos", {
    index: get("/"),
    show: get("/:id"),
    create: post("/"),
    update: patch("/:id"),
    destroy: del("/:id"),
  }),
});
