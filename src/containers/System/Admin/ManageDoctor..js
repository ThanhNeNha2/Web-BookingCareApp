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
      contentMarkdown: "",
      contentHTML: "",
      selectedOption: "",
      description: "",
      listDoctors: [],
      hasOldData: false,
    };
  }
  componentDidMount() {
    this.props.fetchAllDoctors();
  }
  buildDataInputSelect = (inputData) => {
    let result = [];
    let { language } = this.props;
    if (inputData && inputData.length > 0) {
      inputData.map((item, index) => {
        let object = {};
        let labelVi = `${item.lastName} ${item.firstName}`;
        let labelEn = `${item.firstName} ${item.lastName}`;
        object.label = language === LANGUAGES.VI ? labelVi : labelEn;
        object.value = item.id;
        result.push(object);
      });
    }
    return result;
  };
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.allDoctors !== this.props.allDoctors) {
      let dataSelect = this.buildDataInputSelect(this.props.allDoctors);
      this.setState({
        listDoctors: dataSelect,
      });
    }
    if (prevProps.language !== this.props.language) {
      let dataSelect = this.buildDataInputSelect(this.props.allDoctors);
      this.setState({
        listDoctors: dataSelect,
      });
    }
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
  render() {
    const { selectedOption } = this.state;

    return (
      <div className="manage-doctor-container">
        <div className="manage-doctor-title"> Tao them thong tin doctor</div>
        <div className="more-infor">
          <div className="content-left form-group">
            <label>Chọn bác sĩ </label>
            <Select
              value={selectedOption}
              onChange={this.handleChangeSelect}
              options={this.state.listDoctors}
            />
          </div>
          <div className="content-right">
            <label> Thông tin giới thiệu</label>
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
    saveDetailDoctor: (data) => dispatch(actions.saveDetailDoctor(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
