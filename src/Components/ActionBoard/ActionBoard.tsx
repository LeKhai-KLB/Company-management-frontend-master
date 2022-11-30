import { ACTION } from "~/constants/constants.app";
import { ActionCard } from "../ActionCard";
import "./ActionBoard.scss";
import { TTaskInfo } from "../../services/taskService/taskService.types";

export type TActionBoardProps = {
  type: ACTION;
  data?: TTaskInfo[];
  refetch?: () => void;
};

export const ActionBoard = ({ type, data, refetch }: TActionBoardProps) => {
  return (
    <div className="action-board">
      <span style={{ fontWeight: "bold", marginBottom: "12px" }}>
        {ACTION[type]}
      </span>
      <div
        style={{
          fontWeight: "bold",
          display: "flex",
          justifyContent: "center",
        }}></div>
      <div className="action-board__card-container">
        {data &&
          data.map((task, index) => (
            <ActionCard key={index} type={type} data={task} refetch={refetch} />
          ))}
      </div>
    </div>
  );
};
