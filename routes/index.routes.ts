import { Router } from "oak/mod.ts";

const router = new Router();

router.get("/", async function (ctx) {
  await ctx.render("index");
});

export { router };
