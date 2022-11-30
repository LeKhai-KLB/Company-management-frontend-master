import { Button } from "~/Components/Elements/Button";
import "./MyGroupTab.scss";
import { GroupInfoForm } from "~Components/Form/GroupInfoForm/GroupInfoForm";
import { useGlobalModal } from "~/Provider/GlobalModalProvider";
import { GLOBAL_MODAL_TYPE, GROUP_ROLE } from "~constants/constants.app";
import { useState } from "react";
import { useGroupSelector } from "~/store/slices/groupSlice/group.selector";
import { useTabController } from "~/Components/Tabs/Elements/TabController";
import { useDeleteGroupMutation } from "~/services/groupServices/groupService";
import { execWithCatch } from "~/utils/execWithCatch";
import { useDispatch } from "react-redux";
import { set_group_info } from "~/store/slices/groupSlice";

export const MyGroupTab = () => {
  const [isFormReadOnly, setIsFormReadOnly] = useState(false);
  const { setTabValue } = useTabController();
  const { showModal, hideModal } = useGlobalModal();
  const { group } = useGroupSelector();
  const [deleteGroup] = useDeleteGroupMutation();
  const dispatch = useDispatch();

  const handleShowNewGroupModal = () => {
    showModal({
      modalType: GLOBAL_MODAL_TYPE.NEW_GROUP_MODAL,
    });
  };

  const handleShowManageUsersModal = () => {
    showModal({
      modalType: GLOBAL_MODAL_TYPE.MANAGE_USERS_MODAL,
    });
  };

  const handleShowDeleteGroupModal = () => {
    showModal({
      modalType: GLOBAL_MODAL_TYPE.BASE_MODAL,
      modalConfigProps: {
        variantKey: "confirm",
        children: "Confirm delete this group?",
        title: "WARNING!",
        onConfirm: async () => {
          const result = await execWithCatch(() => deleteGroup());
          if (result?.deleteGroup) {
            dispatch(set_group_info());
          }
          hideModal();
        },
      },
    });
  };

  return (
    <div className="my-group-tab">
      <div className="my-group-tab__toolbar">
        <div className="my-group-tab__left-tool-bar">
          {group && (
            <>
              {group.role === GROUP_ROLE.ADMIN && (
                <Button
                  variantKey={"toggle-to-active"}
                  className={"my-group-tab__left-toolbar__button"}
                  sizeKey={["extra-small", "small"]}
                  onClick={() => setIsFormReadOnly(!isFormReadOnly)}>
                  <i className={"icon-edit"} />
                </Button>
              )}
              <Button
                variantKey={"text"}
                sizeKey={["extra-small", "small"]}
                onClick={handleShowManageUsersModal}
                className={"my-group-tab__left-toolbar__button"}>
                <i className={"icon-users"} />
              </Button>
              {group.role === GROUP_ROLE.ADMIN && (
                <Button
                  variantKey={"text"}
                  sizeKey={["extra-small", "small"]}
                  className={"my-group-tab__left-toolbar__button"}
                  onClick={handleShowDeleteGroupModal}>
                  <i className={"icon-bin2"} />
                </Button>
              )}
            </>
          )}
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
        {group ? (
          <GroupInfoForm formData={group} readOnly={isFormReadOnly} />
        ) : (
          <div className="my-group-tab__notify">
            You did not set default group. Please set default group in{" "}
            <span
              onClick={() => setTabValue(1)}
              className="my-group-tab__form-link">
              Manage Group tab
            </span>{" "}
            or create new group
          </div>
        )}
      </div>
    </div>
  );
};
