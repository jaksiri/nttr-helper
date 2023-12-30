import { buttonVariants } from "@/components/ui/button";
import db from "@/db";
import { cookies } from "next/headers";
import Link from "next/link";
import React from "react";
import Logout from "./Logout";

async function Nav() {
  const isLoggedlIn = await db.isAuthenticated(cookies());

  return (
    <nav className="w-full flex flex-row items-center justify-end px-6 py-2 bg-background border-b">
      <ul className="flex flex-row gap-6 items-center">
        <li>
          <Link
            href={isLoggedlIn ? "/dashboard" : "/"}
            className={buttonVariants({ variant: "ghost" })}
          >
            {isLoggedlIn ? "Dashboard" : "Home"}
          </Link>
        </li>
        <li>
          {isLoggedlIn ? (
            <Logout />
          ) : (
            <Link href="/login" className={buttonVariants()}>
              Login
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
