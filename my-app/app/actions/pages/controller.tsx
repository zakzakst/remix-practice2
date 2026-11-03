import { createController } from "remix/router";

import { routes } from "../../routes.ts";

export const pagesController = createController(routes.pages, {
  actions: {
    login(context) {
      return context.render(<div>Login Page</div>);
    },
  },
});
