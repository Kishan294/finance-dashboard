import { Hono } from "hono";
import { handle } from "hono/vercel";
import accounts from "./accounts";
import categories from "./categories";
import transactions from "./transactions";
import userSettings from "./user-settings";
import { logger } from "hono/logger";
import summary from "./summary";

export const runtime = "edge";

const app = new Hono()
  .basePath("/api")
  .use(logger())
  .route("/accounts", accounts)
  .route("/categories", categories)
  .route("/transactions", transactions)
  .route("/user-settings", userSettings)
  .route("/summary", summary);
// Define the main application route

export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);

export type AppType = typeof app;
