import React, { Component } from "react";
import Slider from "./Slider.js";
import MainPageComponent from "./MainPageComponent";
class HomePageComponent extends Component {
  render() {
    return (
      <div>
        <Slider />
        <MainPageComponent />
      </div>
    );
  }
}

export default HomePageComponent;