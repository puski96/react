import React, { Component } from "react";
import Header from "./HeaderComponent";
import img1 from "../img/nature3.jpg";

class RolunkComponent extends Component {
  render() {
    return (
      <div>
        <img
          src="./img/kepek/20210521_203547.jpg"
          height="600px"
          width="100%"
          alt="img1"
        />
        <div className="in-left" id="in-leftPic">
          <h1>Nehany szo rolunk</h1>
          <div>
            ide is fog jonni szoveg csak meg nem tudom hogy mit tegyek be,
            valamit ami fontos lehet
          </div>
        </div>
      </div>
    );
  }
}

export default RolunkComponent;
