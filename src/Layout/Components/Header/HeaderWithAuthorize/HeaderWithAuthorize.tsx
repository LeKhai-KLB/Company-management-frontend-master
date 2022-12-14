import Box from "@mui/material/Box";
import { MainAvatar } from "~/Components/Elements/Avatar/MainAvatar";
import { GLOBAL_MODAL_TYPE } from "~/constants/constants.app";
import { useGetItemBelongsMediaQuery } from "~/hooks/media-query";
import { useGlobalModal } from "~/Provider/GlobalModalProvider";
import { useAuthSelector } from "~/store/slices/authSlice";
import { BaseHeader } from "../BaseHeader";

export type THeaderWithAuthorizeProps = {
  modalPayload?: any;
};

export const HeaderWithAuthorize = ({
  modalPayload,
}: THeaderWithAuthorizeProps) => {
  const [currentMediaQuery] = useGetItemBelongsMediaQuery<string | undefined>(
    ["extra-small", "small"],
    { autoGetOtherItem: false },
  );
  const { showModal } = useGlobalModal();
  const { user } = useAuthSelector();

  return (
    <BaseHeader>
      {currentMediaQuery && (
        <i
          onClick={() =>
            showModal({
              modalType: GLOBAL_MODAL_TYPE.SIDEBAR_MODAL,
              modalContentProps: modalPayload,
            })
          }
          className={"icon-menu"}
          style={{
            fontSize: 24,
            cursor: "pointer",
          }}
        />
      )}
      <Box sx={{ flexGrow: 1 }} />
      <MainAvatar src={user.avatar} alt={user.username}></MainAvatar>
    </BaseHeader>
  );
};
