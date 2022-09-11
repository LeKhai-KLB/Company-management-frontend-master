import { ReactNode } from "react";
import "./GlobalStyles.scss";

type globalStylesProps = {
  children: ReactNode;
};

export const GlobalStyles = ({ children }: globalStylesProps) => {
  return (
    <div className="global-styles">
      <i className="icon-pencil ic--small" />
      {children}
    </div>
  );
};
