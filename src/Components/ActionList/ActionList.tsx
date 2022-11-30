import { ACTION } from "~/constants/constants.app";
import { useGlobalModal } from "~/Provider/GlobalModalProvider";
import { ActionBoard } from "../ActionBoard";
import { Button } from "../Elements/Button";
import "./ActionList.scss";
import { GLOBAL_MODAL_TYPE } from "../../constants/constants.app";
import { useGetTaskListQuery } from "~/services/taskService/taskService";
import { useEffect } from "react";

export type TActionList = {
  sprint_id?: number;
};

export const ActionList = ({ sprint_id }: TActionList) => {
  const { showModal } = useGlobalModal();
  const { data, refetch } = useGetTaskListQuery(sprint_id);

  useEffect(
    () => {
      refetch({ variables: { sprint_id } });
    },
    // eslint-disable-next-line
    [sprint_id],
  );

  console.log(data);

  const handleClick = () => {
    showModal({
      modalType: GLOBAL_MODAL_TYPE.NEW_TASK_MODAL,
      modalConfigProps: { onConfirm: () => refetch() },
      modalContentProps: { sprint_id: sprint_id },
    });
  };
  return (
    <div>
      <div
        style={{ width: "100%", display: "flex", justifyContent: "flex-end" }}>
        <Button
          sizeKey={["extra-small", "small"]}
          className={"workspace__button"}
          variantKey={"submit"}
          onClick={handleClick}
          style={{ marginBottom: "16px" }}>
          Add card
        </Button>
      </div>
      <div className="action-list">
        <ActionBoard
          type={ACTION.TODO}
          data={data && data.filter((data) => data.tag === "TODO")}
          refetch={() => refetch()}
        />
        <ActionBoard
          type={ACTION.DOING}
          data={data && data.filter((data) => data.tag === "DOING")}
          refetch={() => refetch()}
        />
        <ActionBoard
          type={ACTION.DONE}
          data={data && data.filter((data) => data.tag === "DONE")}
          refetch={() => refetch()}
        />
      </div>
    </div>
  );
};
