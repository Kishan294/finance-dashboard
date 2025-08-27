import { db } from "@/database/drizzle";
import { userSettings, insertUserSettingsSchema } from "@/database/schema";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { eq } from "drizzle-orm";
import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { createId } from "@paralleldrive/cuid2";
import { z } from "zod/v4";

const updateUserSettingsSchema = z.object({
  currency: z.string().optional(),
  dateFormat: z.string().optional(),
  fiscalYear: z.string().optional(),
  theme: z.string().optional(),
  chartStyle: z.string().optional(),
  notificationTransactions: z.number().min(0).max(1).optional(),
  notificationBudgets: z.number().min(0).max(1).optional(),
  notificationReports: z.number().min(0).max(1).optional(),
  twoFactorEnabled: z.number().min(0).max(1).optional(),
});

const app = new Hono()
  .get("/", clerkMiddleware(), async (c) => {
    const auth = getAuth(c);

    if (!auth?.userId) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    let [settings] = await db
      .select()
      .from(userSettings)
      .where(eq(userSettings.userId, auth.userId));

    // Create default settings if they don't exist
    if (!settings) {
      [settings] = await db
        .insert(userSettings)
        .values({
          id: createId(),
          userId: auth.userId,
        })
        .returning();
    }

    return c.json({ data: settings });
  })
  .patch(
    "/",
    clerkMiddleware(),
    zValidator("json", updateUserSettingsSchema),
    async (c) => {
      const auth = getAuth(c);
      const values = c.req.valid("json");

      if (!auth?.userId) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      // Check if settings exist
      const [existingSettings] = await db
        .select()
        .from(userSettings)
        .where(eq(userSettings.userId, auth.userId));

      let data;

      if (existingSettings) {
        // Update existing settings
        [data] = await db
          .update(userSettings)
          .set({
            ...values,
            updatedAt: new Date(),
          })
          .where(eq(userSettings.userId, auth.userId))
          .returning();
      } else {
        // Create new settings with provided values
        [data] = await db
          .insert(userSettings)
          .values({
            id: createId(),
            userId: auth.userId,
            ...values,
          })
          .returning();
      }

      return c.json({ data });
    },
  );

export default app;
