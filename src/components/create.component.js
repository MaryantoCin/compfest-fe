import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import AdminService from "../services/admin.service";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const vdoctorName = (value) => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        The doctor name must be between 3 and 20 characters.
      </div>
    );
  }
};

const vdescription = (value) => {
  if (value.length < 3 || value.length > 100) {
    return (
      <div className="alert alert-danger" role="alert">
        The last name must be between 3 and 100 characters.
      </div>
    );
  }
};

const vslot = (value) => {
  if (value < 0 || value > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        The slot must be between 1 and 20.
      </div>
    );
  }
};

export default class Create extends Component {
  constructor(props) {
    super(props);
    this.handleCreate = this.handleCreate.bind(this);
    this.onChangeDoctorName = this.onChangeDoctorName.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeSlot = this.onChangeSlot.bind(this);

    this.state = {
      doctorName: "",
      description: "",
      slot: "",
      successful: false,
      message: "",
    };
  }

  onChangeDoctorName(e) {
    this.setState({
      doctorName: e.target.value,
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value,
    });
  }

  onChangeSlot(e) {
    this.setState({
      slot: e.target.value,
    });
  }

  handleCreate(e) {
    e.preventDefault();

    this.setState({
      message: "",
      successful: false,
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      AdminService.create(
        this.state.doctorName,
        this.state.description,
        this.state.slot
      ).then(
        (response) => {
          console.log(response);
          this.props.history.push("/admin");
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          this.setState({
            successful: false,
            message: resMessage,
          });
        }
      );
    }
  }

  render() {
    return (
      <div className="col-md-12">
        <div className="card card-container">
          <h1>Create Appointment</h1>
          <Form
            onSubmit={this.handleCreate}
            ref={(c) => {
              this.form = c;
            }}
          >
            {!this.state.successful && (
              <div>
                <div className="form-group">
                  <label htmlFor="doctorName">Doctor Name</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="doctorName"
                    value={this.state.doctorName}
                    onChange={this.onChangeDoctorName}
                    validations={[required, vdoctorName]}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="description">Description</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="description"
                    value={this.state.description}
                    onChange={this.onChangeDescription}
                    validations={[required, vdescription]}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="slot">Slot</label>
                  <Input
                    type="number"
                    className="form-control"
                    name="slot"
                    value={this.state.slot}
                    onChange={this.onChangeSlot}
                    validations={[required, vslot]}
                  />
                </div>

                <div className="form-group d-grid gap-2 mt-5">
                  <button className="btn btn-primary">Create</button>
                </div>
              </div>
            )}

            {this.state.message && (
              <div className="form-group">
                <div
                  className={
                    this.state.successful
                      ? "alert alert-success"
                      : "alert alert-danger"
                  }
                  role="alert"
                >
                  {this.state.message}
                </div>
              </div>
            )}
            <CheckButton
              style={{ display: "none" }}
              ref={(c) => {
                this.checkBtn = c;
              }}
            />
          </Form>
        </div>
      </div>
    );
  }
}
