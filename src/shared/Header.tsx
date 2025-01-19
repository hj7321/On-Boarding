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
    <header
      className="h-[100px] pl-[30px] pr-[50px] flex justify-between items-center"
      aria-label="헤더"
    >
      <nav className="flex items-center" aria-label="메인 내비게이션">
        <img
          src="https://media.giphy.com/media/hvRJCLFzcasrR4ia7z/giphy.gif"
          alt="helloworld_img"
          width="60"
          aria-label="안녕하세요"
        />
        <Link
          to="/"
          className="font-extrabold text-[60px]  hover:text-pink-200 hover:cursor-pointer hover:text-[65px] duration-200"
          aria-label="홈으로 이동"
        >
          helloworld;
        </Link>
      </nav>
      {isLoggedIn ? (
        <nav
          className="flex gap-[20px] items-center"
          aria-label="사용자 내비게이션"
        >
          <div className="flex gap-[10px]">
            <img
              src="/images/default.jpg"
              alt="profile_img"
              className="w-[60px] h-[60px] rounded-full object-cover"
              aria-label="사용자 프로필"
            />
            <Link
              to="/my"
              className="text-[25px] flex justify-center items-center hover:font-bold"
              aria-label={`${nickname}님의 프로필로 이동`}
            >
              {nickname}님💖
            </Link>
          </div>
          <button
            onClick={handleLogout}
            className={buttonStyle}
            aria-label="로그아웃 버튼"
          >
            로그아웃
          </button>
        </nav>
      ) : (
        <nav
          className="flex gap-[15px]"
          aria-label="비로그인 사용자 내비게이션"
        >
          <Link
            to="/login"
            className={buttonStyle}
            aria-label="로그인 페이지로 이동"
          >
            로그인
          </Link>
          <Link
            to="/sign-up"
            className={buttonStyle}
            aria-label="회원가입 페이지로 이동"
          >
            회원가입
          </Link>
        </nav>
      )}
    </header>
  );
}
