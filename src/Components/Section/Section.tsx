import { TWrapperProps } from "~/utils/mixins.type";
import "./Section.scss";

export type TSectionProps = TWrapperProps & {
  title?: string;
};

export const Section = ({
  title,
  children,
  className,
  style,
}: TSectionProps) => {
  return (
    <section className={"section " + className} style={style}>
      {title && <h2 className={"section__title"}>{title}</h2>}
      <div className={"section__devider"} />
      {children}
    </section>
  );
};
