import { Outlet, Navigate } from "react-router-dom";
import { Landing } from "~Pages/Landing";
import { LandingLayout } from "~/Layout/LandingLayout";

const PublicApp = () => {
  return (
    <LandingLayout>
      <Outlet />
    </LandingLayout>
  );
};

export const PublicRoutes = [
  {
    path: "",
    element: <PublicApp />,
    children: [
      {
        path: "",
        element: <Landing />,
      },
      {
        path: "*",
        element: <Navigate to="." />,
      },
    ],
  },
];
