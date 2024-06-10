import React, { Component } from "react";
import { connect } from "react-redux";

import { FormattedMessage } from "react-intl";
import anh0 from "../../../assets/AnhLogo/vtv1.png";
import anh1 from "../../../assets/AnhLogo/165432-vtcnewslogosvg.png";
import anh2 from "../../../assets/AnhLogo/ictnews.png";
import anh3 from "../../../assets/AnhLogo/vnexpress.png";
import anh4 from "../../../assets/AnhLogo/cuc-cong-nghe-thong-tin-bo-y-te-2.png";
import anh5 from "../../../assets/AnhLogo/infonet.png";
import anh6 from "../../../assets/AnhLogo/110757-dantrilogo.png";
class About extends Component {
  render() {
    return (
      <div className="section-share section-about">
        <div className="section-about-header">
          Truyền thông nói về BookingCare{" "}
        </div>
        <div className="section-about-content">
          <div className="content-left">
            <iframe
              width="100%"
              height="400px"
              src="https://www.youtube.com/embed/FyDQljKtWnI"
              title="CÀ PHÊ KHỞI NGHIỆP VTV1 - BOOKINGCARE - HỆ THỐNG ĐẶT LỊCH KHÁM TRỰC TUYẾN"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerpolicy="strict-origin-when-cross-origin"
              allowfullscreen
            ></iframe>{" "}
            {/* <iframe
              width="100%"
              height="400px"
              src="https://www.youtube.com/embed/147SkAVXEqM?list=PLncHg6Kn2JT6E38Z3kit9Hnif1xC_9VqI"
              title="#51 Kết Thúc Design Giao Diện Clone BookingCare.vn 4 | React.JS Cho Người Mới Bắt Đầu"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe> */}
          </div>
          <div className="content-right">
            {" "}
            {/* <p>
              Trong video này, chúng ta sẽ hoàn tất việc design giao diện theo
              trang bookingcare.vn. Chúng ta sẽ hoàn thiện những phần đang còn
              dang dở, để từ video tiếp theo, chúng ta sẽ bắt đầu làm về backend
              và react để tạo dữ liệu thật cho trang home design này.
            </p> */}
            <div className="cssLogo">
              {" "}
              <img className="cssanh" src={anh0} alt="Logo" />
              <img className="cssanh" src={anh1} alt="Logo" />
              <img className="cssanh" src={anh2} alt="Logo" />
              <img className="cssanh" src={anh3} alt="Logo" />
              <img className="cssanh" src={anh4} alt="Logo" />
              <img className="cssanh" src={anh5} alt="Logo" />
              <img className="cssanh" src={anh0} alt="Logo" />
              <img className="cssanh" src={anh6} alt="Logo" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    lang: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(About);
