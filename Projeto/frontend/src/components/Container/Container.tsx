import React from "react";
import "./index.css";

export default function Container({ children }: { children: React.ReactNode }) {
  return (
    <main className="container max-w-7xl p-4 min-h-[100vh]">{children}</main>
  );
}
