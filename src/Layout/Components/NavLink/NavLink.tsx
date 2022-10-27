import { useNavigate } from "react-router-dom";
import { TWrapperProps } from "~utils/mixins.type";
import "./NavLink.scss";
import clsx from "clsx";

export type TNavLinkProps = TWrapperProps & {
  to: string;
  icon: string;
  isActive?: boolean;
  onClick?: () => void;
};

export const NavLink = ({
  style,
  className,
  to,
  icon,
  isActive = false,
  children,
  onClick,
}: TNavLinkProps) => {
  const nav = useNavigate();
  const handleClick = async () => {
    onClick && (await onClick());
    nav(to);
  };

  return (
    <div
      style={style}
      className={clsx(
        "nav-link",
        "hover-effect",
        isActive && "nav-link--active",
        className,
      )}
      onClick={handleClick}>
      <div
        className={clsx("nav-link__dot", !isActive && "visibility--hidden")}
      />
      <i className={`${icon} nav-link__icon`} />
      <div className={"nav-link__content"}>{children}</div>
    </div>
  );
};
