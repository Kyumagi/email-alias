import * as schema from "@/app/db/schema";

import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import { env } from "@/app/env";

export const client = createClient({
  url: env.DATABASE_URL!,
  authToken: env.DB_AUTH_TOKEN!,
});

export const db = drizzle(client, { schema });
