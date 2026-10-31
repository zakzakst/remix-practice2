import { createController } from "remix/router";

import { assets } from "../assets.ts";
import { routes } from "../routes.ts";
import { HomePage } from "./home-page.tsx";
import { TestPage } from "./test-page.tsx";

export default createController(routes, {
  actions: {
    async assets(context) {
      return (
        (await assets.fetch(context.request)) ??
        new Response("Not Found", { status: 404 })
      );
    },
    home(context) {
      return context.render(<HomePage />);
    },
    test(context) {
      return context.render(<TestPage />);
    },
    plane() {
      return new Response("Plane Page");
    },
  },
});
