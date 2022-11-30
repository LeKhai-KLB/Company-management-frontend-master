import { ChangeEvent, useState } from "react";
import { toast } from "react-toastify";
import { Button } from "~/Components/Elements/Button";
import { Input } from "~/Components/Elements/Input";
import { useGlobalModal } from "~/Provider/GlobalModalProvider";
import { useJoinGroupMutation } from "~/services/groupServices/groupService";
import { execWithCatch } from "~/utils/execWithCatch";
import "./JoinGroupForm.scss";

export type TJoinGroupFormProps = {
  refetch?: () => void;
};

export const JoinGroupForm = ({ refetch }: TJoinGroupFormProps) => {
  const [value, setValue] = useState("");
  const [joinGroup] = useJoinGroupMutation();
  const { hideModal } = useGlobalModal();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleJoinGroup = async () => {
    if (!value) {
      toast.error("Please enter your group id");
    } else {
      const result = await execWithCatch(() => joinGroup({ group_id: value }), {
        errorMessage: "Cant find this group",
      });
      if (!result) {
        return;
      }
      refetch && (await refetch());
      hideModal();
    }
  };

  return (
    <div className={"join-group-form"}>
      <Input
        value={value}
        onChange={handleChange}
        sizeKey={["extra-small", "small"]}
        placeholder="Group id..."
        className="join-group-form__input"
      />
      <Button
        variantKey={"submit"}
        onClick={handleJoinGroup}
        sizeKey={["extra-small", "small"]}
        className={"join-group-form__button"}>
        join
      </Button>
    </div>
  );
};
