import { memo, Suspense } from "react";
import { HeaderWithUnauthorize } from "../Components/Header";
import { TWrapperProps } from "~utils/mixins.type";
import { Spinner } from "~/Components/Elements/Spinner";
import styles from "./LandingLayout.module.scss";

export const LandingLayout = memo(({ children }: TWrapperProps) => {
  return (
    <div className={styles["landing-layout"]}>
      <HeaderWithUnauthorize />
      <Suspense fallback={<Spinner size={40} color="white" />}>
        {children}
      </Suspense>
    </div>
  );
});
