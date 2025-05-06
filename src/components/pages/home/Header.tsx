// import { useState } from "react";
// import { SearchIcon } from "lucide-react";
// import { Check, Copy, Pin, UserCircle } from "lucide-react";
// import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
// import { toShortAddress } from "../../../utils/utils";
// import ProfileMenu from "../../ui/profile";
// import { ProfileModal } from "../../profileModal";

// type HeaderProps = {
//   // handleProfileModalClose: () => void;
//   logoutuser: () => void;
//   LoginWithTwitter: () => void;
//   authenticated: boolean;
//   userdata: User | null;
//   tokenImage: string;
//   tokenName: string;
//   tokenSymbol: string;
//   textToCopy: string;
//   chainId: string;
// };

// const Header = ({
//   // handleProfileModalClose,
//   logoutuser,
//   LoginWithTwitter,
//   authenticated,
//   userdata,
//   tokenImage,
//   tokenName,
//   tokenSymbol,
//   textToCopy,
//   chainId,
// }: HeaderProps) => {
//   const [openProfile, setOpenProfile] = useState(false);
//   const [profileModal, setProfileModal] = useState(false);
//   const [copied, setCopied] = useState(false);
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

//   const handleProfileModalClose = () => {
//     setProfileModal(false);
//     setOpenProfile(false);
//   };

//   return (
//     <div className="h-[58px] bg-[#101114] border border-solid border-[#22242d] flex items-center px-4">
//       <div className="flex items-center gap-2 overflow-x-hidden w-[230px]">
//         <Avatar className="w-9 h-9">
//           <AvatarImage src={tokenImage} alt="DB" />
//           <AvatarFallback>DB</AvatarFallback>
//         </Avatar>
//         <div className="flex flex-col">
//           <div className="flex items-center space-x-2">
//             <b className="text-white text-base font-bold">{tokenName}</b>
//             <b className="text-white text-[13px] font-medium">{tokenSymbol}</b>
//             <Pin size={12} className="text-[red] fill-[red] rotate-45" />
//           </div>
//           <div className="font-normal text-[#526fff] text-[13px] flex flex-row">
//             <div>{toShortAddress(textToCopy)}</div>
//             <button
//               onClick={handleCopy}
//               className="px-3 py-1 text-white mt-[-1vh]"
//             >
//               <span>
//                 {copied ? (
//                   <Check size={13} className="mt-1 bg-tranparent" />
//                 ) : (
//                   <Copy size={13} className="mt-1 bg-tranparent" />
//                 )}
//               </span>
//             </button>
//           </div>
//         </div>
//       </div>

//       <div className="ml-auto flex items-center gap-2">
//         <div className="flex items-center gap-2">
//           <a
//             href="https://photon-sol.tinyastro.io/"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             <Avatar className="w-4 h-4">
//               <AvatarImage src="/assets/image-5-1.png" alt="Photon" />
//             </Avatar>
//           </a>
//           <a
//             href={`https://dexscreener.com/${chainId}/${textToCopy}`}
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             <Avatar className="w-3 h-[13px]">
//               <AvatarImage src="/assets/layer-1.png" alt="Dexscreener" />
//             </Avatar>
//           </a>
//           <a
//             href="https://axiom.trade/"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             <Avatar className="w-3 h-3">
//               <AvatarImage src="/assets/clip-path-group.png" alt="axiom" />
//             </Avatar>
//           </a>
//           <a
//             href="https://neo.bullx.io/"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             <Avatar className="w-[23px] h-[21px]">
//               <AvatarImage src="/assets/bullx-1.png" alt="Bullx" />
//             </Avatar>
//           </a>
//         </div>
//         <div className="relative group">
//           <UserCircle
//             className="w-5 h-5 text-white cursor-pointer"
//             onClick={() => setOpenProfile(!openProfile)}
//           />
//           {openProfile && (
//             <ProfileMenu
//               myProfile={() => setProfileModal(true)}
//               logout={logoutuser}
//               authenticated={authenticated}
//               login={LoginWithTwitter}
//               setVisibility={() => setOpenProfile(false)}
//             />
//           )}
//           {profileModal && (
//             <ProfileModal
//               isOpen={profileModal}
//               onClose={handleProfileModalClose}
//               _id={userdata?._id || ""}
//               displayName={userdata?.displayName || ""}
//               username={userdata?.userId || ""}
//               avatar={userdata?.avatar || ""}
//               bio={userdata?.bio || ""}
//               wallet={userdata?.wallet || ""}
//             />
//           )}
//         </div>
//         <SearchIcon className="w-5 h-5 text-white cursor-pointer" />
//       </div>
//     </div>
//   );
// };

// export default Header;
