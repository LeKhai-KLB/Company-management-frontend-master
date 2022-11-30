import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "~/Components/Elements/Button";
import { Popper } from "~/Components/Elements/Popper";
import { useSetDefaultProjectMutation } from "~/services/projectServices";
import { set_project_info } from "~/store/slices/projectSlice";
import { useProjectSelector } from "~/store/slices/projectSlice/project.selector";
import { execWithCatch } from "~/utils/execWithCatch";
import "./ProjectActionsButton.scss";

export type TProjectActionsButtonProps = {
  id: string;
  isDefault?: boolean;
  refetch?: () => void;
};

export const ProjectActionButton = ({
  id,
  isDefault,
  refetch,
}: TProjectActionsButtonProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLDivElement>(null);
  const [setDefaultProject] = useSetDefaultProjectMutation();
  const [open, setOpen] = useState(false);
  const { project } = useProjectSelector();
  const dispatch = useDispatch();
  const nav = useNavigate();

  const handleClickAway = () => {
    setOpen(false);
  };

  const handleClick = () => {
    setOpen(!open);
  };

  const handleSetDefaultProject = async () => {
    if (id === project?.id) {
      return;
    }
    const result = await execWithCatch(
      () => setDefaultProject({ project_id: id }),
      { errorMessage: "Can't open this project" },
    );
    if (result?.setDefaultProject) {
      dispatch(set_project_info(result?.setDefaultProject));
      refetch && (await refetch());
      setTimeout(() => {
        nav("../workspace");
      }, 400);
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
              onClick={handleSetDefaultProject}
              style={{ color: "white" }}
              sizeKey={["extra-small", "small"]}
              className={"group-actions-button__child-button"}
              endIcon={<i className="icon-bookmark group-actions__icon" />}>
              Open
            </Button>
            <Button
              variantKey="text"
              fullWidth
              sizeKey={["extra-small", "small"]}
              isBoldTextStyle={false}
              style={{ color: "white" }}
              className={"group-actions-button__child-button"}
              endIcon={
                <i className="icon-pencil pending-users-actions-button__icon" />
              }>
              Edit
            </Button>
            <Button
              variantKey="text"
              fullWidth
              sizeKey={["extra-small", "small"]}
              isBoldTextStyle={false}
              style={{ color: "white" }}
              className={"group-actions-button__child-button"}
              endIcon={
                <i className="icon-bin2 pending-users-actions-button__icon" />
              }>
              Delete
            </Button>
          </div>
        </Popper>
      )}
    </div>
  );
};
