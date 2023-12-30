"use client";
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
    } catch (e) {
      setError("Failed to log out");
    }
  }

  return (
    <div>
      <button
        onClick={onLogout}
        className="text-red-600 px-3 py-1 rounded border border-red-600"
      >
        Logout
      </button>
      {error ? <p className="text-red-600">{error}</p> : null}
    </div>
  );
}

export default Logout;
