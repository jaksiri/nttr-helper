import React from "react";

export default function MainDiv({ children }: { children: React.ReactNode }) {
  return <main className="p-4 w-full">{children}</main>;
}
