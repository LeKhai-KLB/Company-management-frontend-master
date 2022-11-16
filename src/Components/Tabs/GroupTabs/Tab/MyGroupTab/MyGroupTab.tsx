import { Button } from "~/Components/Elements/Button";
import "./MyGroupTab.scss";
import { GroupInfoForm } from "~Components/Form/GroupInfoForm/GroupInfoForm";
import { TGroupInfo } from "~/services/groupServices";
import { useGlobalModal } from "~/Provider/GlobalModalProvider";
import { GLOBAL_MODAL_TYPE } from "~constants/constants.app";
import { useState } from "react";

const groupData: TGroupInfo = {
  id: "asfwes243254UUUO324",
  group_name: "New group",
  summary: "This is a new group",
  create_at: new Date(),
};

export const MyGroupTab = () => {
  const [isFormReadOnly, setIsFormReadOnly] = useState(false);
  const { showModal, hideModal } = useGlobalModal();

  const handleShowNewGroupModal = () => {
    showModal({
      modalType: GLOBAL_MODAL_TYPE.NEW_GROUP_MODAL,
    });
  };

  const handleShowDeleteGroupModal = () => {
    showModal({
      modalType: GLOBAL_MODAL_TYPE.BASE_MODAL,
      modalConfigProps: {
        children: "Confirm delete your account?",
        title: "DELETE GROUP",
        onConfirm: () => {
          console.log("Deleted form!");
          hideModal();
        },
      },
    });
  };

  return (
    <div className="my-group-tab">
      <div className="my-group-tab__toolbar">
        <div className="my-group-tab__left-tool-bar">
          <Button
            variantKey={"toggle-to-active"}
            className={"my-group-tab__left-toolbar__button"}
            sizeKey={["extra-small", "small"]}
            onClick={() => setIsFormReadOnly(!isFormReadOnly)}>
            <i className={"icon-edit"} />
          </Button>
          <Button
            variantKey={"text"}
            sizeKey={["extra-small", "small"]}
            className={"my-group-tab__left-toolbar__button"}>
            <i className={"icon-users"} />
          </Button>
          <Button
            variantKey={"text"}
            sizeKey={["extra-small", "small"]}
            className={"my-group-tab__left-toolbar__button"}
            onClick={handleShowDeleteGroupModal}>
            <i className={"icon-bin2"} />
          </Button>
        </div>
        <div className="my-group-tab__left-tool-bar">
          <Button
            variantKey={"submit"}
            sizeKey={["extra-small", "small"]}
            onClick={handleShowNewGroupModal}>
            New group
          </Button>
        </div>
      </div>
      <div className="my-group-tab__form">
        <GroupInfoForm formData={groupData} readOnly={isFormReadOnly} />
      </div>
    </div>
  );
};
