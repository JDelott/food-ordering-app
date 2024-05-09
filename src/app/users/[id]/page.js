"use client";
import { useProfile } from "@/components/UseProfile";

import UserTabs from "@/components/layout/UserTabs";

export default function EditUserPage() {
  const { loading, data } = useProfile();

  if (loading) {
    return "Loading user profile...";
  }

  if (!data.admin) {
    return "Not an admin";
  }

  return (
    <section className="mt-8 mx-auto max-2-2xl">
      <UserTabs isAdmin={true} />
      <div className="mt-8">user info form</div>
    </section>
  );
}
