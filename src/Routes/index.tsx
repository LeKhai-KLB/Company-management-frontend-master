import { ProtectedRoutes } from "./Protected";
import { useRoutes } from "react-router-dom";
import { Suspense } from "react";
import { PublicRoutes } from "./PublicRoutes";

export const AppRoutes = () => {
  const element = useRoutes([...ProtectedRoutes, ...PublicRoutes]);
  return <Suspense fallback={<div>Loading...</div>}>{element}</Suspense>;
};
