
import React, { Component } from "react";
import { Link } from "react-router-dom";
import kep1 from "../img/nyulfajtak/Neozeelandezrosu.JPG";
import kep2 from "../img/album/20200204_114557.jpg";
import kep3 from "../img/album/20200315_144906.jpg";
import kep4 from "../img/album/20200415_193545.jpg";
import SliderComponent from "./SliderComponent.jsx";
import SliderComponent1 from "./SliderComponent.jsx";
import FajtaService from "../service/FajtaService.js";

class FajtaComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fajtak: [],
    };
  }

  componentDidMount() {
    FajtaService.getFajtak()
      .then((res) => {
        this.setState({ fajtak: res.data });
        console.log(this.state.data);
      })
      .catch(function (ex) {
        console.log("Response parsing failed. Error: ", ex);
      });
  }

  render() {
    function importAll(r) {
      return r.keys().map(r);
    }

    const images = importAll(require.context("./", false, /\.(png|jpeg|svg)$/));

    return (
      <div>
        
      </div>
    );
  }
}

export default FajtaComponent;