#! /usr/bin/env -S deno run --allow-net --allow-read --unstable

import { Application, Router } from "https://deno.land/x/oak@v7.5.0/mod.ts";
import { delay } from 'https://deno.land/x/delay@v0.2.0/mod.ts';

const app = new Application();
const router = new Router();

router.get("/", function (ctx) {
  ctx.response.body = { hello: "There" };
});

const getView = () => {
  return new Promise(async (resolve, reject) => {
    console.log('call busy function...')
    await delay(3000)
    console.log('done await')
    const html = 'response with async/await/Promise after delay 3000ms'
    resolve(html)
  })
}

router.get("/view2", async (ctx) => {
  const html: any = await getView();
  ctx.response.body = html;
});

router.get("/another-view2", async (ctx) => {
  const html: any = await new Promise(async (resolve, reject) => {
    console.log('call busy function...')
    await delay(3000)
    console.log('done await')
    const html = 'response with async/await/Promise after delay 3000ms'
    resolve(html)
  })
  ctx.response.body = html;
});


router.get("/view", function (ctx) {
  ctx.response.body = 'response without async/await/Promise';
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
