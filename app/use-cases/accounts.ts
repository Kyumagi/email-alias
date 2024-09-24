import { getAccountByGoogleId } from "@/app/data-access/accounts";

export async function getAccountByGoogleIdUseCase(googleId: string) {
  return await getAccountByGoogleId(googleId);
}
