import { useEffect } from "react";
import { Outlet } from "react-router";
import { useUserStore } from "../stores/user.store";
import Footer from "./Footer";
import Header from "./Header";
import TopButton from "./TopButton";

export default function Layout() {
  const { setLogin, setLogout } = useUserStore();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      const nickname = "닉네임";
      setLogin(nickname);
    } else {
      setLogout();
    }
  }, [setLogin, setLogout]);

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
