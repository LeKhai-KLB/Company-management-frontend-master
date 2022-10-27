import { Suspense, useEffect } from "react";
import { ProtectedRoutes } from "./ProtectedRoutes";
import { useRoutes, useNavigate } from "react-router-dom";
import { PublicRoutes } from "./PublicRoutes";
import { useCheckCurrentSessionQuery } from "~/services/authServices";
import { useAuth } from "~Provider/AuthProvider";
import { Spinner } from "~/Components/Elements/Spinner";

export const AppRoutes = () => {
  const { loading, data } = useCheckCurrentSessionQuery();
  const nav = useNavigate();
  const { handleSetUser } = useAuth();
  const element = useRoutes([...ProtectedRoutes, ...PublicRoutes]);

  useEffect(() => {
    handleSetUser(data);
    if (data) nav("./app");
  }, [data, handleSetUser, nav]);

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
