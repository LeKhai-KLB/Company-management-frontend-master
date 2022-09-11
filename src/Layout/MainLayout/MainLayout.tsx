import { memo, Suspense } from "react";
import { Header } from "../Components/Header";
import { Sidebar } from "../Components/Sidebar";
import { TWrapperProps } from "~utils/mixins.type";

export const MainLayout = memo(({ children }: TWrapperProps) => {
  return (
    <div>
      <Header />
      <div>
        <Sidebar />
        <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
      </div>
    </div>
  );
});
