"use client";

import { PrivyProvider } from "@privy-io/react-auth";
import { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <PrivyProvider
      appId="cm9k8w2gv00jzjr0nldhn54sd"
      config={{
        loginMethods: ["wallet", "twitter", "google"],
        appearance: {
          theme: "dark",
        },
        embeddedWallets: { createOnLogin: "users-without-wallets" },
      }}
    >
      {children}
    </PrivyProvider>
  );
}
