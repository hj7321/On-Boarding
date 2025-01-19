import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserState {
  isLoggedIn: boolean;
  nickname: string | null;
  profileImg: string | null;
  setLogin: (nickname: string, profileImg: string) => void;
  setLogout: () => void;
  setNickname: (nickname: string) => void;
  setProfileImg: (profileImg: string) => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      isLoggedIn: !!localStorage.getItem("accessToken"),
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
      setNickname: (nickname) => set({ nickname }),
      setProfileImg: (profileImg) => set({ profileImg }),
    }),
    {
      name: "userStore", // 로컬 스토리지에 저장되는 키 이름을 "userStore"로 지정
    }
  )
);
