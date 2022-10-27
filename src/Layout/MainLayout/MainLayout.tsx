import { memo, Suspense, useCallback, useState } from "react";
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
  const [currentTab, setCurrentTab] = useState(0);

  const handleDirect = useCallback(
    (index: number) => {
      setCurrentTab(index);
    },
    // eslint-disable-next-line
    [],
  );

  return (
    <div className={styles["main-layout"]}>
      <HeaderWithAuthorize
        modalPayload={{
          tab: currentTab,
          onDirect: handleDirect,
        }}
      />
      <div className={styles["main-layout__content-container"]}>
        {!currentMedia && <Sidebar tab={currentTab} onDirect={handleDirect} />}
        <div className={styles["main-layout__content"]}>
          <Suspense fallback={<Spinner color="white" size={40} />}>
            {children}
          </Suspense>
        </div>
      </div>
    </div>
  );
});
