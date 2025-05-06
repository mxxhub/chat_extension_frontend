// import { useEffect, useRef, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// // import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import io from "socket.io-client";
// import { useLogin, usePrivy, useLogout } from "@privy-io/react-auth";
// import Picker from "@emoji-mart/react";
// import data from "@emoji-mart/data";
// import {
//   LucideIcon,
//   X,
//   ExternalLinkIcon,
//   HeartIcon,
//   MenuIcon,
//   MessageCircleIcon,
//   RepeatIcon,
//   SearchIcon,
//   Smile,
//   Copy,
//   Check,
//   CirclePlus,
//   UserCircle,
//   Pin,
//   HandCoins,
//   Play,
//   ThumbsUp,
//   ImagePlus,
//   TicketCheck,
//   LogOut,
// } from "lucide-react";
// import { getCurrentTabUrl, toShortAddress } from "../../../utils/utils";
// import {
//   removeChannel,
//   setAuthenticated,
//   setChannels,
//   setUnauthenticated,
// } from "../../../redux/features/auth/authSlice";
// import { RootState } from "../../../redux/store";
// import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
// import { Card, CardContent } from "../../ui/card";
// import { Input } from "../../ui/input";
// import { Separator } from "../../ui/separator";
// import { ChattingHistory } from "../../ui/chatting";
// import ProfileCard from "../../ui/profileCard";
// import { showToast } from "../../ui/toastMsg";
// import ProfileMenu from "../../ui/profile";
// import { SettingModal } from "../../settingModal";
// import { ProfileModal } from "../../profileModal";
// import SidebarChannelList from "../../channelModal";
// import config from "../../../../config/config.json";
// import Sidebar from "./Siderbar";
// import Header from "./Header";
// import ChatContainer from "./ChatContainer";

// const HomeSection = () => {
//   console.log("HomeSection");
//   const userdata = useSelector((state: RootState) => state.auth.user);
//   // const messages = useSelector((state: RootState) => state.message.messages);
//   console.log("userdata: ", userdata);
//   const joinedChannel = useSelector(
//     (state: RootState) => state.auth.user?.channels
//   );
//   const dispatch = useDispatch();
//   // const navigate = useNavigate();
//   const { login } = useLogin();
//   const { logout } = useLogout();

//   const typingTimeout = useRef<NodeJS.Timeout | null>(null);
//   const popupRef = useRef<HTMLDivElement | null>(null);
//   const scrollRef = useRef<HTMLDivElement>(null);

//   const server = config.server || "localhost:4000";
//   const defaultChannels: Channel[] = [
//     {
//       id: "1",
//       chainId: "ethereum",
//       symbol: "memecoin1",
//       image: "/assets/image-11.png",
//       name: "memecoin1",
//       tokenAdd: "0x1D02a7E63E2f8575E76776BE7828926fADef6029",
//     },
//     {
//       id: "2",
//       chainId: "ethereum",
//       symbol: "memecoin2",
//       image: "/assets/image-12.png",
//       name: "memecoin2",
//       tokenAdd: "0x8283093bf0484c1F806976EA90f79318BDB9688a",
//     },
//     {
//       id: "3",
//       chainId: "ethereum",
//       symbol: "memecoin3",
//       image: "/assets/image-14.png",
//       name: "memecoin3",
//       tokenAdd: "0x12e6e01F7D56BeC3aC5bD7Fd4fC7c9154907b332",
//     },
//   ];

//   const [userProfile, setUserProfile] = useState(false);
//   const [menu, setMenu] = useState(false);
//   const [profileModal, setProfileModal] = useState(false);
//   const [openProfile, setOpenProfile] = useState(false);
//   const [plusBtn, setPlusBtn] = useState(false);
//   const [copied, setCopied] = useState(false);
//   const [searchBtn, setSearchBtn] = useState(true);
//   const [msg, setMsg] = useState("");
//   const [textToCopy, setTextToCopy] = useState("");
//   const [tokenName, setTokenName] = useState("");
//   const [tokenSymbol, setTokenSymbol] = useState("");
//   const [tokenImage, setTokenImage] = useState("");
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [typingStatus, setTypingStatus] = useState(false);
//   const [showPicker, setShowPicker] = useState(false);
//   const [token, setToken] = useState<string>("");
//   const [socket, setSocket] = useState<any>(null);
//   const [xRaid, setXRaid] = useState<boolean>(false);
//   const [tweetLink, setTweetLink] = useState<string>("");
//   const [joinStatus, setJoinStatus] = useState<boolean>(false);
//   const [sidebarChannels, setSidebarChannels] =
//     useState<Channel[]>(defaultChannels);
//   const [chainId, setChainId] = useState<string>("ethereum");

//   const { authenticated, user, ready } = usePrivy();

//   interface MenuItemProps {
//     Icon: LucideIcon;
//     text: string;
//     onClick?: () => void;
//   }

