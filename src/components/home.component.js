import React, { Component } from "react";

export default class Home extends Component {
  render() {
    return (
      <div class="container home-container">
        <div class="row">
          <div class="col-lg-6 d-flex flex-column justify-content-center">
            <h1>We offer modern solutions for your health</h1>
            <h4>
              You can have your health check as soon as possible through our
              website
            </h4>
          </div>
          <div class="col-lg-6 hero-img d-flex flex-column justify-content-center">
            <img src="illustration.svg" class="img-fluid" alt="" />
          </div>
        </div>
      </div>
    );
  }
}
