import clsx from "clsx";
import { useState } from "react";
import { Button } from "~/Components/Elements/Button";
import { TYPOGRAPHY_SIZE } from "~/constants/constants.app";
import {
  TSizeKeyWithBreakpoint,
  useGetSizeBelongsMediaQuery,
} from "~/hooks/media-query";
import { useGlobalModal } from "~/Provider/GlobalModalProvider";
import { TWrapperProps } from "~utils/mixins.type";
import "./BaseModal.scss";

export type TModalVariants = {
  [key: string]: {
    showConfirmButton: boolean;
    showCancelButton: boolean;
  };
};

const variants: TModalVariants = {
  confirm: {
    showConfirmButton: true,
    showCancelButton: true,
  },
  infomation: { showConfirmButton: true, showCancelButton: false },
  custom: { showConfirmButton: false, showCancelButton: false },
};

export type TBaseModalProps = TWrapperProps & {
  title?: string;
  position?: "left" | "right" | "center";
  onConfirm?: () => void;
  onCancel?: () => void;
  sizeKey?: TSizeKeyWithBreakpoint;
  showConfirmButton?: boolean;
  showCancelButton?: boolean;
  variantKey?: "confirm" | "infomation" | "custom";
};

export const BaseModal = ({
  title,
  position = "center",
  onConfirm,
  showConfirmButton = true,
  showCancelButton = true,
  variantKey = "custom",
  style,
  sizeKey = ["small", "medium", "medium", "large"],
  className,
  children,
}: TBaseModalProps) => {
  const [currentSizeKey] = useGetSizeBelongsMediaQuery(sizeKey);
  const [loading, setIsLoading] = useState(false);
  const { hideModal } = useGlobalModal();

  const handleCancel = async () => {
    await hideModal();
  };

  const handleConfirm = async () => {
    setIsLoading(true);
    onConfirm && (await onConfirm());
    setIsLoading(false);
  };

  return (
    <div
      style={{
        fontSize: currentSizeKey && TYPOGRAPHY_SIZE[currentSizeKey],
        ...style,
      }}
      className={clsx(
        "base-modal",
        position && `base-modal--${position}`,
        className,
      )}>
      {(variants[variantKey] || title) && (
        <title
          className={clsx(
            "base-modal__title",
            position !== "center" && "base-modal__title--side-effect",
          )}>
          {title}
          <i
            onClick={handleCancel}
            className={clsx(
              "icon-close",
              "hover-effect",
              "base-modal__cancel-icon",
              position !== "center" && `base-modal__cancel-icon--${position}`,
            )}
          />
        </title>
      )}
      <div
        className={clsx(
          "base-modal__content",
          position && `base-modal__content--${position}`,
        )}>
        {children}
      </div>
      <div className="base-modal__footer">
        {(variants[variantKey].showConfirmButton || showConfirmButton) && (
          <Button
            onClick={handleConfirm}
            loading={loading}
            style={{ borderRadius: "0px" }}
            variantKey="submit"
            sizeKey={["extra-small", "small"]}>
            Ok
          </Button>
        )}
        {(variants[variantKey].showCancelButton || showCancelButton) && (
          <Button
            onClick={handleCancel}
            style={{ borderRadius: "0px" }}
            variantKey="cancel"
            sizeKey={["extra-small", "small"]}>
            Cancel
          </Button>
        )}
      </div>
    </div>
  );
};
