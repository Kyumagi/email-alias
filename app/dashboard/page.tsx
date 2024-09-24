import { HiEnvelope } from "react-icons/hi2";
import { sarabun, notoSansDisplay } from "@/app/lib/fonts";
import { getUserProfileUseCase } from "@/app/use-cases/users";
import { cache, Suspense } from "react";
import { redirect } from "next/navigation";
import { getCurrentUser } from "../lib/session";
import { UserId } from "@/app/use-cases/types";
import Image from "next/image";
import { FaRegCircleUser } from "react-icons/fa6";
import Link from "next/link";
import AliasesTable from "../ui/AliasesTable";
import AddAliasInput from "@/app/ui/AddAliasInput";
import { getUser } from "@/app/data-access/users";

export const runtime = "edge";
const profilerLoader = cache(getUserProfileUseCase);

export default async function Dashboard() {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    redirect("/");
  }

  const user = await getUser(currentUser.id);
  const userEmail = user?.email;

  return (
    <>
      <header
        className={`flex h-12 items-center justify-between px-6 ${sarabun.className}`}
      >
        {/* Logo */}
        <a href="/" className="flex items-center text-2xl">
          <HiEnvelope className="me-1" />
          <p className="mb-1 snap-start font-bold">Email Alias</p>
        </a>

        {/* User */}
        <Suspense fallback={"Profile loading..."}>
          <UserProfile userId={currentUser.id} />
        </Suspense>
      </header>

      {/* Main */}
      <main className={`mx-auto mt-10 w-4/5 ${notoSansDisplay.className}`}>
        <div className="mb-10 flex flex-col md:flex-row md:justify-between">
          <h2 className="text-4xl">My aliases</h2>
          <div className="mt-5 flex items-center justify-center md:mt-0">
            <AddAliasInput userEmail={userEmail as string} />
          </div>
        </div>

        {/* Aliases table */}
        <Suspense fallback={"Aliases table loading..."}>
          <AliasesTable userEmail={userEmail as string} />
        </Suspense>
      </main>
    </>
  );
}

async function UserProfile({ userId }: { userId: UserId }) {
  const profile = await profilerLoader(userId);

  return (
    <div className="mt-2 flex items-center justify-center gap-2">
      <div className="relative flex flex-col justify-center">
        <p className="text-lg font-bold">{profile.displayName}</p>
        <Link href="/api/sign-out" className="text-sm text-red-600 underline">
          Sign out
        </Link>
      </div>
      {profile.image ? (
        <div className="image-border rounded-full">
          <Image
            src={profile.image}
            alt="profile image"
            width={36}
            height={36}
          />
        </div>
      ) : (
        FaRegCircleUser({ size: 36 })
      )}
    </div>
  );
}
