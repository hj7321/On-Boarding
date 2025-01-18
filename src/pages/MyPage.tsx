import { useMutation, useQueryClient } from "@tanstack/react-query";
import clsx from "clsx";
import { Notify } from "notiflix";
import { useState } from "react";
import { changeProfile } from "../apis/profile.api";
import { useUserStore } from "../stores/user.store";

const buttonStyle =
  "w-[150px] h-[50px] rounded-[4px] bg-button-basic border-button-basic hover:bg-button-hover hover:border-button-hover hover:font-bold";

export default function MyPage() {
  const { nickname, setNickname, profileImg, setProfileImg } = useUserStore();
  const [edit, setEdit] = useState<boolean>(false);
  const [userNickname, setUserNickname] = useState<string>(nickname || "");
  const [profileFile, setProfileFile] = useState<File | null>(null); // 실제 파일 저장

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: changeProfile,
    onSuccess: (data) => {
      const { avatar, nickname: updatedNickName } = data;
      setProfileImg(avatar);
      setNickname(updatedNickName);
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });
      Notify.success("프로필이 성공적으로 변경되었습니다.", {
        width: "330px",
        fontSize: "16px",
        fontFamily: "SUIT-Regular",
        cssAnimationDuration: 800,
      });
      setEdit(false);
    },
    onError: () => {
      Notify.failure("프로필 변경에 실패했습니다.", {
        width: "270px",
        fontSize: "16px",
        fontFamily: "SUIT-Regular",
        cssAnimationDuration: 800,
      });
    },
  });

  const handleEditProfile = () => {
    if (!userNickname.trim()) {
      Notify.failure("닉네임을 입력해주세요.", {
        width: "260px",
        fontSize: "16px",
        fontFamily: "SUIT-Regular",
        cssAnimationDuration: 800,
      });
      return;
    }

    const formData = new FormData();
    if (profileFile) formData.append("avatar", profileFile);
    formData.append("nickname", userNickname);

    mutation.mutate(formData);
  };

  const handleChangeProfileImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImg(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-[40px] mb-[20px]">✨My Profile✨</h1>
      <img
        src={profileImg || "/images/default.jpg"}
        alt="profile_img"
        className="w-[250px] h-[250px] rounded-full mb-[10px] object-cover"
      />
      {edit ? (
        <>
          <input
            type="file"
            accept="image/*"
            onChange={handleChangeProfileImg}
            className="mb-[20px] w-[77px]"
          />
          <input
            type="text"
            value={userNickname}
            onChange={(e) => setUserNickname(e.target.value)}
            className="bg-black text-center text-[30px] mb-[30px] outline-none border border-white rounded-[3px]"
          />
        </>
      ) : (
        <p className="text-[30px] mb-[30px]">{nickname}</p>
      )}

      {edit ? (
        <button
          onClick={handleEditProfile}
          className={clsx(
            "w-[150px] h-[50px] rounded-[4px]",
            mutation.isPending
              ? "hover:cursor-default bg-pink-200 bg-opacity-50 text-opacity-50"
              : "bg-button-basic border-button-basic hover:bg-button-hover hover:border-button-hover hover:font-bold"
          )}
        >
          수정 완료
        </button>
      ) : (
        <button onClick={() => setEdit(true)} className={buttonStyle}>
          프로필 수정하기
        </button>
      )}
    </div>
  );
}
