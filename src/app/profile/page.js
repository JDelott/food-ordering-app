"use client";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Image from "next/image";
export default function ProfilePage() {
  const session = useSession();
  console.log(session);
  const { status } = session;

  if (status === "loading") {
    return "loading...";
  }

  if (status === "unauthenticated") {
    return redirect("/login");
  }

  const userImage = session.data.user.image;

  return (
    <section className="mt-8">
      <h1 className="text-center text-primary text-4xl mb-4">Profile</h1>
      <form className="max-w-xs mx-auto border">
        <div>
          <Image src={userImage} width={64} height={64} alt={"avatar"} />
        </div>
      </form>
    </section>
  );
}
