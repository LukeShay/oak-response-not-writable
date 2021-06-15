export function getPort(): number {
  const envPort = Deno.env.get("PORT");
  if (envPort) {
    return parseInt(envPort, 10);
  }

  return 8000;
}
