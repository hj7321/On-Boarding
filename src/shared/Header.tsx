import { Notify } from "notiflix";
import { Link } from "react-router";
import { useUserStore } from "../stores/user.store";

const buttonStyle =
  "h-[40px] w-[90px] text-[15px] border bg-button-basic border-button-basic flex justify-center items-center rounded-[4px] hover:bg-button-hover hover:border-button-hover hover:font-bold";

export default function Header() {
  const { isLoggedIn, nickname, setLogout } = useUserStore();

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    setLogout();
    Notify.success("로그아웃 되었습니다.", {
      width: "240px",
      fontSize: "16px",
      fontFamily: "SUIT-Regular",
      cssAnimationDuration: 800,
    });
    window.location.href = "/";
  };

  return (
    <header className="h-[100px] pl-[30px] pr-[50px] flex justify-between items-center">
      <nav className="flex items-center">
        <img
          src="https://media.giphy.com/media/hvRJCLFzcasrR4ia7z/giphy.gif"
          alt="helloworld_img"
          width="60"
        />
        <Link
          to="/"
          className="font-extrabold text-[60px]  hover:text-pink-200 hover:cursor-pointer hover:text-[65px] duration-200"
        >
          helloworld;
        </Link>
      </nav>
      {!isLoggedIn ? (
        <nav className="flex gap-[20px] items-center">
          <div className="flex gap-[10px]">
            <img
              src="/images/default.jpg"
              alt="profile_img"
              width="60"
              className="w-[60px] h-[60px] rounded-full object-cover"
            />
            <Link
              to="/my"
              className="text-[25px] flex justify-center items-center hover:font-bold"
            >
              {nickname}님💖
            </Link>
          </div>
          <button onClick={handleLogout} className={buttonStyle}>
            로그아웃
          </button>
        </nav>
      ) : (
        <nav className="flex gap-[15px]">
          <Link to="/login" className={buttonStyle}>
            로그인
          </Link>
          <Link to="/sign-up" className={buttonStyle}>
            회원가입
          </Link>
        </nav>
      )}
    </header>
  );
}
