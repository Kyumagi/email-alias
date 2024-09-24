import { db } from "@/app/db";
import { sessions } from "@/app/db/schema";
import { UserId } from "@/app/use-cases/types";
import { eq } from "drizzle-orm";

export async function deleteSessionForUser(userId: UserId) {
  await db.delete(sessions).where(eq(sessions.userId, userId));
}
