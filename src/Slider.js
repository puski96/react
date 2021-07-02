import React from "react";
import { Carousel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import img1 from "./img/rabbit.slide.jpg";
import img2 from "./img/eggs10_chicken.jpg";

function imageSlider() {
  return (
    <div>
      <hr />
      <Carousel interval={1300}>
        <Carousel.Item>
          <img src={img1} height="600px" width="100%" alt="img1" />
        </Carousel.Item>
        <Carousel.Item>
          <img src={img2} height="600px" width="100%" alt="img1" />
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

export default imageSlider;
