import clsx from "clsx";
import { useState } from "react";
import { toast } from "react-toastify";
import { Button } from "~/Components/Elements/Button";
import { Popper } from "~/Components/Elements/Popper";
import { GROUP_ROLE } from "~/constants/constants.app";
import {
  useDismissUserMutation,
  useSetRoleMutation,
} from "~/services/groupServices/groupService";
import { useAuthSelector } from "~/store/slices/authSlice";
import { execWithCatch } from "~/utils/execWithCatch";
import "./ManageUsersActionsButton.scss";

export type TManageUsersActionsButtonProps = {
  id: number;
  role: GROUP_ROLE;
  refetch?: () => void;
};

const userRoleAssets = {
  ADMIN: { title: "Set as user", icon: "icon-user", value: "MEMBER" },
  MEMBER: { title: "Set as admin", icon: "icon-user-tie", value: "ADMIN" },
};

export const ManageUsersActionsButton = ({
  id,
  role,
  refetch,
}: TManageUsersActionsButtonProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const { user } = useAuthSelector();
  const [setRole] = useSetRoleMutation();
  const [dismissUser] = useDismissUserMutation();

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
      () => setRole({ user_id: id, role: userRoleAssets[role].value }),
      { errorMessage: "Can't set role for this user" },
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
    <div ref={setAnchorEl} className="manage-users-actions-button">
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
          <div className="manage-users-actions-button__child-button-container">
            <Button
              variantKey="text"
              isBoldTextStyle={false}
              fullWidth
              onClick={handleSetRole}
              style={{ color: "white" }}
              sizeKey={["extra-small", "small"]}
              className={"manage-users-actions-button__child-button"}
              endIcon={
                <i
                  className={clsx(
                    userRoleAssets[role].icon,
                    "manage-users-actions-button__icon",
                  )}
                />
              }>
              {userRoleAssets[role].title}
            </Button>
            <div className={"manage-users-actions-button__divider"} />
            <Button
              variantKey="text"
              fullWidth
              onClick={handleDismissUser}
              sizeKey={["extra-small", "small"]}
              isBoldTextStyle={false}
              style={{ color: "white" }}
              className={"manage-users-actions-button__child-button"}
              endIcon={
                <i className="icon-user-minus manage-users-actions-button__icon" />
              }>
              Dismiss
            </Button>
          </div>
        </Popper>
      )}
    </div>
  );
};
