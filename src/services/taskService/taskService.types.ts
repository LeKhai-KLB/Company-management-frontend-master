import { ACTION } from "~/constants/constants.app";

export type TTaskInfo = {
  id: number;
  task_name: string;
  content: string;
  tag: ACTION;
  point: number;
  task_members?: Array<{ id: number; username: string }>;
};

export type TCreateNewTask = {
  task_name: string;
  content: string;
  point: number;
  task_members?: Array<number>;
  sprint_id: number;
};
