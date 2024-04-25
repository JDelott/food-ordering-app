"use client";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";
import InfoBox from "@/components/layout/InfoBox";
import SuccessBox from "@/components/layout/SuccessBox";
import toast from "react-hot-toast";

export default function ProfilePage() {
  const session = useSession();
  const [userName, setUserName] = useState("");
  const [image, setImage] = useState("");

  const { status } = session;

  useEffect(() => {
    if (status === "authenticated") {
      setUserName(session.data.user.name);
      setImage(session.data.user.image);
    }
  }, [session, status]);

  async function handleProfileInfoUpdate(ev) {
    ev.preventDefault();
    const savingPromise = new Promise(async (resolve, reject) => {
      const response = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: userName, image }),
      });
      if (response.ok) {
        resolve();
      } else reject();
    });

    await toast.promise(savingPromise, {
      loading: "Saving...",
      success: "Profile saved!",
      error: "Error",
    });
  }

  async function handleFileChange(ev) {
    const files = ev.target.files;
    if (files?.length === 1) {
      const data = new FormData();
      data.set("file", files[0]);

      const uploadPromise = new Promise(async (resolve, reject) => {
        const response = await fetch("/api/upload", {
          method: "POST",
          body: data,
        });
        if (response.ok) {
          const link = await response.json();
          setImage(link);
          resolve();
        } else {
          reject();
        }
      });
      await toast.promise(uploadPromise, {
        loading: "Uploading...",
        success: "Upload complete",
        error: "Upload error",
      });
    }
  }
  if (status === "loading") {
    return "loading...";
  }

  if (status === "unauthenticated") {
    return redirect("/login");
  }

  return (
    <section className="mt-8">
      <h1 className="text-center text-primary text-4xl mb-4">Profile</h1>
      <div className="max-w-md mx-auto">
        {/* {<SuccessBox>Profile Saved!</SuccessBox>}
        {<InfoBox>Saving...</InfoBox>} */}

        <div className="flex gap-4 items-center">
          <div>
            <div className="p-2 rounded-lg relative">
              {image && (
                <Image
                  className="rounded-lg w-20 h-20 mb-1"
                  src={image}
                  alt={"avatar"}
                  width={450}
                  height={450}
                />
              )}

              <label>
                <input
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                />
                <span
                  className="block border border-gray-300 rounded-lg p-2 
                 text-center cursor-pointer"
                >
                  Edit
                </span>
              </label>
            </div>
          </div>
          <form className="grow" onSubmit={handleProfileInfoUpdate}>
            <input
              type="text"
              placeholder="First and Last name"
              value={userName}
              onChange={(ev) => setUserName(ev.target.value)}
            />
            <input
              type="text"
              disabled={true}
              placeholder={session.data.user.email}
            />
            <button type="submit">Save</button>
          </form>
        </div>
      </div>
    </section>
  );
}
