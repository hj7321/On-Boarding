export type LoginDataType = {
  id: string;
  password: string;
};

export type SignUpDataType = LoginDataType & {
  nickname: string;
};

export type ChangeUserDataType = {
  avatar: string;
  nickname: string;
};
