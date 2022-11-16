import { memo, Suspense } from "react";
import { Sidebar } from "../Components/Sidebar";
import { TWrapperProps } from "~utils/mixins.type";
import { HeaderWithAuthorize } from "../Components/Header";
import styles from "./MainLayout.module.scss";
import { useGetItemBelongsMediaQuery } from "../../hooks/media-query/useGetItemBelongsMediaQuery";
import { Spinner } from "~/Components/Elements/Spinner";

export const MainLayout = memo(({ children }: TWrapperProps) => {
  const [currentMedia] = useGetItemBelongsMediaQuery(["extra-small", "small"], {
    autoGetOtherItem: false,
  });

  return (
    <div className={styles["main-layout"]}>
      <HeaderWithAuthorize />
      <div className={styles["main-layout__content-container"]}>
        {!currentMedia && <Sidebar />}
        <div className={styles["main-layout__content"]}>
          <Suspense fallback={<Spinner color="white" size={40} />}>
            {children}
          </Suspense>
        </div>
      </div>
    </div>
  );
});
