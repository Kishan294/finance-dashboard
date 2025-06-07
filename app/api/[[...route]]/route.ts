import { Hono } from "hono";
import { handle } from "hono/vercel";
import accounts from "./accounts";
import categories from "./categories";

export const runtime = "edge";

const app = new Hono()
  .basePath("/api")
  .route("/accounts", accounts)
  .route("/categories", categories);
// Define the main application route

export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);

export type AppType = typeof app;
