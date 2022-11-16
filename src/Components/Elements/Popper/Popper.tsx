import {
  ClickAwayListener,
  Popper as MUIPopper,
  PopperProps,
} from "@mui/material";
import { clsx } from "clsx";
import { TWrapperProps } from "~/utils/mixins.type";
import "./Popper.scss";

export type TPopperProps = TWrapperProps &
  PopperProps & {
    onClickAway: () => void;
  };

export const Popper = ({
  children,
  className,
  style,
  anchorEl,
  open,
  placement,
  onClickAway,
  ...props
}: TPopperProps) => {
  return (
    <MUIPopper
      className={clsx("popper", className)}
      style={style}
      open={open}
      anchorEl={anchorEl}
      placement={placement}
      {...props}>
      <ClickAwayListener onClickAway={onClickAway}>
        <div>{children}</div>
      </ClickAwayListener>
    </MUIPopper>
  );
};
