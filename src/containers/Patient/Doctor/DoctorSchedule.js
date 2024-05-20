import React, { Component } from "react";
import { connect } from "react-redux";
import "./DoctorSchedule.scss";
import moment from "moment";
import localization from "moment/locale/vi";
import { LANGUAGES } from "../../../utils";
import { getScheduleDoctorByDate } from "../../../services/userService";
import { FormattedMessage } from "react-intl";
import DoctorExtraInfor from "./DoctorExtraInfor";
class DoctorSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allDays: [],
      allAvalableTime: [],
    };
  }

  async componentDidMount() {
    // console.log("Moment vi", moment(new Date()).format("dddd - DD/MM"));
    // console.log(
    //   "Moment en",
    //   moment(new Date()).locale("en").format("dddd - DD/MM")
    // );
    let allDays = this.getArrDays();
    this.setState({
      allDays: allDays,
    });
  }
  getArrDays = () => {
    let allDays = [];
    for (let i = 0; i < 7; i++) {
      let object = {};
      if (this.props.language === LANGUAGES.VI) {
        object.label = moment(new Date()).add(i, "days").format("dddd - DD/MM");
      }
      if (this.props.language === LANGUAGES.EN) {
        object.label = moment(new Date())
          .add(i, "days")
          .locale("en")
          .format("dddd - DD/MM");
      }
      object.value = moment(new Date()).add(i, "days").startOf("day").valueOf();
      allDays.push(object);
    }
    return allDays;
  };
  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.language !== this.props.language) {
      let allDays = this.getArrDays();
      this.setState({
        allDays: allDays,
      });
    }
    if (this.props.doctorIdFromParent !== prevProps.doctorIdFromParent) {
      let date = this.state.allDays[0].value;
      let res = await getScheduleDoctorByDate(
        this.props.doctorIdFromParent,
        date
      );
      console.log("check lần nũa ", date);
      console.log("check lần nũa 3 ", this.props.doctorIdFromParent);

      this.setState({
        allAvalableTime: res.data,
      });
    }
  }
  handleOnchangeSelect = async (event) => {
    if (this.props.doctorIdFromParent && this.props.doctorIdFromParent !== -1) {
      let doctorId = this.props.doctorIdFromParent;
      let date = event.target.value;
      let res = await getScheduleDoctorByDate(doctorId, date);
      console.log("check time ", res);
      if (res && res.errCode === 0) {
        this.setState({
          allAvalableTime: res.data ? res.data : [],
        });
      }
    }
  };
  render() {
    let { allDays, allAvalableTime } = this.state;
    console.log("hihi ", allDays);
    return (
      <div className="doctor-schedule-container">
        <div className="doctor-schedule-left">
          <div className="all-schedule">
            <select
              className="form-control writeSelect"
              onChange={(event) => {
                this.handleOnchangeSelect(event);
              }}
            >
              {allDays &&
                allDays.length > 0 &&
                allDays.map((item, index) => {
                  return (
                    <option key={index} value={item.value}>
                      {" "}
                      {item.label}{" "}
                    </option>
                  );
                })}
            </select>
          </div>

          <div className="all-available-time">
            <div className="text-calender">
              <span>
                {" "}
                <i
                  className="fas fa-calendar-alt"
                  style={{ marginRight: "5px" }}
                ></i>
                <FormattedMessage id="Patient.calendar" />{" "}
              </span>
            </div>
            <div className="time-content">
              {allAvalableTime && allAvalableTime.length > 0 ? (
                <>
                  {allAvalableTime.map((item, index) => {
                    return (
                      <button key={index} className="btn btn-warning mt-3 mr-3">
                        {this.props.language === LANGUAGES.VI
                          ? item.timeTypeData.valueVi
                          : item.timeTypeData.valueEn}
                      </button>
                    );
                  })}
                  <div>
                    {" "}
                    Chọn{" "}
                    <i
                      className="far fa-hand-point-up"
                      style={{ marginTop: "10px" }}
                    ></i>{" "}
                    và đặt (Phí đặt lịch 0đ)
                  </div>
                </>
              ) : (
                <h4 style={{ marginTop: "10px" }}>
                  <i>Không có lịch khám ngày này ! </i>
                </h4>
              )}
            </div>
          </div>
        </div>
        {/* <div className="doctor-schedule-rightt"></div> */}
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
