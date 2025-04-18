import { Card, CardContent } from "../../../components/ui/card";

export default function FirstPage() {
  return (
    <div className="min-h-screen bg-[#0d0d0d] flex items-center justify-center text-white">
      <Card className="bg-[#1a1a1a] border border-[#2a2a2a] shadow-lg rounded-2xl w-full max-w-sm">
        <CardContent className="p-8">
          <h2 className="text-2xl font-bold mb-6 text-center text-white">
            Signup to have a chat in this channel
          </h2>

          <div className="flex items-center gap-2 mb-6">
            <div className="flex-grow h-px bg-[#333]" />
            <span className="text-xs text-gray-500">or</span>
            <div className="flex-grow h-px bg-[#333]" />
          </div>
          <div className="text-center mt-4 text-sm text-white">
            We need to change this page
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
