import { RootState } from "~/store";
import { useSelector } from "react-redux";

const projectSelector = (state: RootState) => state.project;

export const useProjectSelector = () => {
  const { project } = useSelector(projectSelector);
  return { project };
};
