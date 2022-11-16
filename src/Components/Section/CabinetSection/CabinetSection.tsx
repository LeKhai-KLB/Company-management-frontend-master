import { Button } from "~/Components/Elements/Button";
import { BaseSection } from "../BaseSection";
import { AiFillFolder, AiFillFile } from "react-icons/ai";
import "./CabinetSection.scss";
import { Fragment } from "react";
import { LazyImage } from "~/Components/Elements/LazyImage";

const src =
  "https://media.istockphoto.com/id/1340716614/vi/anh/bi%E1%BB%83u-t%C6%B0%E1%BB%A3ng-tr%E1%BB%ABu-t%C6%B0%E1%BB%A3ng-%C4%91%E1%BA%A1i-di%E1%BB%87n-cho-l%E1%BB%9Di-k%C3%AAu-g%E1%BB%8Di-sinh-th%C3%A1i-%C4%91%E1%BB%83-t%C3%A1i-ch%E1%BA%BF-v%C3%A0-t%C3%A1i-s%E1%BB%AD-d%E1%BB%A5ng-d%C6%B0%E1%BB%9Bi-d%E1%BA%A1ng-ao.jpg?s=612x612&w=is&k=20&c=xbb20B9uUoykU_Qfy-GT9BxYLoUBnyoy1N7ncbJVJEc=";

export const CabinetSection = () => {
  return (
    <BaseSection title={"Cabinet"}>
      <div className={"cabinet-section__toolbar"}>
        <div className={"cabinet-section__navigator"}>
          {[1, 2, 3, 4].map((_, index) => (
            <Fragment key={index}>
              <span className={"cabinet-section__link"}>{`Folder ${
                index + 1
              }`}</span>
              <div className={"cabinet-section__divider"} />
            </Fragment>
          ))}
        </div>
        <div className={"cabinet-section__new-button"}>
          <Button sizeKey={["extra-small", "small"]} style={{ color: "white" }}>
            <i className={"icon-folder-upload"} />
          </Button>
        </div>
      </div>
      <div className={"cabinet-section__folder-working-place"}>
        <div className={"directory"}>
          <div className={"holder-folder"}>
            <AiFillFolder size={50} />
          </div>
          <span className={"directory-name"}>folder11</span>
        </div>
        <div className={"directory"}>
          <div className={"holder-folder"}>
            <AiFillFile size={50} />
          </div>
          <span className={"directory-name"}>folder11.csv</span>
        </div>
        <div className={"directory"}>
          <div className={"holder-folder"}>
            <AiFillFolder size={50} />
          </div>
          <span className={"directory-name"}>folder11</span>
        </div>
        <div className={"directory"}>
          <div className={"holder-folder"}>
            <AiFillFile size={50} />
          </div>
          <span className={"directory-name"}>folder11.docx</span>
        </div>
        <div className={"directory"}>
          <div className={"holder-folder"}>
            <AiFillFolder size={50} />
          </div>
          <span className={"directory-name"}>folder11</span>
        </div>
        <div className={"directory"}>
          <div className={"holder-folder"}>
            <AiFillFile size={50} />
          </div>
          <span className={"directory-name"}>folder11.ppt</span>
        </div>
        <div className={"directory"}>
          <div className={"holder-folder"}>
            <AiFillFolder size={50} />
          </div>
          <span className={"directory-name"}>folder11</span>
        </div>
        <div className={"directory"}>
          <div className={"holder-folder"}>
            <LazyImage
              src={src}
              style={{ width: "50px", marginTop: "6px", borderRadius: "5px" }}
            />
          </div>
          <span className={"directory-name"}>Tree.png</span>
        </div>
      </div>
    </BaseSection>
  );
};
