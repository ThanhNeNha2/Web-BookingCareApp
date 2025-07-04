import React, { Component } from "react";
import { connect } from "react-redux";
import "./ManagePatient.scss";
import { LANGUAGES } from "../../../utils";
import { FormattedMessage } from "react-intl";
import DatePicker from "../../../components/Input/DatePicker";
import { getAllPatientForDoctor } from "../../../services/userService";
import moment from "moment";
import RemedyModel from "./RemedyModel";
import { postSendRemedy } from "../../../services/userService";
import { toast } from "react-toastify";
import LoadingOverlay from "react-loading-overlay";
class ManagePatient extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDate: moment(new Date()).startOf("day").valueOf(),
      dataPatient: [],
      isOpenRemedyModel: false,
      dataModal: {},
      isShowLoading: false,
    };
  }
  handleOnchangeDatePicker = (date) => {
    this.setState(
      {
        currentDate: date[0],
      },
      async () => {
        await this.getDataPatient();
      }
    );
  };
  async componentDidMount() {
    this.getDataPatient();
  }

  getDataPatient = async () => {
    let { user } = this.props;
    let { currentDate } = this.state;
    let formatedDate = new Date(currentDate).getTime();
    let res = await getAllPatientForDoctor({
      doctorId: user.id,
      date: formatedDate,
    });
    if (res && res.errCode === 0) {
      this.setState({
        dataPatient: res.data,
      });
    }
  };
  handleBtnConfirm = (item) => {
    let data = {
      doctorId: item.doctorId,
      patientId: item.patientId,
      email: item.patientData.email,
      patientName: item.patientData.firstName,
      timeType: item.timeType,
    };
    this.setState({
      isOpenRemedyModel: true,
      dataModal: data,
    });
  };
  closeRemedyModal = () => {
    this.setState({
      isOpenRemedyModel: false,
      dataModal: {},
    });
  };

  sendRemedy = async (dataFromModal) => {
    let { dataModal } = this.state;
    this.setState({
      isShowLoading: true,
    });

    let res = await postSendRemedy({
      ...dataFromModal,
      doctorId: dataModal.doctorId,
      patientId: dataModal.patientId,
      timeType: dataModal.timeType,
      language: this.props.language,
      patientName: dataModal.patientName,
    });
    if (res && res.errCode === 0) {
      this.setState({
        isShowLoading: false,
      });
      toast.success("Send remedy success");
      await this.getDataPatient();
      this.closeRemedyModal();
    } else {
      toast.error("Send remedy failed");
    }
  };
  async componentDidUpdate(prevProps, prevState, snapshot) {}
  render() {
    let { dataPatient } = this.state;
    return (
      <>
        <LoadingOverlay
          active={this.state.isShowLoading}
          spinner
          text="Loading ..."
          className="cssFullMan"
        >
          <div className="manage-patient-container container">
            <div className="m-p-title">Quản lý bệnh nhân khám bệnh</div>
            <div className="manage-patient-body row">
              <div className="col-6 form-group">
                <label>Chọn ngày khám</label>
                <DatePicker
                  onChange={this.handleOnchangeDatePicker}
                  className="form-control"
                  value={this.state.currentDate}
                />
              </div>
              <div className="col-12 table-manage-patient">
                <table className="" style={{ width: "100%" }}>
                  <tbody>
                    <tr>
                      <th>STT</th>
                      <th>Thời gian </th>
                      <th>Họ và tên </th>
                      <th>Giới tính </th>
                      <th>Actions</th>
                    </tr>
                    {dataPatient && dataPatient.length > 0 ? (
                      dataPatient.map((item, index) => {
                        return (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>
                              {this.props.language === LANGUAGES.VI
                                ? item.timeTypeDataPatient.valueVi
                                : item.timeTypeDataPatient.valueEn}
                            </td>

                            <td>{item.patientData.firstName}</td>
                            <td>
                              {this.props.language === LANGUAGES.VI
                                ? item.patientData.genderData.valueVi
                                : item.patientData.genderData.valueEn}
                            </td>
                            <td>
                              {" "}
                              <button
                                className="btn btn-success"
                                onClick={() => {
                                  this.handleBtnConfirm(item);
                                }}
                              >
                                Xác nhận{" "}
                              </button>{" "}
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td>Không có lịch </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <RemedyModel
            isOpenModal={this.state.isOpenRemedyModel}
            dataModal={this.state.dataModal}
            closeRemedyModal={this.closeRemedyModal}
            sendRemedy={this.sendRemedy}
          />
        </LoadingOverlay>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,

    user: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
