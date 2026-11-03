import { createController } from "remix/router";

import { routes } from "../../routes.ts";

import { LoginPage } from "./LoginPage.tsx";

export const pagesController = createController(routes.pages, {
  actions: {
    login(context) {
      return context.render(<LoginPage />);
    },
  },
});
