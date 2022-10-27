import {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
} from "react";
import { TWrapperProps } from "~utils/mixins.type";
import { TUserInfo } from "~/services/authServices/authServices.types";

type TAuthContext = {
  user: TUserInfo | undefined | null;
  handleSetUser: (userInfo: TUserInfo | undefined | null) => void;
};
const userInStore = window.sessionStorage.getItem("user_info");
const AuthContext = createContext<TAuthContext>({
  user: null,
  handleSetUser: (userInfo = null) => console.log(userInfo),
});

export const AuthProvider = ({ children }: TWrapperProps) => {
  const [user, setUser] = useState<undefined | null | TUserInfo>(() =>
    userInStore ? JSON.parse(userInStore) : null,
  );

  const handleSetUser = useCallback(
    (userInfo: TUserInfo | undefined | null) => {
      if (
        (!user && userInfo) ||
        (user && !userInfo) ||
        (userInfo && JSON.stringify(userInfo) !== JSON.stringify(user))
      )
        setUser(userInfo);
    },
    // eslint-disable-next-line
    [],
  );

  useEffect(() => {
    if (user) window.sessionStorage.setItem("user_info", JSON.stringify(user));
    else window.sessionStorage.removeItem("user_info");
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, handleSetUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
