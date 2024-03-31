import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./UserManage.scss";
import { getALLUsers } from "../../services/userService";
import ModalUser from "./ModalUser";
class UserManage extends Component {
  state = {};
  constructor(props) {
    super(props);
    this.state = {
      arrUser: [],
      isOpenModalUser: false,
    };
  }
  async componentDidMount() {
    let response = await getALLUsers("ALL");
    if (response && response.errCode === 0) {
      this.setState({
        arrUser: response.users,
      });
    }
    console.log("hahahhahahahhaha", response);
  }
  handleAddNewUser = () => {
    this.setState({
      isOpenModalUser: true,
    });
  };
  toggleUserModal = () => {
    this.setState({
      isOpenModalUser: !this.state.isOpenModalUser,
    });
  };
  render() {
    let arrUsers = this.state.arrUsers;
    return (
      <div className="users-container">
        <ModalUser
          isOpen={this.state.isOpenModalUser}
          toggleFromParent={this.toggleUserModal}
        />
        <div className="title"> Manage users with thanh </div>
        <div>
          <button
            className=" mx-3 btn btn-success px-3"
            onClick={() => {
              this.handleAddNewUser();
            }}
          >
            {" "}
            Add user{" "}
          </button>
        </div>
        <div className="users-table mt-3 mx-3">
          <table id="customers">
            <tr>
              <th>Email</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Address</th>
              <th>Active</th>
            </tr>

            {this.state.arrUser.map((user) => {
              return (
                <tr>
                  <td>{user.email}</td>
                  <td> {user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.address}</td>
                  <td>
                    <button
                      className="btn btn-danger"
                      style={{ padding: "0 10px" }}
                    >
                      <i class="fas fa-pencil-alt"></i>{" "}
                    </button>

                    <button
                      className="btn btn-success"
                      style={{ padding: "0 10px" }}
                    >
                      <i class="fas fa-trash"></i>{" "}
                    </button>
                  </td>
                </tr>
              );
            })}
          </table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
