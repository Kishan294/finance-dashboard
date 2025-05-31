import { Hono } from "hono";
import { handle } from "hono/vercel";
import accounts from "./accounts";
import { HTTPException } from "hono/http-exception";

export const runtime = "edge";

const app = new Hono().basePath("/api").route("/accounts", accounts);
// Define the main application route

app.onError((err, c) => {
  if (err instanceof HTTPException) {
    return err.getResponse();
  }

  return c.json({
    error: "Internal Server Error",
  });
});

export const GET = handle(app);
export const POST = handle(app);

export type AppType = typeof app;
