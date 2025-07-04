import React, { Component } from "react";
import { connect } from "react-redux";
import "./RemedyModel.scss";
import { FormattedMessage } from "react-intl";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

import _ from "lodash";

import { CommonUtils, LANGUAGES } from "../../../utils";
import Select from "react-select";

import { toast } from "react-toastify";
import moment from "moment";

class RemedyModel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      imgBase64: "",
    };
  }

  componentDidMount() {
    if (this.props.dataModal) {
      this.setState({
        email: this.props.dataModal.email,
      });
    }
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.dataModal !== this.props.dataModal) {
      this.setState({
        email: this.props.dataModal.email,
      });
    }
  }
  handleOnchangeEmail = (event) => {
    this.setState({
      email: event.target.value,
    });
  };
  handleOnchangeImage = async (event) => {
    let data = event.target.files;
    let file = data[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file);

      this.setState({
        imgBase64: base64,
      });
    }
  };
  handleSendRemedy = () => {
    this.props.sendRemedy(this.state);
  };
  render() {
    let { isOpenModal, dataModal, closeRemedyModal, sendRemedy } = this.props;

    return (
      <Modal
        isOpen={isOpenModal}
        className={"booking-modal-container"}
        size="md"
        centered
      >
        <div className="modal-header">
          <h5 className="modal-title"> Gửi hóa đơn khám bệnh thành công </h5>
          <button
            type="button"
            className="close "
            aria-label="close"
            onClick={closeRemedyModal}
          >
            {" "}
            <span aria-hidden="true">x</span>
          </button>
        </div>
        <ModalBody>
          <div className="row ">
            <div className="col-6 form-group">
              <div className="">
                <label>Email bệnh nhân </label>
                <input
                  type="email"
                  className="form-control"
                  value={this.state.email}
                  onChange={(event) => {
                    this.handleOnchangeEmail(event);
                  }}
                />
              </div>
            </div>
            <div className="col-6 form-group">
              <div>
                <label>Chọn file đơn thuốc </label>
                <input
                  type="file"
                  className="form-control-file"
                  onChange={(event) => this.handleOnchangeImage(event)}
                />
              </div>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            onClick={() => {
              this.handleSendRemedy();
            }}
          >
            Send
          </Button>{" "}
          <Button color="secondary" onClick={closeRemedyModal}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    genders: state.admin.genders,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(RemedyModel);
