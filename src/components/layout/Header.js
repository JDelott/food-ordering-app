"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useContext } from "react";
import { CartContext } from "../AppContext";
import ShoppingCart from "@/components/icons/ShoppingCart";
import Bars2 from "@/components/icons/Bars2";

export default function Header() {
  const session = useSession();
  const status = session?.status;
  console.log(session);
  const userData = session.data?.user;
  let userName = userData?.name || userData?.email;
  const { cartProducts } = useContext(CartContext);
  if (userName && userName.includes(" ")) {
    userName = userName.split(" ")[0];
  }

  return (
    <header>
      <div className="flex items-center md:hidden justify-between">
        <Link className="text-primary font-semibold text-2x1" href="/">
          ST PIZZA
        </Link>
        <div className="flex gap-8 items-center">
          <Link href={"/cart"} className="relative">
            <ShoppingCart />
            {cartProducts?.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary text-white text-sm p-1 px-1 rounded-full leading-3">
                {cartProducts.length}
              </span>
            )}
          </Link>
          <button className="p-1">
            <Bars2 />
          </button>
        </div>
      </div>
      <div className="hidden md:flex items-center justify-between">
        <nav
          className="flex items-center gap-4 text-gray-500 
      font-semibold"
        >
          <Link className="text-primary font-semibold text-2x1" href="/">
            ST PIZZA
          </Link>
          <Link href={"/"}>Home</Link>
          <Link href={"/menu"}>Menu</Link>
          <Link href={"/#about"}>About</Link>
          <Link href={"/#contact"}>Contact</Link>
        </nav>
        <nav className="flex items-center gap-4  text-gray-500 font-semibold">
          {status === "authenticated" && (
            <>
              <Link href={"/profile"} className="whitespace-nowrap">
                Hello, {userName}
              </Link>
              <button
                onClick={() => signOut()}
                className="bg-primary rounded-full 
              text-white px-8 py-2"
              >
                Logout
              </button>
            </>
          )}
          {status !== "authenticated" && (
            <>
              <Link href={"/login"}>Login</Link>
              <Link
                href={"/register"}
                className="bg-primary rounded-full 
          text-white px-8 py-2"
              >
                Register
              </Link>
            </>
          )}

          <Link href={"/cart"} className="relative">
            <ShoppingCart />
            {cartProducts?.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary text-white text-sm p-1 px-1 rounded-full leading-3">
                {cartProducts.length}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
}
