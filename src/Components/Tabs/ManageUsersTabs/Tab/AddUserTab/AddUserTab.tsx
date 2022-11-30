import { ChangeEvent, useState } from "react";
import { Button } from "~/Components/Elements/Button";
import { Input } from "~/Components/Elements/Input";
import "./AddUserTab.scss";
import { useAddMemberViaEmailMutation } from "~services/groupServices/groupService";
import { toast } from "react-toastify";
import { execWithCatch } from "~/utils/execWithCatch";

export const AddUserTab = () => {
  const [value, setValue] = useState("");
  const [addMember] = useAddMemberViaEmailMutation();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleAddMember = async () => {
    if (!value) {
      toast.error("Please input user email");
      return;
    }
    await execWithCatch(() => addMember({ email: value }), {
      errorMessage: "Can't add this member",
    });
  };

  return (
    <div className={"add-user-tab"}>
      <Input
        value={value}
        onChange={handleChange}
        sizeKey={["extra-small", "small"]}
        placeholder="Email..."
        className="add-user-tab__input"
      />
      <Button
        variantKey={"submit"}
        onClick={handleAddMember}
        sizeKey={["extra-small", "small"]}
        className={"add-user-tab__button"}>
        Add
      </Button>
    </div>
  );
};
