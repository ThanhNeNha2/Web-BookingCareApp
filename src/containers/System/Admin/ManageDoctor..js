import React, { Component } from "react";
import * as actions from "../../../store/actions";
import { connect } from "react-redux";
import "./ManageDoctor.scss";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
// import style manually
import "react-markdown-editor-lite/lib/index.css";
import Select from "react-select";
import { LANGUAGES } from "../../../utils";
import { getDetailInforDoctor } from "../../../services/userService";
import { CRUD_ACTIONS } from "../../../utils";
import { FormattedMessage } from "react-intl";
const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // save to markdown table
      contentMarkdown: "",
      contentHTML: "",
      selectedOption: "",
      description: "",
      listDoctors: [],
      hasOldData: false,

      // Save to doctor infor table
      listPrice: [],
      listPayment: [],
      listProvince: [],
      selectedPrice: "",
      selectedPayment: "",
      selectedProvince: "",
      nameClinic: "",
      addressClinic: "",
      note: "",
    };
  }

  handleEditorChange = ({ html, text }) => {
    this.setState({
      contentMarkdown: text,
      contentHTML: html,
    });
  };
  handleSaveContentMarkdown = () => {
    this.props.saveDetailDoctor({
      contentHTML: this.state.contentHTML,
      contentMarkdown: this.state.contentMarkdown,
      description: this.state.description,
      doctorId: this.state.selectedOption.value,
      action:
        this.state.hasOldData === true
          ? CRUD_ACTIONS.EDIT
          : CRUD_ACTIONS.CREATE,
    });
  };

  handleChangeSelect = async (selectedOption) => {
    this.setState({ selectedOption });
    let res = await getDetailInforDoctor(selectedOption.value);
    console.log("check res ", res);
    if (res && res.errCode === 0 && res.data && res.data.Markdown) {
      let Markdown = res.data.Markdown;
      this.setState({
        contentHTML: Markdown.contentHTML,
        contentMarkdown: Markdown.contentMarkdown,
        description: Markdown.description,
        hasOldData: true,
      });
    } else {
      this.setState({
        contentHTML: "",
        contentMarkdown: "",
        description: "",
        hasOldData: false,
      });
    }
  };
  handleOnChangeDesc = (event) => {
    this.setState({
      description: event.target.value,
    });
  };
  buildDataInputSelect = (inputData, type) => {
    let result = [];
    let { language } = this.props;
    if (inputData && inputData.length > 0) {
      inputData.map((item, index) => {
        let object = {};
        let labelVi =
          type === "USERS"
            ? `${item.lastName} ${item.firstName}`
            : item.valueVi;
        let labelEn =
          type === "USERS"
            ? `${item.firstName} ${item.lastName}`
            : item.valueEn;
        object.label = language === LANGUAGES.VI ? labelVi : labelEn;
        object.value = item.id;
        result.push(object);
      });
    }
    return result;
  };
  componentDidMount() {
    this.props.fetchAllDoctors();
    this.props.getAllRequiredDoctorInfor();
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.allDoctors !== this.props.allDoctors) {
      let dataSelect = this.buildDataInputSelect(
        this.props.allDoctors,
        "USERS"
      );
      this.setState({
        listDoctors: dataSelect,
      });
    }
    if (prevProps.language !== this.props.language) {
      let dataSelect = this.buildDataInputSelect(this.props.allDoctors);
      let { resPayment, resPrice, resProvince } =
        this.props.allRequiredDoctorInfor;
      let listresPayment = this.buildDataInputSelect(resPayment);
      let listresPrice = this.buildDataInputSelect(resPrice);
      let listresProvince = this.buildDataInputSelect(resProvince);
      this.setState({
        listDoctors: dataSelect,
        listPayment: listresPayment,
        listPrice: listresPrice,
        listProvince: listresProvince,
      });
    }
    if (
      prevProps.allRequiredDoctorInfor !== this.props.allRequiredDoctorInfor
    ) {
      let { resPayment, resPrice, resProvince } =
        this.props.allRequiredDoctorInfor;
      let listresPayment = this.buildDataInputSelect(resPayment);
      let listresPrice = this.buildDataInputSelect(resPrice);
      let listresProvince = this.buildDataInputSelect(resProvince);
      console.log("check từ redux ", resPayment);
      console.log("check khi customize ", listresPayment);

      this.setState({
        listPayment: listresPayment,
        listPrice: listresPrice,
        listProvince: listresProvince,
      });
    }
  }

  render() {
    const { selectedOption, listPrice, listPayment, listProvince } = this.state;
    console.log("check từ state ", listPayment);

    return (
      <div className="manage-doctor-container">
        <div className="manage-doctor-title"> Tao them thong tin doctor</div>
        <div className="more-infor">
          <div className="content-left form-group">
            <FormattedMessage id="manage-doctor.chosse-doctor" />
            <label> </label>
            <Select
              placeholder={
                <FormattedMessage id="manage-doctor.chosse-doctor" />
              }
              value={selectedOption}
              onChange={this.handleChangeSelect}
              options={this.state.listDoctors}
            />
          </div>
          <div className="content-right">
            <label>
              {" "}
              <FormattedMessage id="manage-doctor.input-infomation" />
            </label>
            <textarea
              className="form-control"
              rows="4"
              onChange={(event) => this.handleOnChangeDesc(event)}
              value={this.state.description}
            >
              fdgdfgdg
            </textarea>
          </div>
        </div>
        <div className="more-infor-extra row ">
          <div className="col-4 form-group">
            <label>
              <FormattedMessage id="manage-doctor.chosse-price" />
            </label>
            <Select
              placeholder={<FormattedMessage id="manage-doctor.chosse-price" />}
              // value={this.state.selectedPrice}
              // onChange={this.handleChangeSelect}
              options={listPrice}
            />
          </div>

          <div className="col-4 form-group">
            <label>
              {" "}
              <FormattedMessage id="manage-doctor.chosse-payment" />
            </label>
            <Select
              placeholder={
                <FormattedMessage id="manage-doctor.chosse-payment" />
              }
              // value={selectedPayment}
              // onChange={this.handleChangeSelect}
              options={listPayment}
            />
          </div>

          <div className="col-4 form-group">
            <label>
              {" "}
              <FormattedMessage id="manage-doctor.chosse-province" />
            </label>
            <Select
              placeholder={
                <FormattedMessage id="manage-doctor.chosse-province" />
              }
              // value={selectedProvince}
              // onChange={this.handleChangeSelect}
              options={listProvince}
            />
          </div>

          {/* **** */}
          <div className="col-4 form-group">
            <label>
              {" "}
              <FormattedMessage id="manage-doctor.name-clicin" />
            </label>
            <input className="form-control" />
          </div>

          <div className="col-4 form-group">
            <label>
              {" "}
              <FormattedMessage id="manage-doctor.clinic-address" />
            </label>
            <input className="form-control" />
          </div>

          <div className="col-4 form-group">
            <label>
              {" "}
              <FormattedMessage id="manage-doctor.note" />
            </label>
            <input className="form-control" />
          </div>
        </div>
        <div className="manage-doctor-editor">
          <MdEditor
            style={{ height: "500px", width: "100%" }}
            renderHTML={(text) => mdParser.render(text)}
            onChange={this.handleEditorChange}
            value={this.state.contentMarkdown}
          />
        </div>
        <button
          className="save-content-doctor btn btn-success"
          onClick={() => this.handleSaveContentMarkdown()}
        >
          {this.state.hasOldData === false ? "Lưu thông tin" : "Sửa thông tin "}
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    allDoctors: state.admin.allDoctors,
    language: state.app.language,
    allRequiredDoctorInfor: state.admin.allRequiredDoctorInfor,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
    saveDetailDoctor: (data) => dispatch(actions.saveDetailDoctor(data)),
    getAllRequiredDoctorInfor: () => dispatch(actions.getRequiredDoctorInfor()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
