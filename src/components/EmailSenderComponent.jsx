import React, { Component } from "react";

const nodemailer = require("nodemailer");

class EmailSenderComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
    };
  }

  componentDidMount() {}
  render() {
    return <div></div>;
  }
}
export default EmailSenderComponent;
