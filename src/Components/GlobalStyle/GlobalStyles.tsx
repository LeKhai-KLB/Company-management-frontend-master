import { ReactNode } from "react";
import "./GlobalStyles.scss";

type globalStylesProps = {
  children: ReactNode;
};

export const GlobalStyles = ({ children }: globalStylesProps) => {
  return <>{children}</>;
};
