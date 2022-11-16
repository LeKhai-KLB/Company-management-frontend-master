import { TManageGroup } from "~/services/groupServices";
import { GroupTable } from "~/Components/Elements/Table";
import { SearchBar } from "~/Components/SearchBar";
import "./ManageGroupTab.scss";
import { Button } from "~/Components/Elements/Button";
import { useGlobalModal } from "~/Provider/GlobalModalProvider";
import { GLOBAL_MODAL_TYPE, GROUP_ROLE } from "~/constants/constants.app";

const groupData: Array<TManageGroup> = [
  {
    id: "1234abc",
    group_name: "Halo",
    role: GROUP_ROLE.PENDING,
  },
  {
    id: "1234abc",
    group_name: "Oke nha ban",
    role: GROUP_ROLE.ADMIN,
    isDefaultGroup: true,
  },
  {
    id: "1234abc",
    group_name: "halo",
    role: GROUP_ROLE.MEMBER,
  },
  {
    id: "1234abc",
    group_name: "halo",
    role: GROUP_ROLE.ADMIN,
  },
  {
    id: "1234abc",
    group_name: "halo",
    role: GROUP_ROLE.MEMBER,
  },
  {
    id: "1234abc",
    group_name: "halo",
    role: GROUP_ROLE.PENDING,
  },
];

export const ManageGroupTab = () => {
  const { showModal } = useGlobalModal();

  const handleChange = (value: string) => {
    console.log(value);
  };

  const handleClickJoinGroup = () => {
    showModal({
      modalType: GLOBAL_MODAL_TYPE.JOIN_GROUP_MODAL,
    });
  };

  return (
    <div className={"manage-group-tab"}>
      <div className={"manage-group-tab__tool-bar"}>
        <div className={"manage-group-tab__tool-bar-left"}>
          <Button
            sizeKey={["extra-small", "small"]}
            className={"manage-group-tab__join-group-button"}
            variantKey={"submit"}
            onClick={handleClickJoinGroup}>
            Join new group
          </Button>
        </div>
        <div className={"manage-group-tab__tool-bar-right"}>
          <SearchBar
            placeholder="Group name, id..."
            onChange={handleChange}
            className={"manage-group-tab__searchbar"}
          />
        </div>
      </div>
      <GroupTable groupData={groupData} />
    </div>
  );
};
