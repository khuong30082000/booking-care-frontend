import "./ModalRemedy.scss";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { useState } from "react";
import { useEffect } from "react";
import { CommonUtils } from "../../../utils";

const ModalRemedy = ({ isOpenModal, dataModal, closeModal, sendRemedy }) => {
  const defaultValue = {
    email: "",
    imgBase64: "",
  };
  const [state, setState] = useState(defaultValue);
  useEffect(() => {}, []);
  useEffect(() => {
    setState({
      ...state,
      email: dataModal.email,
    });
  }, [dataModal]);

  const handleOnChangeEmail = (e) => {
    setState({
      ...state,
      email: e.target.value,
    });
  };

  const handleOnChangeImg = async (e) => {
    let data = e.target.files;
    let file = data[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      setState({
        ...state,
        imgBase64: base64,
      });
    }
  };

  const handleSaveModalRemedy = () => {
    sendRemedy(state);
  };

  return (
    <Modal
      isOpen={isOpenModal}
      className="booking-modal-container"
      centered
      backdrop={true}
      size="lg"
    >
      <ModalHeader toggle={closeModal}>
        <b> Gửi Hóa đơn khám bệnh thành công</b>
      </ModalHeader>
      <ModalBody>
        <div className="row">
          <div className="col-6 form-group">
            <label>Email bệnh nhân</label>
            <input
              className="form-control"
              type="email"
              value={state.email}
              onChange={handleOnChangeEmail}
            />
          </div>
          <div className="col-6 form-group">
            <label>Chọn file đơn thuốc</label>
            <input
              className="form-control-file"
              type="file"
              onChange={(e) => handleOnChangeImg(e)}
            />
          </div>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={() => handleSaveModalRemedy()}>
          Save
        </Button>{" "}
        <Button color="secondary" onClick={closeModal}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default ModalRemedy;
