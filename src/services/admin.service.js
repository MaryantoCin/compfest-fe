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

  viewAppointment(id) {
    return axios.get(API_URL + "appointment/" + id + "/registrants", {
      headers: authHeader(),
    });
  }

  delete(id) {
    return axios.delete(API_URL + "appointment/" + id, {
      headers: authHeader(),
    });
  }
}

export default new AdminService();
