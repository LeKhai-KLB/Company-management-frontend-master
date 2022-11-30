import { useState } from "react";
import { Button } from "~/Components/Elements/Button";
import { Popper } from "~/Components/Elements/Popper";
import "./GroupActionsButton.scss";
import {
  useLeaveGroupMutation,
  useSetDefaultGroupMutation,
} from "~services/groupServices/groupService";
import { execWithCatch } from "~/utils/execWithCatch";
import { set_group_info } from "~/store/slices/groupSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useGroupSelector } from "~/store/slices/groupSlice/group.selector";

export type TGroupActionsButtonProps = {
  id?: string;
  isDefault?: boolean;
  refetch?: () => void;
};

export const GroupActionButton = ({
  id,
  isDefault,
  refetch,
}: TGroupActionsButtonProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [setDefaultGroup] = useSetDefaultGroupMutation();
  const [leaveGroup] = useLeaveGroupMutation();
  const { group } = useGroupSelector();
  const dispatch = useDispatch();

  const handleClickAway = () => {
    setOpen(false);
  };

  const handleClick = () => {
    setOpen(!open);
  };

  const handleSetDefaultGroup = async () => {
    if (isDefault) {
      toast.info("you was set default for the current group");
      return;
    }
    const result = await execWithCatch(
      () => setDefaultGroup({ group_id: id }),
      { errorMessage: "Can't set default for this group" },
    );
    if (result?.setDefaultGroup) {
      dispatch(set_group_info(result?.setDefaultGroup));
      refetch && (await refetch());
    }
  };

  const handleLeaveGroup = async () => {
    const result = await execWithCatch(() => leaveGroup({ group_id: id }));
    if (result) {
      if (id === group.id) {
        dispatch(set_group_info());
      }
      refetch && (await refetch());
    }
  };

  return (
    <div ref={setAnchorEl} className="group-actions-button">
      <Button
        variantKey={"text"}
        isBoldTextStyle={false}
        onClick={handleClick}
        sizeKey={["extra-small", "small"]}
        endIcon={
          <i className="icon-caret-down" style={{ fontSize: "12px" }} />
        }>
        Actions
      </Button>
      {anchorEl && open && (
        <Popper
          open={open}
          onClickAway={handleClickAway}
          anchorEl={anchorEl}
          placement={"bottom-end"}>
          <div className="group-actions-button__child-button-container">
            <Button
              variantKey="text"
              isBoldTextStyle={false}
              fullWidth
              onClick={handleSetDefaultGroup}
              style={{ color: "white" }}
              sizeKey={["extra-small", "small"]}
              className={"group-actions-button__child-button"}
              endIcon={
                <i className="icon-bookmark group-actions-button__icon" />
              }>
              Set as default
            </Button>
            <div className={"group-actions-button__divider"} />
            <Button
              variantKey="text"
              fullWidth
              onClick={handleLeaveGroup}
              sizeKey={["extra-small", "small"]}
              isBoldTextStyle={false}
              style={{ color: "white" }}
              className={"group-actions-button__child-button"}
              endIcon={<i className="icon-exit group-actions-button__icon" />}>
              leave
            </Button>
          </div>
        </Popper>
      )}
    </div>
  );
};
