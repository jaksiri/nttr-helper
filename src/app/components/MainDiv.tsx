import React from "react";

export default function MainDiv({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex flex-col p-4 w-full overflow-x-hidden">
      {children}
    </main>
  );
}
