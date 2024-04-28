"use client";
import UserTabs from "@/components/layout/UserTabs";
import { useState, useEffect } from "react";

export default function CategoriesPage() {
  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    fetch("/api/profile").then((resoponse) => {
      Response.json().then((data) => {
        setIsAdmin(data.admin);
      });
    });
  }, []);

  if (!isAdmin) {
    return "Not an admin";
  }

  return (
    <section className="mt-8 max-w-lg mx-auto">
      <UserTabs isAdmin={false} />
      categories
    </section>
  );
}
