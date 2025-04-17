"use client";

import React, { useState } from "react";
import { useLogin, usePrivy, useLogout } from "@privy-io/react-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { toShortAddress } from "../../utils/utils";
import { Copy, Check } from "lucide-react";

export default function SignupPage() {
  const [copy, setCopy] = useState(false);
  const [tokenAdd, setTokenAdd] = useState("");
  const { login } = useLogin();
  const { logout } = useLogout();
  const { ready, authenticated, user } = usePrivy();

  const signupWithTwitter = async () => {
    if (!ready) return console.log("Waiting for Privy to be ready...");
    try {
      await login();
      if (authenticated && user) {
        await logout();
        console.log("User signed up with Twitter");
        console.log("Username:", user.twitter?.username);
        console.log("Wallet address:", user.wallet?.address);
      }
    } catch (err) {
      console.log("Signup failed: ", err);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(tokenAdd);
      setCopy(true);
      setTimeout(() => {
        setCopy(false);
      }, 2000);
    } catch (err) {
      console.log("Copy failed: ", err);
    }
  };

  return (
    <div className="min-h-screen bg-[#0d0d0d] flex items-center justify-center text-white">
      <Card className="bg-[#1a1a1a] border border-[#2a2a2a] shadow-lg rounded-2xl w-full max-w-sm">
        <CardContent className="p-8">
          <h2 className="text-2xl font-bold mb-6 text-center text-white">
            Welcome to memecoin Channel!
          </h2>

          <div className="flex flex-col gap-3 mb-6">
            <Button className="bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 hover:opacity-90 transition">
              Sign up with Twitter
            </Button>
          </div>

          <div className="flex items-center gap-2 mb-6">
            <div className="flex-grow h-px bg-[#333]" />
            <span className="text-xs text-gray-500">Token Info</span>
            <div className="flex-grow h-px bg-[#333]" />
          </div>

          <form className="flex flex-col gap-4 text-white">
            <div className="">
              <span>Token Name</span>
              <div className="border border-[#3a3a3a] p-3 rounded-md">
                My Token
              </div>
            </div>
            <div>
              <span>Toekn Address</span>
              <div className="border border-[#3a3a3a] p-3 rounded-md flex relative">
                {toShortAddress("0xDd0892a70aB28B2B3fac1E6FAa7a4B2121dDd5e4")}
                <span>
                  {copy ? (
                    <Check size={14} className="mt-1 absolute right-3" />
                  ) : (
                    <Copy
                      size={14}
                      className="mt-1 absolute right-3 cursor-pointer"
                      onClick={handleCopy}
                    />
                  )}
                </span>
              </div>
            </div>
            <div>
              <span>Total Supply</span>
              <div className="border border-[#3a3a3a] p-3 rounded-md">
                10,000,000
              </div>
            </div>
          </form>

          <div className="text-center mt-4 text-sm text-white">
            Sign up now to join the conversation in this channel!
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
