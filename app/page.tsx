import { sarabun } from "@/app/lib/fonts";
import Link from "next/link";
import { HiEnvelope } from "react-icons/hi2";
import { FaGoogle } from "react-icons/fa6";
import { getCurrentUser } from "@/app/lib/session";
import { redirect } from "next/navigation";

export default async function Home() {
  const user = await getCurrentUser();

  if (user) {
    redirect("/dashboard");
  }

  return (
    <>
      <header className="flex h-12 items-center justify-between px-6 text-2xl">
        {/* Logo */}
        <a href="/" className="flex items-center">
          <HiEnvelope className="me-1" />
          <p className={`mb-1 snap-start font-bold ${sarabun.className}`}>
            Email Alias
          </p>
        </a>
      </header>

      {/* Main */}
      <main className="mx-auto w-4/5 md:w-2/3">
        {/* Hero */}
        <div className="mt-20 text-center">
          <h2
            className={`${sarabun.className} text-pretty text-4xl font-extrabold leading-tight tracking-wide md:text-5xl`}
          >
            Protect and simplify your inbox with
            <span className="text-indigo-700"> Email Alias</span>
          </h2>
          <p
            className={`${sarabun.className} mt-5 text-2xl font-medium text-gray-600 md:text-3xl`}
          >
            Up to 20 email aliases for each account.
          </p>
        </div>

        {/* Google Sign in */}
        <div className="flex justify-center">
          <Link
            href="/api/login/google"
            role="button"
            className="raised mt-10 flex max-w-fit items-center justify-center rounded-lg bg-indigo-600 px-4 py-3 text-white"
          >
            <FaGoogle />
            <span className="ml-2">Sign in with Google</span>
          </Link>
        </div>
      </main>
    </>
  );
}
