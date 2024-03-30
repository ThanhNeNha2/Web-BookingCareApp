import userService from "../services/userService";

let handleLogin = async (req, res) => {
  let email = req.body.email;
  let pass = req.body.password;
  if (!email || !pass) {
    return res.status(500).json({
      errCode: 1,
      message: "Missing inputs parameter!",
    });
  }
  let userData = await userService.handleUserLogin(email, pass);
  return res.status(200).json({
    errCode: userData.errCode,
    message: userData.errMessage,
    user: userData.user ? userData.user : {},
  });
};
let handleGetAllUser = async (req, res) => {
  let id = req.body.id;
  if (!id) {
    return res.status(200).json({
      errCode: 1,
      message: "Missing required",
      users: [],
    });
  }
  let users = await userService.getAllUser(id);
  console.log(users);
  return res.status(200).json({
    errCode: 0,
    message: "ok",
    users,
  });
};
module.exports = {
  handleLogin: handleLogin,
  handleGetAllUser: handleGetAllUser,
};
