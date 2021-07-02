import React, { Component } from "react";
import logo from "../img/logo-removebg-preview.png";

class FooterComponent extends Component {
  render() {
    return (
      <div>
        <div className="footer">
          <div style={{ width: "fit-content" }}>
            <img src={logo} alt="logo" className="header-pic" />
          </div>
          <div className="elerhetoseg">
            <h3>Contact</h3>
            <div className="elerhetosegItem">
              <div>
                <i className="fa fa-map-marker" aria-hidden="true"></i>
                <p>537335 Tușnad județul Harghita România</p>
              </div>
              <div>
                <i className="fa fa-phone" aria-hidden="true"></i>
                <p>0724420184</p>
              </div>
              <div>
                <i className="fa fa-envelope" aria-hidden="true"></i>
                <p>puskas.gabika@gmail.com</p>
              </div>
            </div>
          </div>
          <div className="hirlevel">
            <h3>Newsletter</h3>
            <p>
              Dacă vrei să fi la curent cu actualizări, sau dacă apare un nou
              desciere de rasă lasă aici adresa ta de e-mail și îți vom trimite
              actualizările.
            </p>
            <input type="email" name="signUpEmail" placeholder="Email" id="" />
            <i className="fa fa-paper-plane" aria-hidden="true"></i>
          </div>
        </div>
        <div className="bottomFooter">
          <div>Puskás Gábor EMTE Sapientia Miercurea Ciuc 2021</div>
        </div>
      </div>
    );
  }
}

export default FooterComponent;
