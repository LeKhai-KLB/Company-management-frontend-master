import { Suspense, useEffect } from "react";
import { ProtectedRoutes } from "./ProtectedRoutes";
import { useRoutes, useNavigate } from "react-router-dom";
import { PublicRoutes } from "./PublicRoutes";
import { useCheckCurrentSessionQuery } from "~/services/authServices";
import { Spinner } from "~/Components/Elements/Spinner";
import { set_user, useAuthSelector } from "~/store/slices/authSlice";
import { useDispatch } from "react-redux";

export const AppRoutes = () => {
  const { loading, data } = useCheckCurrentSessionQuery();
  const { authenticated } = useAuthSelector();
  const nav = useNavigate();
  const element = useRoutes([...ProtectedRoutes, ...PublicRoutes]);
  const dispatch = useDispatch();

  useEffect(
    () => {
      if (data && !authenticated) {
        dispatch(set_user(data));
        nav("./app");
      }
    },
    // eslint-disable-next-line
    [data],
  );

  return (
    <>
      {loading ? (
        <Spinner color={"black"} size={40} />
      ) : (
        <Suspense fallback={<Spinner color={"black"} size={40} />}>
          {element}
        </Suspense>
      )}
    </>
  );
};
