import { useCallback, useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { MainLayout } from "~/Layout/MainLayout";
import { lazyImport } from "~utils/LazyImport";
import { useSkipSessionQuery } from "~/services/authServices";
import { useAuth } from "~/Provider/AuthProvider";
import { Spinner } from "~/Components/Elements/Spinner";
const { Cabinet } = lazyImport(() => import("~/Pages/Cabinet"), "Cabinet");
const { Profile } = lazyImport(() => import("~Pages/Profile"), "Profile");

const ProtectedApp = () => {
  const { user } = useAuth();
  const nav = useNavigate();

  const [skipSession] = useSkipSessionQuery();

  const handleSkipSession = useCallback(() => {
    skipSession();
  }, [skipSession]);

  useEffect(() => {
    // if (!user) {
    //   nav("../");
    // }
    window.addEventListener("beforeunload", handleSkipSession);
    return () => {
      window.removeEventListener("beforeunload", handleSkipSession);
    };
  }, [handleSkipSession, user, nav]);

  return (
    <>
      {!user ? (
        <MainLayout>
          <Outlet />
        </MainLayout>
      ) : (
        <Spinner size={40} color={"black"} />
      )}
    </>
  );
};

export const ProtectedRoutes = [
  {
    path: "/app",
    element: <ProtectedApp />,
    children: [
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "cabinet",
        element: <Cabinet />,
      },
      {
        path: "*",
        element: <Navigate to="profile" />,
      },
      {
        path: "",
        element: <Navigate to="profile" />,
      },
    ],
  },
];
