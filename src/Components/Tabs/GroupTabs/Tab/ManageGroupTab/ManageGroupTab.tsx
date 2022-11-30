import { GroupTable } from "~/Components/Elements/Table";
import { Button } from "~/Components/Elements/Button";
import { useGlobalModal } from "~/Provider/GlobalModalProvider";
import { GLOBAL_MODAL_TYPE } from "~/constants/constants.app";
import "./ManageGroupTab.scss";
import { useGetGroupListQuery } from "~/services/groupServices/groupService";

export const ManageGroupTab = () => {
  const { showModal } = useGlobalModal();
  const { loading, data, refetch } = useGetGroupListQuery();

  const handleClickJoinGroup = () => {
    showModal({
      modalType: GLOBAL_MODAL_TYPE.JOIN_GROUP_MODAL,
      modalContentProps: {
        refetch: () => refetch(),
      },
    });
  };

  return (
    <div className={"manage-group-tab"}>
      <div className={"manage-group-tab__tool-bar"}>
        <div className={"manage-group-tab__tool-bar-left"}></div>
        <div className={"manage-group-tab__tool-bar-right"}>
          <Button
            sizeKey={["extra-small", "small"]}
            className={"manage-group-tab__join-group-button"}
            variantKey={"submit"}
            onClick={handleClickJoinGroup}>
            Join new group
          </Button>
        </div>
      </div>
      <GroupTable groupData={data} loading={loading} refetch={refetch} />
    </div>
  );
};
