"use client";
import { SessionProvider } from "next-auth/react";

import React from "react";

function Provider({ children }: { children: React.ReactNode }) {
//   const session = await auth();
  return (
    <SessionProvider >
      {children}
    </SessionProvider>
  );
}

export default Provider;