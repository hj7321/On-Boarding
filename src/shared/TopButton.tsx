import clsx from "clsx";
import { useEffect, useState } from "react";

export default function TopButton() {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 90) setIsVisible(true);
      else setIsVisible(false);
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      className={clsx(
        isVisible ? "flex" : "hidden",
        "fixed bottom-[20px] right-[20px] w-[50px] h-[50px] bg-button-basic hover:bg-button-hover rounded-full justify-center items-center"
      )}
      onClick={scrollToTop}
    >
      <img src="/up-arrow.svg" alt="up" />
    </button>
  );
}
