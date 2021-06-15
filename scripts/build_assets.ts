#! /usr/bin/env -S deno run --unstable --allow-read --allow-write --allow-env --import-map=import_map.json

import postcss from "https://deno.land/x/postcss@8.3.4/mod.js";
import autoprefixer from "https://jspm.dev/autoprefixer";
// import tailwindcss from "https://jspm.dev/tailwindcss";
import postcssImport from "https://deno.land/x/postcss_import@0.1.4/mod.js";
import { walk, WalkEntry } from "fs/mod.ts";
import {
  BUILD_DIR,
  executeNoFail,
  logAndExit,
  logInfo,
} from "/scripts/common.ts";

async function readContents(f: WalkEntry) {
  return new TextDecoder().decode(await Deno.readFile(f.path));
}

async function writeToBuildDir(path: string, contents: string) {
  await executeNoFail(() =>
    Deno.mkdir(`${BUILD_DIR}/${path}`.replace(/\/[a-zA-Z0-9\.]+$/, ""), {
      recursive: true,
    })
  );

  await executeNoFail(() => Deno.create(`${BUILD_DIR}/${path}`));

  await Deno.writeFile(
    `${BUILD_DIR}/${path}`,
    new TextEncoder().encode(contents),
  );
}

async function main() {
  // deno-lint-ignore no-explicit-any
  const processor = postcss([autoprefixer as any, postcssImport as any]); //, tailwindcss as any]);
  const files = walk("./static/css", { exts: [".css"] });

  for await (const f of files) {
    if (!f.isFile) break;

    logInfo(`processing file ${f.path}`);

    try {
      const { css } = await processor.process(await readContents(f), {
        from: undefined,
      });
      await writeToBuildDir(f.path, css);
    } catch (e) {
      logAndExit(e);
    }
  }
}

await main();
