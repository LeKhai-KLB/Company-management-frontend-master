import { ACTION } from "~/constants/constants.app";
import { Button } from "../Elements/Button";
import { TextField } from "../Elements/Field";
import "./ActionCard.scss";
import { TTaskInfo } from "~/services/taskService";
import { useSetTagMutation } from "~/services/taskService/taskService";

export type TActionCardProps = {
  type: ACTION;
  data?: TTaskInfo;
  refetch?: () => void;
};

export const setValue = {
  TODO: "DOING",
  DOING: "DONE",
};

export const ActionCard = ({ type, data, refetch }: TActionCardProps) => {
  const [setTag] = useSetTagMutation();

  const handleSetTag = async () => {
    setTag({ task_id: data.id, tag: setValue[type] });
    refetch && (await refetch());
  };

  return (
    <div className="action-card">
      <div style={{ width: "100%", textAlign: "center" }}>
        {data?.task_name}
      </div>
      <TextField label={"Content:"} value={data?.content} />
      <TextField label={"Point:"} value={data?.point} />
      <Button fullWidth sizeKey={"extra-small"} style={{ marginTop: "8px" }}>
        Edit
      </Button>
      {type !== ACTION.DONE && (
        <Button
          onClick={handleSetTag}
          fullWidth
          sizeKey={"extra-small"}
          style={{ marginTop: "8px" }}>
          Set as {setValue[type]}
        </Button>
      )}
    </div>
  );
};
