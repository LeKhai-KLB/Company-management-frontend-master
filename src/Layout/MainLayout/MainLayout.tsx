import { memo, Suspense, useEffect } from "react";
import { Sidebar } from "../Components/Sidebar";
import { TWrapperProps } from "~utils/mixins.type";
import { HeaderWithAuthorize } from "../Components/Header";
import styles from "./MainLayout.module.scss";
import { useGetItemBelongsMediaQuery } from "~hooks/media-query/useGetItemBelongsMediaQuery";
import { Spinner } from "~/Components/Elements/Spinner";
import { useGetDefaultGroupQuery } from "~/services/groupServices/groupService";
import { set_group_info } from "~/store/slices/groupSlice";
import { useDispatch } from "react-redux";

export const MainLayout = memo(({ children }: TWrapperProps) => {
  const [currentMedia] = useGetItemBelongsMediaQuery(["extra-small", "small"], {
    autoGetOtherItem: false,
  });
  const { data } = useGetDefaultGroupQuery();
  const dispatch = useDispatch();

  useEffect(
    () => {
      dispatch(set_group_info(data));
    },
    // eslint-disable-next-line
    [data],
  );

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
