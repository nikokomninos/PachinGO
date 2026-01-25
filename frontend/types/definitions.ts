import type { Session, User } from "better-auth";

export type Level = {
  levelID: string;
  name: string;
  author: string;
  description: string;
  thumbnail: string;
  pegLayout: PegLayout;
  backgroundImage: string;
  backgroundImageOpacity: number;
  backgroundImageHSL: object;
  backgroundMusic: string;
  musicSelect: number;
  wallHSL: object;
  scoreHSL: object;
  crystalHSL: object;
  numOrange: number;
  numBalls: number;
  dateUploaded: string;
  likes: number;
  plays: number;
};

export type PegLayout = {
  c2dictionary: boolean;
  data: object[];
};

export type PachUser = {
  name: string;
  email: string;
  emailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
  role: string;
  profilePicture: string;
};

export type UserInfo = {
  role: string;
  likedLevels: number[];
};

export type UserData = {
  session: {
    user: User;
    session: Session;
  };
  userInfo: UserInfo;
};
