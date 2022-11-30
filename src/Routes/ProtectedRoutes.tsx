import { useCallback, useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { MainLayout } from "~/Layout/MainLayout";
import { lazyImport } from "~utils/LazyImport";
import { useSkipSessionQuery } from "~/services/authServices";
import { useAuthSelector } from "~/store/slices/authSlice";
const { Cabinet } = lazyImport(() => import("~/Pages/Cabinet"), "Cabinet");
const { Profile } = lazyImport(() => import("~Pages/Profile"), "Profile");
const { Group } = lazyImport(() => import("~Pages/Group"), "Group");
const { Room } = lazyImport(() => import("~Pages/Room"), "Room");
const { Project } = lazyImport(() => import("~Pages/Project"), "Project");
const { Workspace } = lazyImport(() => import("~Pages/Workspace"), "Workspace");

const ProtectedApp = () => {
  const nav = useNavigate();
  const { authenticated } = useAuthSelector();

  const [skipSession] = useSkipSessionQuery();

  const handleSkipSession = useCallback(() => {
    skipSession();
  }, [skipSession]);

  useEffect(() => {
    window.addEventListener("beforeunload", handleSkipSession);
    return () => {
      window.removeEventListener("beforeunload", handleSkipSession);
    };
  }, [handleSkipSession, authenticated, nav]);

  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
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
        path: "group",
        element: <Group />,
      },
      {
        path: "cabinet",
        element: <Cabinet />,
      },
      {
        path: "room",
        element: <Room />,
      },
      {
        path: "project",
        element: <Project />,
      },
      {
        path: "workspace",
        element: <Workspace />,
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