//   useEffect(() => {
//     if (!token) return;

//     const newSocket = io(server, {
//       auth: { token: token },
//     });

//     setSocket(newSocket);

//     const data = {
//       userId: user?.twitter?.username || "ShockedJS",
//       tokenAdd: textToCopy,
//       image: tokenImage,
//       name: tokenName,
//       symbol: tokenSymbol,
//     };
//     newSocket.emit("join:room", data);

//     newSocket.on("connect", () => {
//       console.log("Connected to socket server");
//     });

//     newSocket.on("message:received", (receivedMsg) => {
//       console.log("Received new message", receivedMsg);
//       setMessages((prevMessages) => [...prevMessages, receivedMsg]);
//     });

//     newSocket.on("user:typing", (data) => {
//       console.log("typing socket: ", data);
//       setTypingStatus(true);
//       if (typingTimeout.current) clearTimeout(typingTimeout.current);

//       typingTimeout.current = setTimeout(() => {
//         setTypingStatus(false);
//       }, 1000);
//     });

//     newSocket.on("user:status", (data) => {
//       console.log("User status: ", data);
//     });

//     return () => {
//       // newSocket.emit("leave:room", textToCopy);
//       // newSocket.off("connect");
//       // newSocket.off("message:received");
//       // newSocket.off("user:typing");
//       // newSocket.off("user:status");
//       // newSocket.disconnect();
//     };
//   }, [token]);

//   useEffect(() => {
//     const handleClickOutside = (e: MouseEvent) => {
//       if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
//         setShowPicker(false);
//         setPlusBtn(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   useEffect(() => {
//     const getMessage = async () => {
//       const data = {
//         room: textToCopy,
//         limit: 50,
//       };
//       const res: any = await axios.post(`${server}/messages/getMessage`, data);
//       setMessages(res.data);
//       console.log("getting messages", res.data);
//     };
//     getMessage();
//   }, [textToCopy, authenticated]);

//   useEffect(() => {
//     if (!ready && !authenticated && !user) return;

//     const saveUser = async () => {
//       try {
//         const userData = {
//           userId: user?.twitter?.username || "ShockedJS",
//           displayName: user?.twitter?.name || "Leon",
//           wallet: user?.wallet?.address || "0x1294724982",
//           avatar: user?.twitter?.profilePictureUrl || "/assets/image-5-1.png",
//           channel: {
//             name: tokenName,
//             image: tokenImage,
//             tokenAdd: textToCopy,
//             symbol: tokenSymbol,
//           },
//         };

//         const response = await axios.post(`${server}/auth/addUser`, userData);
//         console.log("response: ", response);
//         setToken(response?.data?.token);
//         console.log(
//           "response?.data?.channels: ",
//           response?.data?.user?.channels
//         );
//         dispatch(setAuthenticated(response?.data?.user));
//       } catch (err) {
//         console.log("save user error: ", err);
//       }
//     };
//     saveUser();
//     // navigate("/");
//   }, [ready, authenticated, user, dispatch]);

//   useEffect(() => {
//     const fetchTokenInfo = async () => {
//       const tokenInfo = await getCurrentTabUrl();
//       console.log("tokenInfo: ", tokenInfo);
//       if (!tokenInfo) return;
//       const newChannel: Channel = {
//         id: "",
//         chainId: "ethereum",
//         image: tokenInfo.image,
//         name: tokenInfo.name,
//         symbol: tokenInfo.symbol,
//         tokenAdd: tokenInfo.address,
//       };
//       setSidebarChannels((prev) => [...prev, newChannel]);
//     };
//     fetchTokenInfo();
//   }, []);

//   const LoginWithTwitter = async () => {
//     try {
//       if (authenticated) return;

//       setOpenProfile(false);
//       await login();
//     } catch (err) {
//       console.log("login error: ", err);
//     }
//   };

//   const logoutuser = async () => {
//     try {
//       logout();
//       showToast("success", "Logged out successfully!");
//       dispatch(setUnauthenticated());
//       setOpenProfile(false);
//     } catch (err) {
//       console.log("Logout error: ", err);
//     }
//   };

//   const MenuItem = ({ Icon, text, onClick }: MenuItemProps) => {
//     return (
//       <div
//         className="flex items-center px-4 py-2 text-sm text-white hover:bg-[#373b49] cursor-pointer"
//         onClick={onClick}
//       >
//         <Icon className="mr-3 size-4" />
//         <span>{text}</span>
//       </div>
//     );
//   };

//   const handleEmojiSelect = (emoji: any) => {
//     setMsg((prevMsg) => prevMsg + emoji.native);
//     setShowPicker(false);
//   };

