"use client";
import { deleteGameAction } from "@/app/action";
import React from "react";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/use-toast";
import { cookies } from "next/headers";

function DeleteGame({ gameId }: { gameId: string }) {
  const router = useRouter();

  async function deleteGame() {
    localStorage.removeItem("nttr-weeks-" + gameId);
    localStorage.removeItem("nttr-tasks-" + gameId);
    await deleteGameAction(gameId).catch((err) => {
      console.log(err);
      toast({
        title: "Error",
        description: err.message,
        variant: "destructive",
      });
      router.push("/dashboard");
    });
  }

  return (
    <span className="text-red-600 underline" onClick={deleteGame}>
      Delete Game
    </span>
  );
}

export default DeleteGame;
