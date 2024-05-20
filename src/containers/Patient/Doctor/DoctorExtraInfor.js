import React, { Component } from "react";
import { connect } from "react-redux";
import "./DoctorExtraInfor.scss";

import { LANGUAGES } from "../../../utils";

import { FormattedMessage } from "react-intl";
class DoctorExtraInfor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCheck: true,
    };
  }
  handleShowHide = () => {
    this.setState({
      isCheck: !this.state.isCheck,
    });
  };
  render() {
    return (
      <div className="doctor-extra-infor-container">
        <div className="content-up">
          <div className="content-up-threads">ĐỊA CHỈ KHÁM </div>
          <div className="content-up-contentUP">
            {" "}
            Phòng khám Chuyên khoa trị giãn tĩnh mạch An Viên - Bệnh viện Đa
            khoa An Việt
          </div>
          <div className="content-up-contentDOWN">
            Số 6, ngõ 1 Trường Chinh, Thanh Xuân, Hà Nội
          </div>
        </div>
        <div className="content-down">
          {this.state.isCheck === true ? (
            <div>
              GÍA KHÁM : 250.000đ{" "}
              <a
                href="#"
                onClick={() => {
                  this.handleShowHide();
                }}
              >
                {" "}
                Xem chi tiết{" "}
              </a>
            </div>
          ) : (
            <>
              {" "}
              <div>GÍA KHÁM :</div>
              <div>
                Gía khám : giá khám khi khám qua bookingcare . Giá khám cho
                người nước ngoài là 30 USD{" "}
              </div>
              <div>
                Người bệnh có thể thanh toán chi phí bằng hình thức tiền mặt
                hoặc quẹt thẻ
              </div>
              <div>
                {" "}
                <a
                  href="#"
                  onClick={() => {
                    this.handleShowHide();
                  }}
                >
                  Ẩn bảng giá
                </a>{" "}
              </div>
            </>
          )}
        </div>
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfor);
