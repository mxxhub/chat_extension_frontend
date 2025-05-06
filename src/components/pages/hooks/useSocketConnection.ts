// import { useEffect, useState, useRef } from "react";
// import io from "socket.io-client";
// import axios from "axios";
// import config from "../../../../config/config.json";

// export const useSocketConnection = (user: User, currentChannel: Channel) => {
//   const [socket, setSocket] = useState(null);
//   const [token, setToken] = useState("");
//   const [messages, setMessages] = useState([]);
//   const [typingStatus, setTypingStatus] = useState(false);
//   const typingTimeout = useRef(null);
//   const server = config.server || "144.172.94.181:4000";

//   // Socket connection effect
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
//   }, [token, currentChannel]);

//   // Fetch messages effect
//   useEffect(() => {
//     const getMessage = async () => {
//       if (!currentChannel?.tokenAdd) return;

//       const data = {
//         room: currentChannel.tokenAdd,
//         limit: 50,
//       };
//       const res = await axios.post(`${server}/messages/getMessage`, data);
//       setMessages(res.data);
//     };

//     getMessage();
//   }, [currentChannel, server]);

//   const sendMessage = (content, room) => {
//     // Send message logic
//   };

//   const startTyping = (room) => {
//     // Start typing logic
//   };

//   return {
//     socket,
//     token,
//     setToken,
//     messages,
//     typingStatus,
//     sendMessage,
//     startTyping,
//   };
// };
