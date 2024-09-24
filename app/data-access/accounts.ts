import { db } from "@/app/db";
import { accounts } from "@/app/db/schema";
import { UserId } from "@/app/use-cases/types";
import { eq } from "drizzle-orm";

export async function createAccountViaGoogle(userId: UserId, googleId: string) {
  await db
    .insert(accounts)
    .values({
      userId: userId,
      accountType: "google",
      googleId,
    })
    .onConflictDoNothing()
    .returning();
}

export async function getAccountByGoogleId(googleId: string) {
  return await db.query.accounts.findFirst({
    where: eq(accounts.googleId, googleId),
  });
}
