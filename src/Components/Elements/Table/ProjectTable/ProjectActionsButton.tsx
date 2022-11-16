import { useState } from "react";
import { Button } from "~/Components/Elements/Button";
import { Popper } from "~/Components/Elements/Popper";
import "./ProjectActionsButton.scss";

export const ProjectActionButton = ({ id: string }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  const handleClickAway = () => {
    setOpen(false);
  };

  const handleClick = () => {
    setOpen(!open);
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
              style={{ color: "white" }}
              sizeKey={["extra-small", "small"]}
              className={"group-actions-button__child-button"}
              endIcon={<i className="icon-bookmark group-actions__icon" />}>
              Set as default
            </Button>
          </div>
        </Popper>
      )}
    </div>
  );
};
