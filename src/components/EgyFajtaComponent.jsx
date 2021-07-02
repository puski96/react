import React, { Component } from "react";
import { Route, withRouter } from "react-router-dom";
import FajtaService from "../service/FajtaService";

class EgyFajtaComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rovidites: this.props.match.params.rovidites,
      fajta: {},
    };
  }
  componentDidMount() {
    FajtaService.getFajtaByRovidites(this.state.rovidites).then((res) => {
      this.setState({ fajta: res.data });
    });
  }
  render() {
    return (
      <div>
        <div>
          <h2 className="fajtaDetailName">{this.state.fajta.fajta}</h2>
          <img
            className="fajtaDetailImg"
            src={"../img/fajtak/" + this.state.fajta.kep}
            alt=""
          />
          <div
            className="fajtaDetail"
            dangerouslySetInnerHTML={{ __html: this.state.fajta.fajtaleiras }}
          ></div>
        </div>
      </div>
    );
  }
}

export default EgyFajtaComponent;