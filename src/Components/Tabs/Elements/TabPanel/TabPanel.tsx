import { TWrapperProps } from "~utils/mixins.type";
import { useTabController } from "../TabController";
import "./TabPanel.scss";
import { Suspense } from "react";
import { Spinner } from "~/Components/Elements/Spinner";

export type TTabPanelProps = TWrapperProps & {
  value?: string | number;
};

export const TabPanel = ({ value, children, ...props }: TTabPanelProps) => {
  const { tabValue, tabName } = useTabController();
  if (value !== tabValue) return null;
  return (
    <div className={"tab-panel"} id={`${tabName}-tabpanel-${value}`} {...props}>
      <Suspense fallback={<Spinner size={30} color={"white"} />}>
        {children}
      </Suspense>
    </div>
  );
};
