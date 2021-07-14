import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:3000/api/";

class UserService {
  getProfile() {
    return axios.post(API_URL + "profile", { headers: authHeader() });
  }

  getAppointment() {
    return axios.get(API_URL + "appointment", { headers: authHeader() });
  }

  registerAppointment(id) {
    return axios.get(API_URL + "appointment/" + id + "/register", {
      headers: authHeader(),
    });
  }

  cancelAppointment(id) {
    return axios.get(API_URL + "appointment/" + id + "/cancel", {
      headers: authHeader(),
    });
  }

  viewAppointment(id) {
    return axios.get(API_URL + "appointment/" + id + "/registrants", {
      headers: authHeader(),
    });
  }
}

export default new UserService();
