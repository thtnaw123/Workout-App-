import axios from "axios";

const user = JSON.parse(localStorage.getItem("user"));

console.log(user);
const token = user?.token;
const userId = user?.userId;

const bodyParameters = {
  userId: userId,
};

export default axios.create({
  baseURL: "http://localhost:3000/api/workout",
  headers: { Authorization: "Bearer " + token },
});
