#! /usr/bin/env -S deno run --unstable --allow-net --allow-read

import { Application, Router } from "https://deno.land/x/oak@v7.5.0/mod.ts";
import { Handlebars } from "https://deno.land/x/handlebars@v0.7.0/mod.ts";

const app = new Application();
const router = new Router();
const handle = new Handlebars();

router.get("/", function (ctx) {
  ctx.response.body = { hello: "There" };
});

router.get("/redirect", function (ctx) {
  ctx.response.redirect("/");
});

router.get("/broken-view", async function (ctx) {
  ctx.response.body = await handle.renderView("index");
});

router.get("/view", function (ctx) {
  ctx.response.body = () => handle.renderView("index");
});

app.use(router.routes(), router.allowedMethods());

// deno-lint-ignore no-explicit-any
app.addEventListener("listen", ({ hostname, port, secure }: any) => {
  console.log(
    `Listening on: ${secure ? "https://" : "http://"}${
      hostname ?? "localhost"
    }:${port}`
  );
});

await app.listen({ port: 8000 });
