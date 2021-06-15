import {
  brightGreen,
  brightRed,
} from "https://deno.land/std@0.98.0/fmt/colors.ts";
export const BUILD_DIR = "_build";

export async function executeNoFail<T>(
  callback: () => Promise<T>,
): Promise<T | null> {
  try {
    return await callback();
  } catch {
    // ignore
  }

  return null;
}

export function logInfo(message: unknown) {
  console.log(`${brightGreen("INFO")}   | ${message}`);
}

export function logError(message: unknown) {
  console.log(`${brightRed("ERROR")} | ${message}`);
}

export function logAndExit(error: Error, exitCode = 1) {
  logError(error.message);
  logError(error);
  Deno.exit(exitCode);
}
