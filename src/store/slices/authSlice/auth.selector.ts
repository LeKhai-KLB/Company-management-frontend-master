import { useSelector } from "react-redux";
import { RootState } from "../../store";

const authSelector = (state: RootState) => state.auth;

export const useAuthSelector = () => {
  const { user, authenticated } = useSelector(authSelector);
  return { user, authenticated };
};
