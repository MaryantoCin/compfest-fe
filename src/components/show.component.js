import React, { Component } from "react";

import AdminService from "../services/admin.service";

export default class Show extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: [],
    };
  }

  fetchApi() {
    AdminService.viewAppointment(this.props.match.params.id).then(
      (response) => {
        this.setState({
          content: response.data,
        });
        console.log(response);
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

  render() {
    return (
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{this.state.content.doctorName}</h5>
          <h6 className="card-subtitle mb-2 text-muted">
            Slot: {this.state.content.slot}
          </h6>
          <p className="card-text">{this.state.content.description}</p>
          <ul>
            {this.state.content.registrants &&
              this.state.content.registrants.map((content) => {
                return <li>{content._id}</li>;
              })}
          </ul>
        </div>
      </div>
    );
  }
}
