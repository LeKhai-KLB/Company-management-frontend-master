import { useState } from "react";
import { Button } from "~/Components/Elements/Button";
import { Popper } from "~/Components/Elements/Popper";
import { TBaseAvatarProps, BaseAvatar } from "../BaseAvatar/BaseAvatar";
import "./MainAvatar.scss";
import { useLogoutQuery } from "~/services/authServices";
import { execWithCatch } from "~/utils/execWithCatch";
import { useNavigate } from "react-router-dom";
import { resetAllSlice } from "~/store/slices/resetAllSlice";
import { useDispatch } from "react-redux";

export const MainAvatar = (props: TBaseAvatarProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [open, setOpen] = useState(false);
  const [logout, { loading }] = useLogoutQuery();
  const dispatch = useDispatch();
  const nav = useNavigate();

  const handleClickAway = () => {
    setOpen(false);
  };

  const handleClick = () => {
    setOpen(!open);
  };

  const handleLogout = async () => {
    const data = await execWithCatch(() => logout());
    if (data) {
      resetAllSlice(dispatch);

      setTimeout(() => {
        nav("../");
      }, 300);
    }
  };

  return (
    <div ref={setAnchorEl} className={"main-avatar"}>
      <BaseAvatar {...props} onClick={handleClick} />
      {anchorEl && open && (
        <Popper
          onClickAway={handleClickAway}
          anchorEl={anchorEl}
          open={open}
          placement={"bottom-end"}
          modifiers={[
            {
              name: "offset",
              options: {
                offset: [0, 16],
              },
            },
          ]}>
          <Button
            loading={loading}
            style={{ color: "white" }}
            endIcon={<i className="icon-exit" style={{ fontSize: "14px" }} />}
            onClick={handleLogout}>
            logout
          </Button>
        </Popper>
      )}
    </div>
  );
};
