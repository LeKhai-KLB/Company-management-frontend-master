import { ImgHTMLAttributes, useCallback, useEffect, useState } from "react";
import placeholderImage from "~assets/images/placeholderImage.png";
import "./LazyImage.scss";

export type TLazyImageProps = ImgHTMLAttributes<HTMLImageElement>;

export const LazyImage = ({
  src,
  alt,
  className,
  style,
  ...props
}: TLazyImageProps) => {
  const [imgSrc, setImgSrc] = useState(placeholderImage || src);
  const [loading, setIsLoading] = useState(true);

  const onLoad = useCallback(() => {
    setImgSrc(src);
    setIsLoading(false);
  }, [setImgSrc, setIsLoading, src]);

  const onError = useCallback(() => {
    setIsLoading(false);
  }, [setIsLoading]);

  const onProgress = useCallback(() => {
    setIsLoading(true);
  }, [setIsLoading]);

  useEffect(
    () => {
      const image = new Image();
      if (src) {
        image.src = src;
        image.addEventListener("load", onLoad);
        image.addEventListener("error", onError);
        image.addEventListener("process", onProgress);
      } else {
        setIsLoading(false);
      }
      return () => {
        if (src) {
          image.removeEventListener("load", onLoad);
          image.removeEventListener("error", onError);
          image.removeEventListener("process", onProgress);
        }
      };
    },
    // eslint-disable-next-line
    [src],
  );

  return (
    <div className={"image-container " + className} style={style}>
      {!loading ? (
        <img
          className={"lazy-image"}
          loading={"lazy"}
          src={imgSrc}
          alt={alt || "unknown"}
          {...props}
        />
      ) : (
        <img
          className={"lazy-image--blur"}
          src={placeholderImage}
          alt={"loading"}
          {...props}
        />
      )}
    </div>
  );
};
