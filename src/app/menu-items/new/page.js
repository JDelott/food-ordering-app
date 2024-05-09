// "use client";
// import { useProfile } from "@/components/UseProfile";
// import { useState } from "react";
// import UserTabs from "@/components/layout/UserTabs";
// import MenuItemForm from "@/components/layout/MenuItemForm";
// import EditableImage from "@/components/layout/EditableImage";
// import Link from "next/link";
// import Left from "@/components/icons/Left";
// import { toast } from "react-hot-toast";
// import { redirect } from "next/navigation";

// export default function NewMenuItemPage() {
//   const [redirectToItems, setRedirectToItems] = useState(false);
//   const { loading, data } = useProfile();

//   async function handleFormSubmit(ev, data) {
//     ev.preventDefault();
//     const savingPromise = new Promise(async (resolve, reject) => {
//       const response = fetch("/api/menu-items", {
//         method: "POST",
//         body: JSON.stringify(data),
//         headers: { "Content-Type": "application/json" },
//       });
//       if (response.ok) resolve();
//       else reject();
//     });
//     await toast.promise(savingPromise, {
//       loading: "Saving this tasty item",
//       success: "Saved",
//       error: "Error",
//     });

//     setRedirectToItems(true);
//   }

//   if (redirectToItems) {
//     return redirect("/menu-items");
//   }

//   if (loading) {
//     return "Loading user info...";
//   }

//   if (!data.admin) {
//     return "Not an admin.";
//   }

//   return (
//     <section className="mt-8">
//       <UserTabs isAdmin={true} />
//       <div className="max-w-md mx-auto mt-8">
//         <Link href={"/menu-items"} className="button">
//           <Left />
//           <span>Show all menu items</span>
//         </Link>
//       </div>
//       <MenuItemForm menuItem={null} onSubmit={handleFormSubmit} />
//     </section>
//   );
// }

"use client";
import { useProfile } from "@/components/UseProfile";
import { useState } from "react";
import UserTabs from "@/components/layout/UserTabs";
import MenuItemForm from "@/components/layout/MenuItemForm";
import EditableImage from "@/components/layout/EditableImage";
import Link from "next/link";
import Left from "@/components/icons/Left";
import { toast } from "react-hot-toast";
import { redirect } from "next/navigation";

export default function NewMenuItemPage() {
  const [redirectToItems, setRedirectToItems] = useState(false);
  const { loading, data } = useProfile();

  async function handleFormSubmit(ev, data) {
    ev.preventDefault();

    // Ensure category field is not empty
    if (!data.category) {
      toast.error("Please select a category for the menu item.");
      return;
    }

    try {
      const response = await fetch("/api/menu-items", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error("Failed to save the menu item.");
      }

      toast.success("Menu item saved successfully.");
      setRedirectToItems(true);
    } catch (error) {
      console.error("Error saving menu item:", error);
      toast.error("Failed to save menu item. Please try again later.");
    }
  }

  if (redirectToItems) {
    return redirect("/menu-items");
  }

  if (loading) {
    return "Loading user info...";
  }

  if (!data.admin) {
    return "Not an admin.";
  }

  return (
    <section className="mt-8">
      <UserTabs isAdmin={true} />
      <div className="max-w-lg mx-auto mt-8">
        <Link href={"/menu-items"} className="button">
          <Left />
          <span>Show all menu items</span>
        </Link>
      </div>
      <MenuItemForm menuItem={null} onSubmit={handleFormSubmit} />
    </section>
  );
}
