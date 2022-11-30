import clsx from "clsx";
import { memo, useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useGroupSelector } from "~/store/slices/groupSlice/group.selector";
import { TElementProps } from "~/utils/mixins.type";
import { NavLink } from "../NavLink";
import styles from "./Sidebar.module.scss";
import { useProjectSelector } from "../../../store/slices/projectSlice/project.selector";

type TNavLinkList = {
  to: string;
  name: string;
  icon: string;
};

const navLinkList = [
  { to: "profile", icon: "icon-profile", name: "Profile" },
  { to: "group", icon: "icon-group", name: "Group" },
  { to: "room", icon: "icon-live_tv", name: "Room" },
  { to: "project", icon: "icon-note-list", name: "Project" },
  { to: "workspace", icon: "icon-workspaces_filled", name: "Workspace" },
];

export type TSidebarProps = TElementProps & {
  onDirect?: (payload: any) => void;
  fullWidth?: boolean;
  containedByModal?: boolean;
};

export const Sidebar = memo(
  ({
    className,
    style,
    onDirect,
    fullWidth = false,
    containedByModal = false,
  }: TSidebarProps) => {
    const [currentNavLinkList] = useState<Array<TNavLinkList>>(() =>
      navLinkList.map((navLink) => {
        if (containedByModal) return { ...navLink, to: "app/" + navLink.to };
        return navLink;
      }),
    );
    const { pathname } = useLocation();
    const { group } = useGroupSelector();
    const { project } = useProjectSelector();
    const [currentTab, setCurrentTab] = useState(() => {
      const path = pathname.split("/")[2];
      if (!path) return 0;
      return navLinkList.findIndex((navLink) => navLink.to === path) || 0;
    });

    const handleOnclick = useCallback(
      async (index: number) => {
        onDirect && (await onDirect(index));
        setCurrentTab(index);
      },
      // eslint-disable-next-line
      [],
    );

    useEffect(
      () => {
        let newTab = 0;
        const path = pathname.split("/")[2];
        if (!path) newTab = 0;
        else
          newTab = navLinkList.findIndex((navLink) => navLink.to === path) || 0;
        if (newTab !== currentTab) {
          setCurrentTab(newTab);
        }
      },
      // eslint-disable-next-line
      [pathname],
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
          currentNavLinkList.map((navLink, index) => {
            if (navLink.to === "workspace" && !project)
              return <span key={index}></span>;
            if ((navLink.to === "room" || navLink.to === "project") && !group)
              return <span key={index}></span>;
            return (
              <NavLink
                key={index}
                to={navLink.to}
                icon={navLink.icon}
                onClick={() => handleOnclick(index)}
                isActive={currentTab === index}>
                {navLink.name}
              </NavLink>
            );
          })}
      </div>
    );
  },
);
