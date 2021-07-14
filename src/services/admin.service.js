import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:3000/api/";

class AdminService {
  create(doctorName, description, slot) {
    return axios.get(API_URL + "appointment/create", {
      headers: authHeader(),
      data: { doctorName, description, slot },
    });
  }
}

export default new AdminService();
