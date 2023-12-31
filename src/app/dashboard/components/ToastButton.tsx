"use client";
import { Button } from "@/components/ui/button";
import React from "react";
import { useToast } from "@/components/ui/use-toast";

function ToastButton() {
  const { toast } = useToast();
  return (
    <Button
      onClick={() => {
        toast({
          title: "Toaasterrrr",
          description: "This toast is called",
        });
      }}
    >
      Open Toast
    </Button>
  );
}

export default ToastButton;
