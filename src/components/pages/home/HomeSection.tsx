"use client";
import {
  ExternalLinkIcon,
  HeartIcon,
  MenuIcon,
  MessageCircleIcon,
  PaperclipIcon,
  RepeatIcon,
  SearchIcon,
  SendIcon,
  Copy,
  Check,
  CirclePlus,
  UserCircle,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { chattingHistory } from "@/components/ui/chatting";
import { Message } from "@/@types/global";
import SignupPage from "../sign/Signup";

interface MenuItemProps {
  icon: string;
  text: string;
}

const MenuItem = ({ icon, text }: MenuItemProps) => {
  return (
    <div className="flex items-center px-4 py-2 text-sm text-white hover:bg-[#22242D] cursor-pointer">
      <span className="mr-3">{icon}</span>
      <span>{text}</span>
    </div>
  );
};

const HomeSection = () => {
  const [pageState, setPageState] = useState(false);
  const [plusBtn, setPlusBtn] = useState(false);
  const [copied, setCopied] = useState(false);
  const [searchBtn, setSearchBtn] = useState(true);
  const [msg, setMsg] = useState("");
  const [textToCopy, setTextToCopy] = useState(
    "0xDd0892a70aB28B2B3fac1E6FAa7a4B2121dDd5e4"
  );
  const [messages, setMessages] = useState([
    {
      id: 1,
      user: "Orangie",
      avatar: "/assets/image-9.png",
      message: "I wont miss this trump",
      time: "2:27 AM",
    },
    {
      id: 2,
      user: "Ansem",
      avatar: "/assets/image-7.png",
      message: "Tweet is up",
      time: "2:27 AM",
    },
    {
      id: 3,
      user: "POE",
      avatar: "/assets/image-6.png",
      message: "RAIDDD",
      time: "2:27 AM",
    },
    {
      id: 4,
      user: "Orangie",
      avatar: "/assets/image-9.png",
      message: "I wont miss this trump",
      time: "2:27 AM",
    },
    {
      id: 5,
      user: "Ansem",
      avatar: "/assets/image-7.png",
      message: "If we flip trump ill get this on the Sphere",
      time: "2:27 AM",
    },
    {
      id: 6,
      user: "POE",
      avatar: "/assets/image-6.png",
      message: "Smash the tweet",
      time: "2:27 AM",
    },
    {
      id: 7,
      user: "fomo",
      avatar: "/assets/image-25.png",
      message: "Posting a tiktok now",
      time: "2:27 AM",
    },
    {
      id: 8,
      user: "ShockedJS",
      avatar: "/assets/image-26.png",
      message: "DB to 10M",
      time: "2:28 AM",
    },
  ]);
  // Sidebar channels data
  const sidebarChannels = [
    { id: 1, image: "/assets/image-11.png" },
    { id: 2, image: "/assets/image-12.png" },
    { id: 3, image: "/assets/image-14.png" },
    { id: 4, image: "/assets/image-15.png" },
    { id: 5, image: "/assets/image-16.png" },
    { id: 6, image: "/assets/image-22.png" },
    { id: 7, image: "/assets/image-23.png" },
    { id: 8, image: "/assets/image-17.png" },
    { id: 9, image: "/assets/image-18.png" },
    { id: 10, image: "/assets/image-19.png" },
  ];

  useEffect(() => {}, [messages]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (err) {
      console.log("Copy failed: ", err);
    }
  };

  const searchButtonHandle = () => {
    setSearchBtn(!searchBtn);
  };

  const sendMsgHandle = () => {
    const newMessage: Message = {
      id: messages.length + 1,
      user: "ShockedJS",
      avatar: "/assets/image-26.png",
      message: msg,
      time: "2:28 AM",
    };
    messages.push(newMessage);
    setMsg("");
  };

  const openFileDialog = () => {
    const inputElement = document.createElement("input");
    inputElement.type = "file";
    inputElement.accept = "image/*";
    inputElement.click();
  };

  const plusBtnHandle = () => {
    setPlusBtn(!plusBtn);
  };

  const channelClick = () => {
    setPageState(!pageState);
  };

  return (
    <div className="bg-transparent flex flex-row justify-center w-full">
      <div className="overflow-hidden w-full max-w-6xl h-screen">
        <div className="relative w-full h-full flex">
          {/* Sidebar */}
          <div className="h-full block md:block md:relative">
            <div className="relative h-full">
              <div className="w-[63px] h-full bg-[#22242D] border border-solid border-[#22242d] flex flex-col items-center">
                <div>
                  <MenuIcon className="w-7 h-7 text-white mt-4 cursor-pointer" />
                </div>

                <div className="mt-4 relative">
                  <div className="text-[#777a8c] text-[10px] ml-4">Pinned</div>
                  <img
                    className="w-[9px] h-[9px] absolute top-1 left-[3px]"
                    alt="Pin"
                    src="/assets/vector-5.svg"
                  />
                </div>

                {/* Pinned channels */}
                <div className="mt-2 flex flex-col items-center gap-2">
                  {sidebarChannels.slice(0, 3).map((channel) => (
                    <Avatar key={channel.id} className="w-[46px] h-[46px]">
                      <AvatarImage
                        src={channel.image}
                        alt="Channel"
                        onClick={() => channelClick()}
                      />
                    </Avatar>
                  ))}
                </div>

                <div className="mt-4 flex items-center">
                  <img
                    className="w-2.5 h-2.5"
                    alt="Trending"
                    src="/assets/frame-10.svg"
                  />
                  <div className="text-[#777a8c] text-[10px] ml-1">
                    Trending
                  </div>
                </div>

                {/* Trending channels */}
                <div className="mt-2 flex flex-col items-center gap-2">
                  {sidebarChannels.slice(3).map((channel) => (
                    <Avatar key={channel.id} className="w-[46px] h-[46px]">
                      <AvatarImage src={channel.image} alt="Channel" />
                    </Avatar>
                  ))}
                </div>
              </div>
            </div>
          </div>
          {/* Main chat container */}
          <div className="flex-1 flex flex-col h-full">
            {/* Header */}
            <div className="h-[58px] bg-[#101114] border border-solid border-[#22242d] flex items-center px-4">
              <div className="flex items-center gap-2">
                <Avatar className="w-9 h-9">
                  <AvatarImage src="/assets/image-11.png" alt="DB" />
                  <AvatarFallback>DB</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <div className="font-bold text-white text-base">DB</div>
                  <div className="font-medium text-white text-[13px]">
                    DICK BUTT
                  </div>
                  <div className="font-normal text-[#526fff] text-[13px] flex flex-row">
                    0xDd0892a70aB28B2B3fac1E6FAa7a4B2121dDd5e4
                    <button
                      onClick={handleCopy}
                      className="px-3 py-1 text-white mt-[-1vh]"
                    >
                      <span>
                        {copied ? <Check size={13} /> : <Copy size={13} />}
                      </span>
                    </button>
                  </div>
                </div>
              </div>

              <div className="ml-auto flex items-center gap-2">
                <div className="hidden sm:flex items-center gap-2">
                  <Avatar className="w-4 h-4">
                    <AvatarImage src="/assets/image-5-1.png" alt="Photon" />
                  </Avatar>
                  <Avatar className="w-[23px] h-[21px]">
                    <AvatarImage src="/assets/bullx-1.png" alt="Bullx" />
                  </Avatar>
                  <Avatar className="w-3 h-3">
                    <AvatarImage
                      src="/assets/clip-path-group.png"
                      alt="axiom"
                    />
                  </Avatar>
                  <Avatar className="w-[21px] h-[21px]">
                    <AvatarImage src="/assets/image-13.png" alt="Icon" />
                  </Avatar>
                  <Avatar className="w-3 h-[13px]">
                    <AvatarImage src="/assets/layer-1.png" alt="Dexscreener" />
                  </Avatar>
                </div>
                <UserCircle className="w-5 h-5 text-white cursor-pointer" />
                <SearchIcon
                  className="w-5 h-5 text-white cursor-pointer"
                  onClick={searchButtonHandle}
                />
              </div>
            </div>
            {pageState ? (
              <div className="flex-1 flex flex-col overflow-hidden">
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
                  <div className="flex items-center">
                    <img
                      className="w-4 h-3.5"
                      alt="Twitter icon"
                      src="/assets/vector.svg"
                    />
                    <span className="ml-1 font-medium text-white text-[13px]">
                      Twitter
                    </span>
                  </div>
                  <Separator
                    orientation="vertical"
                    className="h-[30px] mx-4 bg-[#5B5E69]"
                  />
                  <div className="flex items-center">
                    <ExternalLinkIcon className="w-4 h-4 text-white" />
                    <span className="ml-1 font-medium text-white text-[13px]">
                      Website
                    </span>
                  </div>
                </div>

                {/* Chat messages container with scrolling */}
                <div className="flex-1 overflow-y-auto bg-[#191a21] p-4">
                  {/* Chat messages */}
                  <div className="space-y-4">
                    {messages
                      .slice(0, 4)
                      .map((message) => chattingHistory(message))}

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

                      <Card className="w-full max-w-full bg-[#15202b] rounded-lg border-none">
                        <CardContent className="p-4">
                          <div className="flex items-start">
                            <Avatar className="w-8 h-8">
                              <AvatarImage
                                src="/assets/image-28.png"
                                alt="Andy Ayrey"
                              />
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
                                <span className="text-[#5a5d69]">
                                  @AndyAyrey
                                </span>
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
                              <HeartIcon className="w-4 h-4 text-red-500 fill-red-500" />
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

                    {/* Remaining messages */}
                    {messages
                      .slice(4)
                      .map((message) => chattingHistory(message))}
                  </div>
                </div>

                {/* Message input */}
                <div className="max-w-full bg-[#22242D] p-2">
                  <div className="relative w-full h-[45px] bg-[url(/rectangle-3.svg)] bg-[100%_100%] flex items-center px-3 rounded-md">
                    <CirclePlus
                      className="w-5 h-5 text-[#777a8c] cursor-pointer"
                      onClick={plusBtnHandle}
                    />
                    {plusBtn && (
                      <div className="absolute bottom-full mb-2 left-0 w-48 bg-[#22242D] rounded-md shadow-lg py-1 z-50">
                        <MenuItem icon="📤" text="Upload a File" />
                        <MenuItem icon="📊" text="Create Poll" />
                        <MenuItem icon="🛠️" text="Use Apps" />
                        <MenuItem icon="💬" text="Message" />
                      </div>
                    )}
                    <Input
                      className="border-none bg-transparent text-[#777a8c] text-xs h-full focus:outline-none flex-1"
                      placeholder="Write a message..."
                      value={msg}
                      onChange={(e) => setMsg(e.target.value)}
                    />
                    <div className="flex items-center gap-2 ml-auto">
                      <PaperclipIcon
                        className="w-5 h-5 text-[#777a8c] hidden sm:block cursor-pointer"
                        onClick={openFileDialog}
                      />
                      <SendIcon
                        className="w-[18px] h-[18px] text-[#777a8c] cursor-pointer"
                        onClick={sendMsgHandle}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <SignupPage />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeSection;
