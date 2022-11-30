import { useEffect, useState } from "react";
import { TSprintInfo } from "~services/projectServices/projectService.types";
import { TextField } from "../../Elements/Field/TextField/TextField";
import "./SprintInfoForm.scss";

export type TSprintInfoFormProps = {
  data?: TSprintInfo;
};

export const SprintInfoForm = ({ data }: TSprintInfoFormProps) => {
  const [currentData, setCurrentData] = useState(data);

  useEffect(
    () => {
      if (data && JSON.stringify(data) !== JSON.stringify(currentData)) {
        setCurrentData(data);
      }
    },
    // eslint-disable-next-line
    [data],
  );
  return (
    <div className={"sprint-info-form"}>
      <TextField
        fullWidth
        value={
          currentData
            ? new Date(data.start_date).toDateString()
            : new Date().toDateString()
        }
        sizeKey={["extra-small", "small"]}
        label="Start date"
        name="start_date"
      />
      <TextField
        fullWidth
        // style={{ marginLeft: "32px" }}
        value={
          currentData
            ? new Date(data.end_date).toDateString()
            : new Date().toDateString()
        }
        sizeKey={["extra-small", "small"]}
        label="End date"
        name="end_date"
      />
    </div>
  );
};
