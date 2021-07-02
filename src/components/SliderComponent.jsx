import { Splide, SplideSlide } from "@splidejs/react-splide";
import React, { Component } from "react";

class SplideComponent extends Component {
  constructor(props) {
    super(props);
    this.primaryRef = React.createRef();
    this.secondaryRef = React.createRef();
  }

  render() {
    return (
      <div>
        <div id="image-slider" className="splide">
          <div className="splide__track">
            <ul className="splide__list">
              <li className="splide__slide">
                <img src="./img/kepek/20210521_203628.jpg" />
              </li>
              <li className="splide__slide">
                <img src="./img/kepek/20210521_203758.jpg" />
              </li>
              <li className="splide__slide">
                <img src="./img/kepek/20210521_212301.jpg" />
              </li>
            </ul>
          </div>
        </div>

        <div id="secondary-slider" className="splide">
          <div className="splide__track">
            <ul className="splide__list">
              <li className="splide__slide">
                <img src="./img/kepek/20210521_203628.jpg" />
              </li>
              <li className="splide__slide">
                <img src="./img/kepek/20210521_203758.jpg" />
              </li>
              <li className="splide__slide">
                <img src="./img/kepek/20210521_212301.jpg" />
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default SplideComponent;
