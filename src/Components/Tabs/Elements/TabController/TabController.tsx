import {
  createContext,
  Dispatch,
  memo,
  useContext,
  useEffect,
  useState,
} from "react";
import { TWrapperProps } from "~/utils/mixins.type";
import { Tab, Tabs } from "@mui/material";
import "./TabController.scss";

export type TTabList = Array<{
  label: string | number;
  value: string | number;
  disabled?: boolean;
}>;

export type TTabListProps = TWrapperProps & {
  name?: string | number;
  tabList?: TTabList;
  currentValue?: string | number;
};

export type TTabContext = {
  tabName: string | number;
  tabValue: string | number;
  setTabValue: Dispatch<React.SetStateAction<string | number>>;
  setDisableTab: (val?: string | number) => void;
  setEnableTab: (val?: string | number) => void;
};

const TabContext = createContext<TTabContext>({
  tabName: "",
  tabValue: "",
  setTabValue: () => {},
  setDisableTab: () => {},
  setEnableTab: () => {},
});

function setNewTabBlackList(tabList: TTabList) {
  return tabList.reduce((results, tabInfo) => {
    return [...results, tabInfo?.disabled && tabInfo.value];
  }, []);
}

export const TabController = memo(
  ({
    tabList,
    currentValue,
    className,
    style,
    children,
    name,
  }: TTabListProps) => {
    const [tabValue, setTabValue] = useState(
      currentValue || tabList?.[0]?.value,
    );
    const [tabName] = useState(name);
    const [tabBlackList, setTabBlackList] = useState<Array<string | number>>(
      () => setNewTabBlackList(tabList),
    );

    // eslint-disable-next-line
    const handleChange = async (
      event: React.SyntheticEvent,
      newValue: string | number,
    ) => {
      setTabValue(newValue);
    };

    const setDisableTab = (tabVal: string | number) => {
      if (tabVal && !tabBlackList.includes(tabVal)) {
        setTabBlackList([...tabBlackList, tabVal]);
      }
    };

    const setEnableTab = (tabVal: string | number) => {
      if (tabVal && tabBlackList.includes(tabVal)) {
        setTabBlackList(
          tabBlackList.filter((val) => {
            return val !== tabVal;
          }),
        );
      }
    };

    useEffect(
      () => {
        const newTabBlackList = setNewTabBlackList(tabList);
        if (JSON.stringify(newTabBlackList) !== JSON.stringify(tabBlackList)) {
          setNewTabBlackList(newTabBlackList);
        }
      },
      // eslint-disable-next-line
      [tabList],
    );

    return (
      <TabContext.Provider
        value={{ tabValue, tabName, setTabValue, setDisableTab, setEnableTab }}>
        <div
          id={`${tabName}-tab-list`}
          className={`tab-controller ${className}`}
          style={style}>
          <Tabs
            className={"tab-controller__header"}
            value={tabValue}
            TabIndicatorProps={{ sx: { backgroundColor: "white" } }}
            allowScrollButtonsMobile
            variant={"scrollable"}
            onChange={handleChange}>
            {tabList &&
              tabList.map((tabInfo, index) => {
                return (
                  <Tab
                    label={tabInfo.label}
                    className={"tab-controller__tab"}
                    key={index}
                    disabled={tabBlackList.includes(tabInfo.value)}
                    id={`${tabName}-tab-${tabInfo.value}`}
                    value={tabInfo.value}
                  />
                );
              })}
          </Tabs>
          <div className={"tab-controller__tab-panel-container"}>
            {children}
          </div>
        </div>
      </TabContext.Provider>
    );
  },
);

export const useTabController = () => useContext(TabContext);
