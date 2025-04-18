import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { X } from "lucide-react";

interface SettingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SettingModal = ({ isOpen, onClose }: SettingModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <Card className="bg-[#1a1a1a] border border-[#2a2a2a] shadow-lg rounded-2xl w-full max-w-sm relative mx-4">
        <CardContent className="p-8">
          {/* Close button */}
          <button
            aria-label="Close"
            className="absolute top-4 right-4 text-white hover:text-gray-300"
            onClick={onClose}
          >
            <X className="w-5 h-5" />
          </button>

          <h2 className="text-2xl font-bold mb-6 text-center text-white">
            Settings
          </h2>

          <div className="flex flex-col gap-3 mb-6">
            <Button className="bg-[#1DA1F2] hover:bg-[#0d8ddf] text-white w-full">
              Save
            </Button>
          </div>

          <div className="flex items-center gap-2 mb-6">
            <div className="flex-grow h-px bg-[#333]" />
            <span className="text-xs text-gray-500">or</span>
            <div className="flex-grow h-px bg-[#333]" />
          </div>

          <div className="text-center mt-4 text-sm text-white">
            Change this modal as you want.
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
