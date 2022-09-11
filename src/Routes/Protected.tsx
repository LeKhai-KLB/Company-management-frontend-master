import { Navigate, Outlet } from "react-router-dom";
import { MainLayout } from "~/Layout/MainLayout";
import { lazyImport } from "~utils/LazyImport";
const { Home } = lazyImport(() => import("~Pages/Home"), "Home");
const { Profile } = lazyImport(() => import("~Pages/Profile"), "Profile");

const ProtectedApp = () => {
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
        path: "",
        element: <Home />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "*",
        element: <Navigate to="" />,
      },
    ],
  },
];
