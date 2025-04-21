declare interface User {
  userId: string;
  displayName: string;
  wallet: string;
  avatar?: string;
  channels: string[];
  isOnline: boolean;
  lastSeen?: Date;
}

declare interface Message {
  sender: User;
  content: string;
  room: string;
  timestamp?: Date;
  createdAt: string;
}

declare interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
  error: string | null;
}
