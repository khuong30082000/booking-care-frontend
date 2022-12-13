import "./ManageSpecialty.scss";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import { useState } from "react";
import { CommonUtils } from "../../../utils";
import { ListGroup } from "reactstrap";
import { createNewSpecialty } from "../../../services/userService";
import { toast } from "react-toastify";
const mdParser = new MarkdownIt(/* Markdown-it options */);
const ManageSpecialty = (props) => {
  const defaultState = {
    name: "",
    imageBase64: "",
    descriptionHTML: "",
    descriptionMarkdown: "",
  };

  const [state, setState] = useState(defaultState);

  function handleEditorChange({ html, text }) {
    setState({
      ...state,
      descriptionMarkdown: text,
      descriptionHTML: html,
    });
  }

  const handleOnChangeImg = async (e) => {
    let data = e.target.files;
    let file = data[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file);

      setState({
        ...state,
        imageBase64: base64,
      });
    }
  };

  const handleSave = async () => {
    let res = await createNewSpecialty(state);
    if (res && res.errCode === 0) {
      toast.success("Add new success");
      setState({
        name: "",
        imageBase64: "",
        descriptionHTML: "",
        descriptionMarkdown: "",
      });
    } else {
      toast.error("Something wrongs");
    }
  };

  return (
    <div className="manage-specialty-container">
      <div className="ms-title">Quản lý chuyên khoa</div>

      <div className="add-new-specialty row">
        <div className="col-6 form-group">
          <label>tên chuyên khoa</label>
          <input
            className="form-control"
            type="text"
            value={state.name}
            onChange={(e) => setState({ ...state, name: e.target.value })}
          />
        </div>
        <div className="col-6 form-group">
          <label>Ảnh chuyên khoa</label>
          <input
            className="form-control-file"
            type="file"
            onChange={(e) => handleOnChangeImg(e)}
          />
        </div>
        <div className="col-12">
          <MdEditor
            style={{ height: "500px" }}
            renderHTML={(text) => mdParser.render(text)}
            onChange={handleEditorChange}
            value={state.descriptionMarkdown}
          />
        </div>
        <div className="col-12">
          <button
            className="btn btn-primary btn-specialty"
            onClick={handleSave}
          >
            {" "}
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManageSpecialty;
