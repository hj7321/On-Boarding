import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { Outlet } from "react-router";
import { checkProfile } from "../apis/profile.api";
import { useUserStore } from "../stores/user.store";
import Footer from "./Footer";
import Header from "./Header";
import TopButton from "./TopButton";

export default function Layout() {
  const { setLogin, setLogout } = useUserStore();

  const { data, isSuccess, isError } = useQuery({
    queryKey: ["userProfile"],
    queryFn: async () => {
      const { nickname, avatar } = await checkProfile();
      return { nickname, avatar };
    },
    enabled: !!localStorage.getItem("accessToken"), // 토큰이 있을 때만 호출
    staleTime: 7 * 60 * 1000, // 7분 동안 데이터 캐시 유지
  });

  useEffect(() => {
    if (isSuccess) {
      setLogin(data.nickname, data.avatar);
    }
  }, [isSuccess, data, setLogin]);

  useEffect(() => {
    if (isError) setLogout();
  }, [isError, setLogout]);

  return (
    <div className="bg-black text-white min-w-[700px]">
      <Header />
      <main className="min-h-screen py-[10px] px-[50px]">
        <Outlet />
      </main>
      <TopButton />
      <Footer />
    </div>
  );
}
