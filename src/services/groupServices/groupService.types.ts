import { GROUP_ROLE } from "~/constants/constants.app";

export type TGroupInfo = {
  id: string;
  group_name: string;
  summary?: string;
  create_at: Date;
  role: GROUP_ROLE;
};

export type TNewGroup = {
  group_name: string;
  summary?: string;
};

export type TUpdateGroupInfo = {} & TNewGroup;

export type TManageGroup = {
  id: string;
  group_name: string;
  summary?: string;
  role?: GROUP_ROLE;
  isDefault?: boolean;
};

export type TManageUsers = {
  id: number;
  username: string;
  email: string;
  role: GROUP_ROLE;
};

export type TSetRole = {
  user_id: number;
  role: GROUP_ROLE;
};
