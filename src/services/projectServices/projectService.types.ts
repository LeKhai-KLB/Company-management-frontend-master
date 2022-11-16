export type TManageProject = {
  id: string;
  project_name: string;
  isDefaultProject?: boolean;
};

export type TProjectInfo = {
  id: string;
  project_name: string;
  start_date?: string;
  end_date?: string;
};
