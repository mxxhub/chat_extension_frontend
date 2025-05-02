import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import {
  CirclePlus,
  ExternalLinkIcon,
  HandCoins,
  HeartIcon,
  ImagePlus,
  LogOut,
  MessageCircleIcon,
  Play,
  RepeatIcon,
  Smile,
  ThumbsUp,
  TicketCheck,
  X,
} from "lucide-react";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import { Separator } from "../../ui/separator";
import { Input } from "../../ui/input";
import { Card, CardContent } from "../../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import ProfileCard from "../../ui/profileCard";
import { ChattingHistory } from "../../ui/chatting";
import { RootState } from "../../../redux/store";

type ChatContainerProps = {
  messages: Message[];
  typingStatus: boolean;
  handleJoinChannel: () => void;
  handleLeaveChannel: () => void;
  joinStatus: boolean;
  handlePlusBtn: () => void;
  sendMsgHandle: (msg: string, textToCopy: string) => void;
  textToCopy: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const ChatContainer = ({
  messages,
  typingStatus,
  handleJoinChannel,
  handleLeaveChannel,
  joinStatus,
  handlePlusBtn,
  sendMsgHandle,
  textToCopy,
  handleInputChange,
}: ChatContainerProps) => {
  const userdata = useSelector((state: RootState) => state.auth.user);
  const scrollRef = useRef<HTMLDivElement>(null);
  const popupRef = useRef<HTMLDivElement | null>(null);
  const MenuItem = ({ Icon, text, onClick }: MenuItemProps) => {
    return (
      <div
        className="flex items-center px-4 py-2 text-sm text-white hover:bg-[#373b49] cursor-pointer"
        onClick={onClick}
      >
        <Icon className="mr-3 size-4" />
        <span>{text}</span>
      </div>
    );
  };
  const [xRaid, setXRaid] = useState<boolean>(false);
  const [plusBtn, setPlusBtn] = useState<boolean>(false);
  const [msg, setMsg] = useState<string>("");
  const [showPicker, setShowPicker] = useState<boolean>(false);
  const [userProfile, setUserProfile] = useState<boolean>(false);
  const [tweetLink, setTweetLink] = useState<string>("");

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  const handleEmojiSelect = (emoji: any) => {
    setMsg((prevMsg) => prevMsg + emoji.native);
    setShowPicker(false);
  };

  const handleFileChange = () => {
    setPlusBtn(false);
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".png,.jpg,.jpeg";
    input.onchange = (event: Event) => {
      const target = event.target as HTMLInputElement;
      if (target.files && target.files.length > 0) {
        const file = target.files[0];
        console.log("Selected file:", file);
      }
    };
    input.click();
  };

  const handleStartRaid = () => {
    setXRaid(!xRaid);
    setPlusBtn(false);
  };

  return (
    <div className="flex-1 flex flex-col overflow-y-auto">
      {/* Banner */}
      <div className="w-full">
        <img
          className="w-full max-h-[129px] object-cover"
          alt="Banner"
          src="/assets/image-1.png"
        />
      </div>

      {/* Twitter/Website tabs */}
      <div className="w-full h-[31px] bg-[#101114] border border-solid border-[#22242d] flex items-center justify-evenly">
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://x.com"
          className="flex items-center"
        >
          <img
            className="w-4 h-3.5"
            alt="Twitter icon"
            src="/assets/vector.svg"
          />
          <span className="ml-1 font-medium text-white text-[13px]">
            Twitter
          </span>
        </a>
        <Separator
          orientation="vertical"
          className="h-[30px] mx-4 bg-[#5B5E69]"
        />
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://dexscreener.com"
          className="flex items-center"
        >
          <ExternalLinkIcon className="w-4 h-4 text-white" />
          <span className="ml-1 font-medium text-white text-[13px]">
            Website
          </span>
        </a>
      </div>

      {/* Chat messages container */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-scroll bg-[#191a21] p-4 w-full"
      >
        {/* Twitter Raid section */}
        <div className="mt-4">
          <div className="flex items-center mb-2">
            <img
              className="w-[13px] h-[11px]"
              alt="Twitter icon"
              src="/assets/vector.svg"
            />
            <span className="ml-2 font-bold text-white text-[13px]">
              Twitter Raid
            </span>
          </div>

          {xRaid && (
            <div className="w-5/6 bg-transparent z-10 items-center justify-center backdrop-blur-2xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-2xl p-5">
              <div className="text-white text-center mb-2">
                Start Twitter Raid
              </div>
              <button
                aria-label="Close"
                className="absolute top-4 right-4 text-white hover:text-gray-300"
                onClick={() => setXRaid(false)}
              >
                <X className="w-5 h-5" />
              </button>
              <Input
                className="w-full self-center placeholder:text-center text-white"
                placeholder="Enter Tweet Link"
                onChange={(e) => setTweetLink(e.target.value)}
                value={tweetLink}
              />
            </div>
          )}

          <Card className="w-full max-w-full bg-[#15202b] rounded-lg border-none">
            <CardContent className="p-4">
              <div className="flex items-start">
                <Avatar className="w-8 h-8">
                  <AvatarImage src="/assets/image-28.png" alt="Andy Ayrey" />
                  <AvatarFallback>AA</AvatarFallback>
                </Avatar>
                <div className="ml-2 flex-1">
                  <div className="font-normal text-white text-[13px]">
                    Andy Ayrey
                    <img
                      className="inline-block w-3.5 h-3.5 ml-1"
                      alt="Verified"
                      src="/assets/image-10.png"
                    />
                    <br />
                    <span className="text-[#5a5d69]">@AndyAyrey</span>
                  </div>
                  <div className="mt-4 font-normal text-white text-[13px]">
                    timeline cleanse
                  </div>
                </div>
                <img
                  className="w-[137px] h-[126px] ml-auto"
                  alt="Tweet image"
                  src="/assets/image-27.png"
                />
              </div>

              {/* Tweet engagement metrics */}
              <div className="flex items-center justify-evenly mt-8">
                <div className="flex items-center">
                  <HeartIcon className="w-4 h-4 text-[red] fill-[red]" />
                  <span className="ml-2 font-normal text-white text-[13px]">
                    597
                  </span>
                </div>
                <Separator
                  orientation="vertical"
                  className="h-[23px] bg-[#5B5E69]"
                />
                <div className="flex items-center">
                  <MessageCircleIcon className="w-4 h-3.5 text-white" />
                  <span className="ml-2 font-normal text-white text-[13px]">
                    64
                  </span>
                </div>
                <Separator
                  orientation="vertical"
                  className="h-[23px] bg-[#5B5E69]"
                />
                <div className="flex items-center">
                  <RepeatIcon className="w-4 h-3.5 text-white" />
                  <span className="ml-2 font-normal text-white text-[13px]">
                    199
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        {/* Chat messages */}
        <div className="space-y-4 w-full break-all relative">
          {userProfile && (
            <ProfileCard
              name={userdata?.displayName || ""}
              username={userdata?.userId || ""}
              avatarUrl={userdata?.avatar || ""}
              mutualServerCount={1}
              promoterTag={true}
            />
          )}
          {messages.map((message: any) => (
            <ChattingHistory
              key={message._id}
              message={message}
              avatarClick={() => {
                setUserProfile(!userProfile);
              }}
            />
          ))}
        </div>
      </div>

      {/* Message input */}
      <div className="max-w-full bg-[#191A21] p-2">
        {typingStatus && (
          <div className="text-white bg-transparent backdrop-blur-sm ml-1">{`${userdata?.displayName} is typing...`}</div>
        )}

        <div className="relative w-full h-[45px] bg-[100%_100%] flex items-center px-3 rounded-md border border-solid border-[#22242d]">
          <CirclePlus
            className="w-5 h-5 text-[#777a8c] cursor-pointer"
            onClick={handlePlusBtn}
          />
          {plusBtn && (
            <div
              ref={popupRef}
              className="absolute bottom-full mb-2 left-0 w-48 bg-[#22242D] rounded-md shadow-lg py-1 z-50"
            >
              <MenuItem
                Icon={ImagePlus}
                text="Add Image"
                onClick={handleFileChange}
              />
              <MenuItem
                Icon={Play}
                text="Start Raid"
                onClick={handleStartRaid}
              />
              <MenuItem Icon={ThumbsUp} text="Top Holders" />
              <MenuItem Icon={TicketCheck} text="Bundle Checker" />
              <MenuItem
                Icon={LogOut}
                text="Leave Channel"
                onClick={handleLeaveChannel}
              />
            </div>
          )}
          {joinStatus ? (
            <Input
              className="border-none bg-transparent text-[#dbd6d6] text-sm h-full focus:outline-none focus:ring-0 focus:border-none focus-visible:ring-0 focus-visible:ring-offset-0"
              placeholder="Write a message..."
              value={msg}
              onChange={(e) => handleInputChange(e)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  sendMsgHandle(msg, textToCopy);
                }
              }}
            />
          ) : (
            <button
              className="text-white flex-auto text-sm"
              onClick={() => handleJoinChannel()}
            >
              Join Channel
            </button>
          )}
          <div className="flex items-center gap-2 ml-auto">
            <HandCoins className="w-5 h-5 text-[green] hidden sm:block cursor-pointer" />
            <Smile
              className="w-[18px] h-[18px] text-[#777a8c] cursor-pointer"
              onClick={() => {
                if (!joinStatus) return;
                setShowPicker((prev) => !prev);
              }}
            />
            {showPicker && (
              <div
                ref={popupRef}
                className="absolute z-20 right-9 bottom-5 w-30"
              >
                <Picker
                  data={data}
                  onEmojiSelect={handleEmojiSelect}
                  theme="dark"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatContainer;
