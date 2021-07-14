import React, { Component } from "react";
import { Link } from "react-router-dom";
import AdminService from "../services/admin.service";

import UserService from "../services/user.service";

export default class BoardUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: [],
    };
  }

  fetchApi() {
    UserService.getAppointment().then(
      (response) => {
        this.setState({
          content: response.data,
        });
      },
      (error) => {
        this.setState({
          content:
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString(),
        });
      }
    );
  }

  componentDidMount() {
    this.fetchApi();
  }

  handleDeleteClick(id) {
    AdminService.delete(id).then(this.fetchApi());
  }

  render() {
    return (
      <div className="container">
        <header className="jumbotron">
          {this.state.content &&
            this.state.content.map((content) => {
              return (
                <div className="card" key={content._id}>
                  <div className="card-body">
                    <h5 className="card-title">{content.doctorName}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">
                      Slot: {content.slot}
                    </h6>
                    <p className="card-text">{content.description}</p>
                    <Link
                      to={"appointment/" + content._id}
                      className="btn btn-primary me-3"
                    >
                      View registrants
                    </Link>
                    <button
                      className="btn btn-danger"
                      onClick={() => this.handleDeleteClick(content._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
        </header>
      </div>
    );
  }
}
