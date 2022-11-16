import { GROUP_ROLE } from "~/constants/constants.app";

export type TGroupInfo = {
  id: string;
  group_name: string;
  summary?: string;
  create_at: Date;
};

export type TNewGroup = {
  group_name: string;
  summary?: string;
};

export type TManageGroup = {
  id: string;
  group_name: string;
  summary?: string;
  role?: GROUP_ROLE;
  isDefaultGroup?: boolean;
};
