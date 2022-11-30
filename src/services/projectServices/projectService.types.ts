export type TProjectInfo = {
  id: string;
  project_name: string;
  summary: string;
  create_at?: Date;
  isDefault?: boolean;
};

export type TCreateNewProject = {
  project_name: string;
  summary?: string;
};

export type TCreateNewSprint = {
  sprint_name: string;
  start_date?: Date;
  end_date?: Date;
};

export type TSprintInfo = {
  id: number;
  sprint_name: string;
  start_date?: Date;
  end_date?: Date;
};
