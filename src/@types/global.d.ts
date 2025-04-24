declare interface User {
  id?: string;
  userId: string;
  displayName: string;
  wallet: string;
  bio: string;
  avatar?: string;
  channels: Channel[];
  isOnline: boolean;
  lastSeen?: Date;
}

declare interface Message {
  _id: string;
  sender: User;
  content: string;
  room: string;
  timestamp?: string;
  createdAt: string;
}

declare interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
  error: string | null;
  token: string | null;
}

declare interface Channel {
  id: string;
  image: string;
  name: string;
  tokenAdd: string;
}
