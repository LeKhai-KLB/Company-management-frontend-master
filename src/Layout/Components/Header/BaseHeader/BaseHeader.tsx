import { memo } from "react";
import "./BaseHeader.scss";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { TWrapperProps } from "~/utils/mixins.type";

export const BaseHeader = memo(({ children }: TWrapperProps) => {
  return (
    <AppBar className={"header"} position={"fixed"}>
      <Toolbar>{children}</Toolbar>
    </AppBar>
  );
});