//   const handleCopy = async () => {
//     try {
//       await navigator.clipboard.writeText(textToCopy);
//       setCopied(true);
//       setTimeout(() => {
//         setCopied(false);
//       }, 2000);
//     } catch (err) {
//       console.log("Copy failed: ", err);
//     }
//   };

//   const sendMsgHandle = (content: string, room: string) => {
//     if (!authenticated) {
//       showToast("warning", "Please Login First");
//       return;
//     }
//     const timestamp = new Date()
//       .toLocaleTimeString("en-US", {
//         hour: "numeric",
//         minute: "2-digit",
//         hour12: true,
//       })
//       .toString();
//     if (socket) {
//       socket.emit("message:new", { content, room, timestamp });
//     }
//     scrollToBottom();
//     setMsg("");
//   };

//   const plusBtnHandle = () => {
//     if (!joinStatus) return;
//     setPlusBtn(!plusBtn);
//   };

//   const startTyping = (room: string) => {
//     if (socket) {
//       socket.emit("typing:start", room);
//     }
//   };

//   const scrollToBottom = () => {
//     if (scrollRef.current) {
//       scrollRef.current.scrollTo({
//         top: scrollRef.current.scrollHeight,
//         behavior: "smooth",
//       });
//     }
//   };

//   const channelClick = (channel: Channel) => {
//     if (!authenticated) {
//       showToast("warning", "Please Login First");
//       return;
//     }
//     setTokenName(channel.name);
//     setTokenImage(channel.image);
//     setTextToCopy(channel.tokenAdd);
//     setTokenSymbol(channel.symbol);
//     setChainId(channel.chainId);
//   };

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     startTyping(textToCopy);
//     setMsg(e.target.value);
//   };

//   const handleFileChange = () => {
//     setPlusBtn(false);
//     const input = document.createElement("input");
//     input.type = "file";
//     input.accept = ".png,.jpg,.jpeg";
//     input.onchange = (event: Event) => {
//       const target = event.target as HTMLInputElement;
//       if (target.files && target.files.length > 0) {
//         const file = target.files[0];
//         console.log("Selected file:", file);
//       }
//     };
//     input.click();
//   };

//   const handleStartRaid = () => {
//     setXRaid(!xRaid);
//     setPlusBtn(false);
//   };

//   const handleJoinChannel = async () => {
//     if (!authenticated) {
//       showToast("warning", "Please Login First");
//       return;
//     }
//     const selected: Channel = {
//       id: "",
//       chainId: "ethereum",
//       image: "/assets/image-11.png",
//       name: "memecoin1",
//       symbol: "memecoin1",
//       tokenAdd: "0x1D02a7E63E2f8575E76776BE7828926fADef6029",
//     };

//     if (socket) {
//       const data = {
//         userId: user?.twitter?.username || "ShockedJS",
//         tokenAdd: textToCopy,
//         image: tokenImage,
//         name: tokenName,
//         symbol: tokenSymbol,
//       };
//       socket.emit("join:room", data);
//       console.log(`you joined ${textToCopy}`);
//     }
//     dispatch(setChannels(selected));
//     showToast("success", "Joined channel successfully!");
//     setJoinStatus(true);
//   };

//   const handleLeaveChannel = () => {
//     if (socket) {
//       socket.emit("leave:room", textToCopy);
//       console.log(`you left ${textToCopy}`);
//     }

//     // setJoinStatus(false);
//     dispatch(removeChannel(textToCopy));
//     showToast("success", "Left channel successfully!");
//     setPlusBtn(false);
//   };

//   return (
//     <div className="bg-transparent flex flex-row justify-center w-full border-r border-r-[#3f414e]">
//       <div className="overflow-hidden w-full max-w-[500px] min-w-[500px] h-screen">
//         <div className="relative w-full h-full flex">
//           {/* Sidebar */}
//           <Sidebar
//             joinedChannels={joinedChannel || []}
//             sidebarChannels={sidebarChannels}
//             onChannelClick={channelClick}
//             setJoinStatus={setJoinStatus}
//           />
//           {/* Main chat container */}
//           <div className="flex-1 flex flex-col h-full w-[437px]">
//             {/* Header */}
//             <Header
//               LoginWithTwitter={LoginWithTwitter}
//               logoutuser={logoutuser}
//               authenticated={authenticated}
//               userdata={userdata || null}
//               textToCopy={textToCopy}
//               tokenImage={tokenImage}
//               tokenName={tokenName}
//               tokenSymbol={tokenSymbol}
//               chainId={chainId}
//             />
//             <ChatContainer
//               messages={messages}
//               typingStatus={typingStatus}
//               handleJoinChannel={handleJoinChannel}
//               handleLeaveChannel={handleLeaveChannel}
//               joinStatus={joinStatus}
//               handlePlusBtn={plusBtnHandle}
//               sendMsgHandle={sendMsgHandle}
//               textToCopy={textToCopy}
//               handleInputChange={handleInputChange}
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HomeSection;
