import { memo, Suspense } from "react";
import { Header } from "../Components/Header";
import { TWrapperProps } from "~utils/mixins.type";

export const LandingLayout = memo(({ children }: TWrapperProps) => {
  return (
    <div>
      <Header />
      <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
    </div>
  );
});
