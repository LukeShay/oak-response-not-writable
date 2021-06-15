#! /usr/bin/env -S deno run --unstable --allow-run --allow-read

import { delay } from "https://deno.land/std@0.98.0/async/mod.ts";

function buildAssets() {
  return Deno.run({ cmd: ["./scripts/build_assets.ts"] });
}

function runApp() {
  return Deno.run({ cmd: ["./application.ts"] });
}

async function main() {
  await buildAssets().status();
  let p = runApp();

  const watcher = Deno.watchFs(".");

  for await (const event of watcher) {
    if (
      event.paths.filter(
        (p) =>
          !p.includes("dev.ts") &&
          !p.includes("_build/") &&
          (p.includes(".css") || p.includes(".ts") || p.includes(".ejs")),
      ).length === 0
    ) {
      break;
    }

    if (event.paths.filter((p) => p.includes(".css"))) {
      await buildAssets().status();
    }

    console.log("restarting application");
    p.close();

    await delay(500);

    p = runApp();
  }
}

await main();
