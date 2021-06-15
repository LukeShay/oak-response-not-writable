#! /usr/bin/env -S deno run --unstable --allow-net --allow-read --allow-env --import-map=import_map.json

import { Application, HttpServerNative } from "oak/mod.ts";
import { router } from "/routes/routes.ts";
import { assets } from "/middlewares/assets.ts";
import { handlebars } from "/middlewares/handlebars.ts";
import { getPort } from "/helpers/application.ts";

const app = new Application({
  serverConstructor: HttpServerNative,
});

// serve assets
app.use(assets("/assets", "./_build/static"));

// add render function to context
app.use(handlebars());

// add the routes
app.use(router.routes(), router.allowedMethods());

// deno-lint-ignore no-explicit-any
app.addEventListener("listen", ({ hostname, port, secure }: any) => {
  console.log(
    `Listening on: ${secure ? "https://" : "http://"}${hostname ??
      "localhost"}:${port}`,
  );
});

await app.listen({ port: getPort() });
