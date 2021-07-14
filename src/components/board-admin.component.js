import React, { Component } from "react";

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

  handleRegisterClick(id) {
    UserService.registerAppointment(id).then();
  }

  handleCancelClick(id) {
    UserService.cancelAppointment(id).then();
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
                    <button
                      className="btn btn-primary me-3"
                      disabled={content.slot <= 0 ? true : false}
                      onClick={() => this.handleRegisterClick(content._id)}
                    >
                      View registrants
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
