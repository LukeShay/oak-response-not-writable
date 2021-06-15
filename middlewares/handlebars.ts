import { Handlebars } from "handlebars/mod.ts";
import { Context } from "oak/mod.ts";

declare module "oak/mod.ts" {
  interface Context {
    render(template: string, data?: Record<string, unknown>): void;
  }

  interface RouterContext {
    render(template: string, data?: Record<string, unknown>): void;
  }
}

const handlebars = new Handlebars();

function middleware() {
  // deno-lint-ignore ban-types
  return async function (ctx: Context, next: Function) {
    ctx.render = function (
      template: string,
      context?: Record<string, unknown>,
      layout?: string,
    ) {
      try {
        ctx.response.body = () =>
          handlebars.renderView(template, context, layout);
        ctx.response.type = "text/html";
      } catch (e) {
        console.error(e);
      }
    };

    await next();
  };
}

export { middleware as handlebars };
