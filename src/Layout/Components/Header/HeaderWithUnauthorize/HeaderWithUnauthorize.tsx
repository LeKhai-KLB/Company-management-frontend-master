import { memo } from "react";
import Box from "@mui/material/Box";
import { Button } from "~Components/Elements/Button";
import { BaseHeader } from "../BaseHeader";
import { useGlobalModal } from "~/Provider/GlobalModalProvider";
import { GLOBAL_MODAL_TYPE } from "~constants/constants.app";

export const HeaderWithUnauthorize = memo(() => {
  const { showModal } = useGlobalModal();

  const showLoginModal = () => {
    showModal({
      modalType: GLOBAL_MODAL_TYPE.LOGIN_MODAL,
    });
  };

  const showRegisterModal = () => {
    showModal({
      modalType: GLOBAL_MODAL_TYPE.REGISTER_MODAL,
    });
  };

  return (
    <BaseHeader>
      <Box sx={{ flexGrow: [0, 1, 1, 1, 1] }} />
      <Button
        onClick={showLoginModal}
        sx={{ mr: [3, 3, 4, 6] }}
        style={{ color: "white" }}
        sizeKey={"large"}
        variantKey={"text"}>
        login
      </Button>
      <Box sx={{ flexGrow: [1, 0, 0, 0, 0] }} />
      <Button
        onClick={showRegisterModal}
        sizeKey={"large"}
        variantKey={"submit"}>
        Register
      </Button>
    </BaseHeader>
  );
});
