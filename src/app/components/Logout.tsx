"use client";
import { Button } from "@/components/ui/button";
import { deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useState } from "react";

function Logout() {
  const router = useRouter();
  const [error, setError] = useState("");

  async function onLogout() {
    try {
      deleteCookie("pb_auth");
      localStorage.clear();
      router.push("/");
      router.refresh();
    } catch (e) {
      setError("Failed to log out");
    }
  }

  return (
    <Button
      variant="outline"
      onClick={onLogout}
      className="text-red-600 px-3 py-1 rounded border border-red-600"
    >
      Logout
    </Button>
  );
}

export default Logout;
