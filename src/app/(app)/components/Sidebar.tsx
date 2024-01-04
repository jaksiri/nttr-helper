"use client";
import React, { useEffect, useState } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import StartNewGame from "./StartNewGame";
import { cn } from "@/lib/utils";

type SidebarItem = {
  name: string;
  buttonVariant:
    | "ghost"
    | "link"
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | null
    | undefined;
  path: string;
};

const sideBarItems: Array<SidebarItem> = [
  {
    name: "Dashboard",
    buttonVariant: "ghost",
    path: "/dashboard",
  },
  {
    name: "Temporary Link",
    buttonVariant: "ghost",
    path: "/",
  },
];

function Sidebar() {
  const currentPath = usePathname();
  const [isOpened, setIsOpened] = useState(true);
  const [hiddenStateClass, setHiddenStateClass] = useState("");

  useEffect(() => {
    if (currentPath !== "/dashboard") {
      setIsOpened(false);
    } else {
      setIsOpened(true);
    }
  }, [currentPath]);

  useEffect(() => {
    if (isOpened) {
      setHiddenStateClass("");
    } else {
      setTimeout(() => {
        setHiddenStateClass("hidden");
      }, 300);
    }
  }, [isOpened]);

  return (
    <div
      className={cn(
        "px-6 py-4 border-r h-full md:min-w-[200px] transition-transform duration-300 z-10 bg-white",
        isOpened
          ? " translate-x-0"
          : "-translate-x-full absolute top-15 left-0",
        hiddenStateClass
      )}
    >
      <ul className="flex flex-col gap-4 w-full">
        <li>
          <StartNewGame />
        </li>
        {sideBarItems.map((item) => (
          <li key={item.name}>
            <Link
              href={item.path}
              className={cn(
                buttonVariants({ variant: item.buttonVariant }),
                "w-full",
                currentPath === item.path ? "bg-secondary" : ""
              )}
            >
              {" "}
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
