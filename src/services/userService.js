import axios from "../axios";
function handleLoginApi(email, password) {
  return axios.post("/api/login", { email, password });
}

const getALLUsers = (id) => {
  return axios.get(`/api/get-all-users/?id=${id}`);
};
const createNewUserService = (data) => {
  return axios.post("/api/create-new-user", data);
};

const deleteUserService = (userId) => {
  return axios.delete("/api/delete-user", {
    data: {
      id: userId,
    },
  });
};
export { handleLoginApi, getALLUsers, createNewUserService, deleteUserService };
