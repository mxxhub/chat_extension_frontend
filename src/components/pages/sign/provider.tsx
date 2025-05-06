import { PrivyProvider } from "@privy-io/react-auth";
import { ReactNode } from "react";
import config from "../../../../config/config.json";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <PrivyProvider
      appId={config.privyId}
      config={{
        loginMethods: ["twitter", "google"],
        appearance: {
          accentColor: "#6A6FF5",
          theme: "dark",
          showWalletLoginFirst: false,
          logo: "https://auth.privy.io/logos/privy-logo-dark.png",
          walletChainType: "ethereum-and-solana",
          walletList: ["detected_wallets", "metamask", "phantom"],
        },
        embeddedWallets: {
          requireUserPasswordOnCreate: false,
          showWalletUIs: true,
          ethereum: {
            createOnLogin: "users-without-wallets",
          },
          solana: {
            createOnLogin: "users-without-wallets",
          },
        },
      }}
    >
      {children}
    </PrivyProvider>
  );
}
