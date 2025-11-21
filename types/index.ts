export interface User {
  name: string;
  email: string;
  username?: string;
  profilePicture?: string;
}

export interface Playlist {
  id: string;
  title: string;
  coverImage: string;
  songCount?: number;
}

export interface NavigationState {
  lastScreen: string;
  timestamp: number;
}

