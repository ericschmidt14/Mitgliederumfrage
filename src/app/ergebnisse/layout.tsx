"use client";
import { SessionProvider } from "next-auth/react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <main className="flex flex-col justify-between w-full overflow-x-hidden">
        {children}
      </main>
    </SessionProvider>
  );
}
