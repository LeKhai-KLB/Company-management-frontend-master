import { memo } from "react";
import { Button } from "~/Components/Elements/Button";
import { LazyImage } from "~/Components/Elements/LazyImage";
import { GLOBAL_MODAL_TYPE } from "~/constants/constants.app";
import { useGlobalModal } from "~/Provider/GlobalModalProvider";
import img from "~assets/images/temp.png";
import "./Room.scss";

export const Room = memo(() => {
  const { showModal } = useGlobalModal();

  const handleClick = () => {
    showModal({ modalType: GLOBAL_MODAL_TYPE.CHAT_MODAL });
  };

  return (
    <div className="room">
      <div className="room__main-screen-container">
        <LazyImage className="room__main-screen" src={img} />
        <div className="remote-button-container">
          <div className="remote-button-container__tool-button">
            <Button
              variantKey={"toggle-to-active"}
              sizeKey={["small", "medium"]}>
              <i className="icon-camera" />
            </Button>
            <Button
              variantKey={"toggle-to-active"}
              sizeKey={["small", "medium"]}>
              <i className="icon-mic" />
            </Button>
            <Button
              variantKey={"toggle-to-active"}
              sizeKey={["small", "medium"]}>
              <i className="icon-monitor" />
            </Button>
            <Button sizeKey={["small", "medium"]} onClick={handleClick}>
              <i className="icon-bubbles2" />
            </Button>
            <Button variantKey={"danger"} sizeKey={["small", "medium"]}>
              <i className="icon-exit" />
            </Button>
          </div>
          <Button
            variantKey={"text"}
            sizeKey={["small", "medium"]}
            style={{ marginLeft: "20px" }}>
            <i className="icon-view-show" />
          </Button>
        </div>
      </div>
      <div className="room__member-screen-container">
        <LazyImage className="room__member-screen" src={img} />
      </div>
      <div className="room__toolbar"></div>
    </div>
  );
});
