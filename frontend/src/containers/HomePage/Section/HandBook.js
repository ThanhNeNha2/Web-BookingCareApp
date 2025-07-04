import React, { Component } from "react";
import { connect } from "react-redux";

import { FormattedMessage } from "react-intl";
// Import css files
import Slider from "react-slick";

class HandBook extends Component {
  render() {
    return (
      <div className="section-share section-handbook">
        <div className="section-container">
          <div className="section-header">
            <span className="title-section">Sống khỏe suốt đời</span>
            <button className="btn-section"> Xem thêm </button>
          </div>
          <div className="section-body">
            <Slider {...this.props.settings}>
              <div className="section-customize">
                <div className="bg-image section-handbook1" />
                <div> Hỏi đáp: Đau hạ sườn phải là bệnh gì?</div>
              </div>

              <div className="section-customize">
                <div className="bg-image section-handbook2" />
                <div> Mệt mỏi chán ăn là dấu hiệu của bệnh gì? </div>
              </div>

              <div className="section-customize">
                <div className="bg-image section-handbook3" />
                <div> Hơi thở có mùi là bệnh gì ? </div>
              </div>

              <div className="section-customize">
                <div className="bg-image section-handbook4" />
                <div>
                  {" "}
                  Laser trẻ hóa da: Giải pháp cho làn da tươi trẻ rạng ngời
                </div>
              </div>

              <div className="section-customize">
                <div className="bg-image section-handbook5" />
                <div> Hỏi đáp: Polyp cổ tử cung có nên cắt bỏ hay không?</div>
              </div>

              <div className="section-customize">
                <div className="bg-image section-handbook6" />
                <div>Giải đáp: Trẻ hóa da bằng laser có tốt không?</div>
              </div>
            </Slider>
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

export default connect(mapStateToProps, mapDispatchToProps)(HandBook);
