import React, { Component } from "react";
import kep1 from "../img/album/20200204_113822.jpg";
import kep2 from "../img/album/20200204_113950.jpg";
import kep3 from "../img/album/20200204_114059.jpg";
import kep4 from "../img/album/20200204_114231.jpg";
import AllatokService from "../service/AllatokService";
import SliderComponent from "./SliderComponent.jsx";
import StatisztikaComponent from "./StatisztikaComponent";

class MainPage extends Component {
  constructor(props) {
    super(props);
  }
  state = { motivacio: false, kinek: false, osszes: false };
  motivacio = () => {
    this.setState({
      motivacio: true,
      kinek: false,
      osszes: false,
    });
  };
  osszes = () => {
    this.setState({
      osszes: true,
      motivacio: false,
      kinek: false,
    });
  };
  kinek = () => {
    this.setState({
      kinek: true,
      osszes: false,
      motivacio: false,
    });
  };
  render() {
    const motivacio = this.state.motivacio == true ? "show" : "hide";
    const kinek = this.state.kinek == true ? "show" : "hide";
    const osszes = this.state.osszes == true ? "show" : "hide";
    let szoveg;
    if (
      this.state.motivacio == false &&
      this.state.kinek == false &&
      this.state.osszes == false
    )
      szoveg = (
        <div className="text">
          3Az oldal azert jott letre, hogy kozos egyuttmukodessel inditsunk el
          egy hianyzo, de , a kisallattarto gazdak szamara szuksegszeruen fontos
          nemzeti nyilvantartast azokrol, akik hobbybol vagy hivatasszeruen
          kisallattenyesztessel foglalkoznak.
        </div>
      );
    else if (this.state.kinek == true)
      szoveg = (
        <div className="text">
          3Az oldal azert jott letre, hogy kozos egyuttmukodessel inditsunk el
          egy hianyzo, de , a kisallattarto gazdak szamara szuksegszeruen fontos
          nemzeti nyilvantartast azokrol, akik hobbybol vagy hivatasszeruen
          kisallattenyesztessel foglalkoznak.
        </div>
      );
    else if (this.state.osszes)
      szoveg = (
        <div className="text">
          3Az oldal azert jott letre, hogy kozos egyuttmukodessel inditsunk el
          egy hianyzo, de , a kisallattarto gazdak szamara szuksegszeruen fontos
          nemzeti nyilvantartast azokrol, akik hobbybol vagy hivatasszeruen
          kisallattenyesztessel foglalkoznak.
        </div>
      );
    return (
      <div>
        <div>
          <div className="container">
            <div className=" description">
              <h2>Despre noi</h2>
              <div>
                <div
                  className="navbar"
                  style={{ justifyContent: "space-evenly" }}
                >
                  <ul>
                    <li className={`selected${motivacio}`}>
                      <a onClick={this.motivacio}>Motivație</a>
                    </li>
                    <li className={`selected${kinek}`}>
                      <a onClick={this.kinek}>Pentru cine</a>
                    </li>
                    <li className={`selected${osszes}`}>
                      <a onClick={this.osszes}>Pentru ce</a>
                    </li>
                  </ul>
                </div>
                {szoveg}

                <div className="buttons">
                  <div className="button">
                    <a href="">Citește mai mult</a>
                  </div>
                  <div className="triangle-rigth"></div>
                </div>
              </div>
            </div>
            <div className="imgs">
              <SliderComponent />
            </div>
          </div>
        </div>

        <div>
          <div className="titleBox">De ce să-ne alegi?</div>
          <div className="boxes">
            <div>
              <div className="box"></div>
              <h4>Anunțuri</h4>
              <p>Itt tehetsz fel hirdetest</p>
            </div>
            <div>
              <div className="box"></div>
              <h4>Descrieri de rasă</h4>
              <p>
                {/* {this.state.counted.map((count) => (
                  <p>{count.number}</p>
                ))} */}
              </p>
            </div>
            <div>
              <div className="box"></div>
              <h4>Membri</h4>
              <p>
                Megtekintheted kik tagok egyesuletben, ha te is az vagy te is
                bekerulhetsz
              </p>
            </div>
            <div>
              <div className="box"></div>
              <h4>Cerere tatuaj iepuri</h4>
              <p>Ha szeretnel nyulaknak azonositot kerni az itt megtehetes</p>
            </div>
          </div>
        </div>
        <div>
          <StatisztikaComponent />
        </div>
        <div style={{ height: "450px" }}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d22026.249859438532!2d25.797942799999998!3d46.363808!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1shu!2sro!4v1614075539183!5m2!1shu!2sro"
            className="map"
          ></iframe>
        </div>
      </div>
    );
  }
}

export default MainPage;
