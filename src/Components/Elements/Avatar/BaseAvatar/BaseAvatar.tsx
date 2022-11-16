import clsx from "clsx";
import { TElementProps } from "~/utils/mixins.type";
import { LazyImage } from "~/Components/Elements/LazyImage";
import "./BaseAvatar.scss";
import { MouseEventHandler } from "react";

export type TBaseAvatarProps = TElementProps & {
  size?: "small" | "medium" | "large";
  src?: string;
  alt?: string;
  onClick?: MouseEventHandler<HTMLDivElement>;
};

export const BaseAvatar = ({
  size = "medium",
  src,
  className,
  alt,
  style,
  onClick,
}: TBaseAvatarProps) => {
  return (
    <div
      style={style}
      className={clsx("avatar", `avatar--${size}`, className)}
      onClick={onClick}>
      <LazyImage src={src} alt={alt} />
    </div>
  );
};
