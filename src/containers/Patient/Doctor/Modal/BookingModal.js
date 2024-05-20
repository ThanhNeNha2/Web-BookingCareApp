import React, { Component } from "react";
import { connect } from "react-redux";
import "./BookingModal.scss";

import { FormattedMessage } from "react-intl";
import { Modal } from "reactstrap";

class BookingModal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  async componentDidUpdate(prevProps, prevState, snapshot) {}
  render() {
    let { isOpenModal, dataTime } = this.props;
    return (
      <Modal
        isOpen={isOpenModal}
        className={"booking-modal-container"}
        size="lg"
        centered
      >
        <div className="booking-modal-content">
          <div className="booking-modal-header">
            <span className="left"> Thông tin đặt lịch khám bệnh</span>
            <span className="right">
              {" "}
              <i
                className="fas fa-times"
                onClick={this.props.closeBookingClose}
              ></i>
            </span>
          </div>
          <div className="booking-modal-body container ">
            <div className="doctor-infor "></div>
            <div className="price mt-3">Giá khám 500.000 VNĐ</div>

            <div className="row">
              <div className="col-6 form-group">
                <babel> Họ và tên</babel>
                <input className="form-control" />
              </div>{" "}
              <div className="col-6 form-group">
                <babel> Số điện thoại</babel>
                <input className="form-control" />
              </div>{" "}
              <div className="col-6 form-group">
                <babel> Địa chỉ email</babel>
                <input className="form-control" />
              </div>{" "}
              <div className="col-6 form-group">
                <babel> Địa chỉ liên hệ</babel>
                <input className="form-control" />
              </div>
              <div className="col-12 form-group">
                <babel> Lý do khám</babel>
                <input className="form-control" />
              </div>{" "}
              <div className="col-6 form-group">
                <babel> Đặt cho ai </babel>
                <input className="form-control" />
              </div>{" "}
              <div className="col-6 form-group">
                <babel> Giới tính </babel>
                <input className="form-control" />
              </div>
            </div>
          </div>
          <div className="booking-modal-footer">
            <button className="btn btn-success mr-3"> Xác nhận</button>
            <button
              className="btn btn-warning"
              onClick={this.props.closeBookingClose}
            >
              {" "}
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
