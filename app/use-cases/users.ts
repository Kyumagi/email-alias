import { createUser, getUserByEmail } from "@/app/data-access/users";
import { UserId } from "@/app/use-cases/types";
import { createAccountViaGoogle } from "@/app/data-access/accounts";
import { createProfile, getProfile } from "@/app/data-access/profiles";
import { GoogleUser } from "@/app/api/login/google/callback/route";
import { NotFoundError } from "@/app/use-cases/errors";

export async function getUserProfileUseCase(userId: UserId) {
  const profile = await getProfile(userId);

  if (!profile) {
    throw new NotFoundError();
  }

  return profile;
}

export async function createGoogleUserUseCase(googleUser: GoogleUser) {
  let existingUser = await getUserByEmail(googleUser.email);

  if (!existingUser) {
    existingUser = await createUser(googleUser.email);
  }

  await createAccountViaGoogle(existingUser.id, googleUser.sub);

  await createProfile(existingUser.id, googleUser.name, googleUser.picture);

  return existingUser.id;
}
