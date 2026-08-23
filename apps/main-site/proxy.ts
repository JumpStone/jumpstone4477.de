import { config, middleware } from "./middleware";

export function proxy(request: Parameters<typeof middleware>[0]) {
  return middleware(request);
}

export { config };
