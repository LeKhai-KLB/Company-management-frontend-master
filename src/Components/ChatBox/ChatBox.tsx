import { Button } from "../Elements/Button";
import { Input } from "../Elements/Input";
import "./ChatBox.scss";

export const ChatBox = () => {
  return (
    <div className="chat-box">
      <div className="message-box"></div>
      <div className="send-box">
        <Button
          style={{ width: "100px", marginLeft: "20px" }}
          variantKey="submit"
          sizeKey={["extra-small", "small"]}>
          SEND
        </Button>
        <Input
          placeholder="Type something..."
          className={"_input"}
          sizeKey={["extra-small", "small"]}
          fullWidth
        />
      </div>
    </div>
  );
};
