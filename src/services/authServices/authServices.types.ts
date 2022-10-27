export type TRegisterMutationInput = {
  username: string;
  password: string;
  email: string;
};

export type TLoginQueryInput = {
  email: string;
  password: string;
};

export type TUserInfo = {
  id?: number;
  username: string;
  email: string;
  avatar?: string;
  introduction?: string;
  create_at: Date;
};
