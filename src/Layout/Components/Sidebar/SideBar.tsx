import clsx from "clsx";
import { memo, useCallback, useState } from "react";
import { TElementProps } from "~/utils/mixins.type";
import { NavLink } from "../NavLink";
import styles from "./Sidebar.module.scss";

type TNavLinkList = {
  to: string;
  name: string;
  icon: string;
};

const navLinkList = [
  { to: "profile", icon: "icon-profile", name: "Profile" },
  { to: "cabinet", icon: "icon-folder", name: "Cabinet" },
  { to: "room", icon: "icon-live_tv", name: "Room" },
  { to: "project", icon: "icon-note-list", name: "Project" },
];

export type TSidebarProps = TElementProps & {
  onDirect?: (payload: any) => void;
  fullWidth?: boolean;
  tab?: number;
  containedByModal?: boolean;
};

export const Sidebar = memo(
  ({
    className,
    style,
    onDirect,
    fullWidth = false,
    containedByModal = false,
    tab = 0,
  }: TSidebarProps) => {
    const [currentNavLinkList] = useState<Array<TNavLinkList>>(() =>
      navLinkList.map((navLink) => {
        if (containedByModal) return { ...navLink, to: "app/" + navLink.to };
        return navLink;
      }),
    );
    const [currentTab, setCurrentTab] = useState(tab);

    const handleOnclick = useCallback(
      async (index: number) => {
        onDirect && (await onDirect(index));
        setCurrentTab(index);
      },
      // eslint-disable-next-line
      [],
    );

    return (
      <div
        className={clsx(
          styles["sidebar"],
          styles[
            fullWidth ? "sidebar--full-width" : "sidebar--auto-responsive"
          ],
          className,
        )}
        style={style}>
        {currentNavLinkList &&
          currentNavLinkList.map((navLink, index) => (
            <NavLink
              key={index}
              to={navLink.to}
              icon={navLink.icon}
              onClick={() => handleOnclick(index)}
              isActive={currentTab === index}>
              {navLink.name}
            </NavLink>
          ))}
      </div>
    );
  },
);
