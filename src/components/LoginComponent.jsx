
import React, { Component } from "react";
import img1 from "../img/nature3.jpg";

class LoginComponent extends Component {
  render() {
    return (
      <div>
        <img src={img1} height="600px" width="100%" alt="img1" />
        <div className="in-left" id="in-leftPic">
          <h1>Nehany szo rolunk</h1>
          <div>
            ide is fog jonni szoveg csak meg nem tudom hogy mit tegyek be,
            valamit ami fontos lehet
          </div>
        </div>
        <div className="loginDiv">
          <div>
            <input type="text" name="userName" id="" value="Username" />
          </div>
          <div>
            <input
              type="password"
              name="password"
              id=""
              value="Password"
              onChange={this.handleChange}
            />
          </div>
          <div>
            <button className="loginBtn">Login</button>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginComponent;