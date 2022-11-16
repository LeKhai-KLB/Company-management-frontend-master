import { ChatBox } from "~/Components/ChatBox";
import { BaseModal } from "../BaseModal";

export const ChatModal = () => {
  return (
    <BaseModal
      position={"right"}
      title={"CHAT"}
      showCancelButton={false}
      showConfirmButton={false}>
      <ChatBox />
    </BaseModal>
  );
};
