import axios from "../axios";
function handleLoginApi(email, password) {
  return axios.post("/api/login", { email, password });
}

const getALLUsers = (id) => {
  return axios.get(`/api/get-all-users/?id=${id}`);
};
export { handleLoginApi, getALLUsers };
