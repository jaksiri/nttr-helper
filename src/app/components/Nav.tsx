import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

function Nav() {
  return (
    <nav className="w-full flex flex-row items-center justify-end px-6 py-2 bg-background">
      <ul className="flex flex-row gap-6 items-center">
        <li>
          <Link href="/">
            <Button variant="ghost">Home</Button>
          </Link>
        </li>
        <li>
          <Link href="/login">
            <Button>Login</Button>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
