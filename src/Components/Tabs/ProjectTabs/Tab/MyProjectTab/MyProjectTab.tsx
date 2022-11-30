import { Button } from "~/Components/Elements/Button";
import "./MyProjectTab.scss";
import { TProjectInfo } from "~/services/projectServices";
import { ProjectInfoForm } from "~/Components/Form/ProjectInfoForm";
import { Input } from "~/Components/Elements/Input";

// const projectTable: TProjectInfo = {
//   id: "asfwes243254UUUO324",
//   project_name: "New Project",
// };

export const MyProjectTab = () => {
  return (
    <div className="my-group-tab">
      <div className="my-group-tab__toolbar">
        <div className="my-group-tab__left-tool-bar">
          <Button
            variantKey={"toggle-to-active"}
            sizeKey={["extra-small", "small"]}>
            <i className={"icon-edit"} />
          </Button>
          <Button
            variantKey={"text"}
            sizeKey={["extra-small", "small"]}
            style={{ marginLeft: "8px" }}>
            <i className={"icon-bin2"} />
          </Button>
        </div>
        <div className="my-group-tab__left-tool-bar">
          <Button variantKey={"submit"} sizeKey={["extra-small", "small"]}>
            New project
          </Button>
        </div>
      </div>
      <div className="my-group-tab__form">
        {/* <ProjectInfoForm formData={projectTable} readOnly /> */}
      </div>
      <div className="my-group-tab__working-place">
        <div className="my-group-tab__working-place-toolbar">
          <div className="my-group-tab__working-place-toolbar__left">
            <span style={{ marginRight: "12px", fontWeight: "bold" }}>
              Start day:
            </span>
            <Input
              type={"datetime-local"}
              className="my-project-tab__datetime-picker"
            />
            <span
              style={{
                marginRight: "12px",
                marginLeft: "12px",
                fontWeight: "bold",
              }}>
              End day:
            </span>
            <Input
              type={"datetime-local"}
              className="my-project-tab__datetime-picker"
            />
          </div>
          <div className="my-group-tab__working-place-toolbar__right">
            <Button variantKey="submit">Done Sprint</Button>
          </div>
        </div>
        <div className="my-group-tab__board ">
          <div className="my-project-tab__panel">
            <span style={{ fontWeight: "bold", marginBottom: "12px" }}>
              TODO
            </span>
            <div
              style={{
                fontWeight: "bold",
                display: "flex",
                justifyContent: "center",
              }}>
              <Button variantKey="cancel">Add card</Button>
            </div>
            <div className="my-project-tab__card">
              <span>TODO</span>
              <div>
                Integer beatae tellus laudantium condimentum iusto congue vel
                sunt, id, dolorum, deserunt accumsan corrupti consequat eum, dis
                elementum? Corrupti felis sociis leo quae magnis, inventore
                quia, odio odio, senectus nihil error sit,
              </div>
              <div>point: 8</div>
              <Button
                fullWidth
                sizeKey={"extra-small"}
                style={{ marginTop: "8px" }}>
                Edit
              </Button>
            </div>
            <div className="my-project-tab__card">
              <span>TODO</span>
              <div>
                Integer beatae tellus laudantium condimentum iusto congue vel
                sunt, id, dolorum, deserunt accumsan corrupti consequat eum, dis
                elementum? Corrupti felis sociis leo quae magnis, inventore
                quia, odio odio, senectus nihil error sit,
              </div>
            </div>
          </div>
          <div className="my-project-tab__panel">
            <span style={{ fontWeight: "bold", marginBottom: "12px" }}>
              PROCESSING
            </span>
            <div
              style={{
                fontWeight: "bold",
                display: "flex",
                justifyContent: "center",
              }}>
              <Button variantKey="cancel">Add card</Button>
            </div>
            <div className="my-project-tab__card">
              <span>DOING</span>
              <div>
                Integer beatae tellus laudantium condimentum iusto congue vel
                sunt, id, dolorum, deserunt accumsan corrupti consequat eum, dis
                elementum? Corrupti felis sociis leo quae magnis, inventore
                quia, odio odio, senectus nihil error sit,
              </div>
            </div>
          </div>
          <div className="my-project-tab__panel">
            <span style={{ fontWeight: "bold", marginBottom: "12px" }}>
              DONE
            </span>
            <div
              style={{
                fontWeight: "bold",
                display: "flex",
                justifyContent: "center",
              }}>
              <Button variantKey="cancel">Add card</Button>
            </div>
            <div className="my-project-tab__card">
              <span>DONE</span>

              <div>
                Integer beatae tellus laudantium condimentum iusto congue vel
                sunt, id, dolorum, deserunt accumsan corrupti consequat eum, dis
                elementum? Corrupti felis sociis leo quae magnis, inventore
                quia, odio odio, senectus nihil error sit,
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
