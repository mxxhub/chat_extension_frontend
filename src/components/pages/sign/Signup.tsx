import { useLogin, usePrivy, useLogout } from "@privy-io/react-auth";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Card, CardContent } from "../../../components/ui/card";

export default function SignupPage() {
  const { login } = useLogin();
  const { logout } = useLogout();
  const { ready, authenticated, user } = usePrivy();
  console.log("authenticated: ", authenticated);
  console.log("user: ", user);

  const signupWithTwitter = async () => {
    if (!ready) return console.log("Waiting for Privy to be ready...");
    try {
      console.log("react");
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
  return (
    <div className="min-h-screen bg-[#0d0d0d] flex items-center justify-center text-white">
      <Card className="bg-[#1a1a1a] border border-[#2a2a2a] shadow-lg rounded-2xl w-full max-w-sm">
        <CardContent className="p-8">
          <h2 className="text-2xl font-bold mb-6 text-center text-white">
            Create Your Account
          </h2>

          <div className="flex flex-col gap-3 mb-6">
            <Button
              className="bg-[#1DA1F2] hover:bg-[#0d8ddf] text-white w-full"
              onClick={signupWithTwitter}
            >
              Sign up with Twitter
            </Button>
          </div>

          <div className="flex items-center gap-2 mb-6">
            <div className="flex-grow h-px bg-[#333]" />
            <span className="text-xs text-gray-500">or</span>
            <div className="flex-grow h-px bg-[#333]" />
          </div>

          <form className="flex flex-col gap-4">
            <Input
              placeholder="Username"
              className="bg-[#2a2a2a] text-white border border-[#3a3a3a]"
            />
            <Input
              type="email"
              placeholder="Email"
              className="bg-[#2a2a2a] text-white border border-[#3a3a3a]"
            />
            <Input
              type="password"
              placeholder="Password"
              className="bg-[#2a2a2a] text-white border border-[#3a3a3a]"
            />
            <Button className="bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 hover:opacity-90 transition">
              Create Account
            </Button>
          </form>

          <div className="text-center mt-4 text-sm text-white">
            Already have an account?{" "}
            <a href="#" className="text-blue-400 hover:text-blue-600">
              Sign In
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
