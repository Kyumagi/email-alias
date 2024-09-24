"use server";
import { env } from "@/app/env";

const cfWorkerHostname = env.CF_WORKER_HOSTNAME;
const cfDBToken = env.CF_DB_TOKEN;

interface Alias {
  alias: string;
}

export interface FetchAliasesResult {
  status: 0 | 1;
  aliases: Alias[];
}

export async function getAllAliasesByEmail(
  email: string,
): Promise<FetchAliasesResult> {
  "use server";
  const res = await fetch(
    `${cfWorkerHostname}/?token=${cfDBToken}&action=fetchall&original=${email}`,
  );
  const data = await res.json();
  return data;
}

export async function addAlias(email: string, alias: string) {
  "use server";
  const res = await fetch(
    `${cfWorkerHostname}/?token=${cfDBToken}&action=add&original=${email}&alias=${alias}`,
  );
  const data = await res.json();
  return data;
}

export async function deleteAlias(alias: string) {
  "use server";
  const res = await fetch(
    `${cfWorkerHostname}/?token=${cfDBToken}&action=delete&alias=${alias}`,
  );
  const data = await res.json();
  return data;
}
