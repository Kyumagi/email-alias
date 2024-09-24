"use server";

import { addAlias } from "../api/cloudflare";

export default async function submitAlias(alias: string, original: string) {
  "use server";

  let message;

  // Check if alias is in valid format
  if (!isValidAlias(alias)) {
    message =
      "Alias must start with a letter and contain only letters and numbers";
    return { message: message, status: 0 };
  }

  // Check if user input is more than 3 characters long
  if (alias.split("@")[0].length < 3) {
    message = "Alias must be at least 3 characters long";
    return { message: message, status: 0 };
  }

  const res = await addAlias(original, alias);
  return { message: res.message, status: res.status };
}

function isValidAlias(alias: string): boolean {
  // Check if alias starts with a letter and contains only letters and numbers
  const regex = /^[a-zA-Z][a-zA-Z0-9]*$/;
  return regex.test(alias.split("@")[0]);
}
