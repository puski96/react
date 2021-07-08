import React, { Component } from "react";
import Slider from "../Slider.js";
import FajtaComponent from "../FajtaComponent";
import { Carousel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import img1 from "../../img/album/20200314_142546.jpg";
import img2 from "../../img/album/20200204_135331.jpg";
import FajtaService from "../../service/FajtaService.js";
import { Link } from "react-router-dom";

class AdminComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fajtak: [],
    };
  }

  render() {
    return (
      <div>
        <hr />
        <Carousel interval={2000}>
          <Carousel.Item>
            <img src={img1} height="600px" width="100%" alt="img1" />
            <div className="in-left">
              <h1>Udvozollek a fajtaleirasoknal</h1>
              <div>
                ide is fog jonni szoveg csak meg nem tudom hogy mit tegyek be,
                valamit ami fontos lehet
              </div>
            </div>
          </Carousel.Item>
          <Carousel.Item>
            <img src={img2} height="600px" width="100%" alt="img1" />
          </Carousel.Item>
        </Carousel>

        <div style={{ display: "flex", flexWrap: "wrap" }}>
          <div className="adminContainer">
            <article className="initialBox">
              <div className="adminBox">
                <div>
                  <h2>Crescători</h2>
                  <div className="szoveg">
                    Aici poți să te uiți la crescători, poți da un alt
                    crescător, sau să modifici datele dacă s-a schimbat ceva,
                    poți șterge sau dacă cineva a devenit membru al asociației
                    tale poți sa-i dai o altă permisiune.
                  </div>
                </div>
                <button className="button">
                  <Link to={`/adminpanel/crescatori`}>Modificare</Link>
                </button>
              </div>
            </article>
          </div>
          <div className="adminContainer">
            <article className="initialBox">
              <div className="adminBox">
                <div>
                  <h2>Asociații</h2>
                  <div className="szoveg">
                    Aici poți să te uiți la asociații, poți da o altă asociație,
                    sau să modifici datele dacă s-a schimbat ceva, poți și
                    șterge.
                  </div>
                </div>
                <button className="button">
                  <Link to={`/adminpanel/asociatii`}>Modificare</Link>
                </button>
              </div>
            </article>
          </div>
          <div className="adminContainer">
            <article className="initialBox">
              <div className="adminBox">
                <div>
                  <h2>Animale</h2>
                  <div className="szoveg">
                    Aici poți să te uiți la animale, poți da un alt animal, sau
                    să modifici datele dacă s-a schimbat ceva, poți și șterge.
                  </div>
                </div>
                <button className="button">
                  <Link to={`/adminpanel/animale`}>Modificare</Link>
                </button>
              </div>
            </article>
          </div>
          <div className="adminContainer">
            <article className="initialBox">
              <div className="adminBox">
                <div>
                  <h2>Expoziții</h2>
                  <div className="szoveg">
                    Itt lesz egy szoveg, kb hogy itt tudod szerkeszteni a
                    tenyesztoket
                  </div>
                </div>
                <button className="button">
                  <Link to={`/adminpanel/expozitii`}>Modificare</Link>
                </button>
              </div>
            </article>
          </div>
          <div className="adminContainer">
            <article className="initialBox">
              <div className="adminBox">
                <div>
                  <h2>Participare</h2>
                  <div className="szoveg">
                    Itt lesz egy szoveg, kb hogy itt tudod szerkeszteni a
                    tenyesztoket
                  </div>
                </div>
                <button className="button">
                  <Link to={`/adminpanel/participare`}>Modificare</Link>
                </button>
              </div>
            </article>
            <article>
              <EmailSenderComponent />
            </article>
          </div>
        </div>
      </div>
    );
  }
}

export default AdminComponent;
