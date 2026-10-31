import { createRouter, type RouterContext } from "remix/router";
import { render } from "remix/middleware/render";
import { staticFiles } from "remix/middleware/static";

import controller from "./actions/controller.tsx";
import todosController from "./actions/todos/controller.ts";
import { todos2Controller } from "./actions/todos2/controller.ts";
import { assets } from "./assets.ts";
import { routes } from "./routes.ts";

export const router = createRouter({
  middleware: [staticFiles("./public", { index: false }), render({ assets })],
});

export type AppContext = RouterContext<typeof router>;

declare module "remix" {
  interface RouterTypes {
    context: AppContext;
  }
}

router.map(routes, controller);
router.map(routes.todos, todosController);
router.map(routes.todos2, todos2Controller);
