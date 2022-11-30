import { RootState } from "~/store";
import { useSelector } from "react-redux";

const groupSelector = (state: RootState) => state.group;

export const useGroupSelector = () => {
  const { group } = useSelector(groupSelector);
  return { group };
};
