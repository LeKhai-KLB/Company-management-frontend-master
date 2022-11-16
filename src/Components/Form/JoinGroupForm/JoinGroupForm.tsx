import { ChangeEvent, useState } from "react";
import { Button } from "~/Components/Elements/Button";
import { Input } from "~/Components/Elements/Input";
import "./JoinGroupForm.scss";

export const JoinGroupForm = () => {
  const [value, setValue] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
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
        sizeKey={["extra-small", "small"]}
        className={"join-group-form__button"}>
        join
      </Button>
    </div>
  );
};
