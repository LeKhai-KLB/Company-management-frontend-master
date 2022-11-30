import clsx from "clsx";
import { useState } from "react";
import { toast } from "react-toastify";
import { Button } from "~/Components/Elements/Button";
import { Popper } from "~/Components/Elements/Popper";
import {
  useDismissUserMutation,
  useSetRoleMutation,
} from "~/services/groupServices/groupService";
import { execWithCatch } from "~/utils/execWithCatch";
import "./PendingUsersActionsButton.scss";
import { GROUP_ROLE } from "../../../../constants/constants.app";
import { useAuthSelector } from "~/store/slices/authSlice";

export type TPendingUsersActionsButtonProps = {
  id: number;
  refetch?: () => void;
};

export const PendingUsersActionsButton = ({
  id,
  refetch,
}: TPendingUsersActionsButtonProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [setRole] = useSetRoleMutation();
  const [dismissUser] = useDismissUserMutation();
  const { user } = useAuthSelector();

  const handleClickAway = () => {
    setOpen(false);
  };

  const handleClick = () => {
    setOpen(!open);
  };

  const handleSetRole = async () => {
    if (id === user?.id) {
      toast.warning("Can't set any config yourself");
      return;
    }
    const result = await execWithCatch(
      () => setRole({ user_id: id, role: GROUP_ROLE.MEMBER }),
      { errorMessage: "Can't add this user" },
    );
    if (result?.setRole) {
      refetch && (await refetch());
    }
  };

  const handleDismissUser = async () => {
    if (id === user?.id) {
      toast.warning("Can't set any config yourself");
      return;
    }
    const result = await execWithCatch(() => dismissUser({ user_id: id }), {
      errorMessage: "Can't dismiss this user",
    });
    if (result?.dismissUser) {
      refetch && (await refetch());
    }
  };

  return (
    <div ref={setAnchorEl} className="pending-users-actions-button">
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
          <div className="pending-users-actions-button__child-button-container">
            <Button
              variantKey="text"
              isBoldTextStyle={false}
              fullWidth
              onClick={handleSetRole}
              style={{ color: "white" }}
              sizeKey={["extra-small", "small"]}
              className={"pending-users-actions-button__child-button"}
              endIcon={
                <i
                  className={clsx(
                    "icon-user-plus",
                    "pending-users-actions-button__icon",
                  )}
                />
              }>
              Add user
            </Button>
            <div className={"pending-users-actions-button__divider"} />
            <Button
              variantKey="text"
              fullWidth
              onClick={handleDismissUser}
              sizeKey={["extra-small", "small"]}
              isBoldTextStyle={false}
              style={{ color: "white" }}
              className={"pending-users-actions-button__child-button"}
              endIcon={
                <i className="icon-bin2 pending-users-actions-button__icon" />
              }>
              Remove
            </Button>
          </div>
        </Popper>
      )}
    </div>
  );
};
