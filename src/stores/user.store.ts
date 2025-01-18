import { create } from "zustand";

interface UserState {
  isLoggedIn: boolean;
  nickname: string | null;
  profileImg: string | null;
  setLogin: (nickname: string, profileImg: string) => void;
  setLogout: () => void;
  setNickname: (nickname: string) => void;
  setProfileImg: (profileImg: string) => void;
}

export const useUserStore = create<UserState>((set) => ({
  isLoggedIn: false,
  nickname: null,
  profileImg: null,
  setLogin: (nickname, profileImg) =>
    set({
      isLoggedIn: true,
      nickname,
      profileImg,
    }),
  setLogout: () =>
    set({
      isLoggedIn: false,
      nickname: null,
      profileImg: null,
    }),
  setNickname: (nickname) => {
    set({ nickname });
  },
  setProfileImg: (profileImg) => {
    set({ profileImg });
  },
}));
