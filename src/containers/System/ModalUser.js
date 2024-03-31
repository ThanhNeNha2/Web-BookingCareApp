import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

class ModalUser extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {}
  toggle = () => {
    this.props.toggleFromParent();
  };
  render() {
    console.log("check child prop", this.props);
    console.log("check child open modal ", this.props.isOpen);

    return (
      <Modal
        isOpen={this.props.isOpen}
        modalTransition={{ timeout: 700 }}
        backdropTransition={{ timeout: 1300 }}
        toggle={() => {
          this.toggle();
        }}
        className={"modal-user-container"}
        size="lg"
        centered
      >
        <ModalHeader
          toggle={() => {
            this.toggle();
          }}
        >
          Modal title
        </ModalHeader>
        <ModalBody>
          <div className="model-user-body">
            <div className="input-container">
              <label>Email</label>
              <input type="text" />
            </div>
            <div className="input-container">
              <label>Email</label>
              <input type="text" />
            </div>
            <div className="input-container">
              <label>Email</label>
              <input type="text" />
            </div>
            <div className="input-container">
              <label>Email</label>
              <input type="text" />
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            onClick={() => {
              this.toggle();
            }}
          >
            Confirm
          </Button>{" "}
          <Button
            color="secondary"
            onClick={() => {
              this.toggle();
            }}
          >
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);
