import React, { Component } from "react";
import EgyesuletekService from "../service/EgyesuletekService";
import KeresService from "../service/KeresService";
import axios from "axios";
import { typeOf } from "react-is";

class Jovahagyas extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.match.params.id,
      keresek: {},
      load: false,
    };
  }
  componentDidMount() {
    // this.getKeresek();
    console.log(this.state.keresek);
    KeresService.getKeresById(this.state.id)
      .then((res) => {
        let kisallat = res.data;
        console.log(res.data);
        this.setState({ keresek: res.data });
        console.log(this.state.keresek);
        console.log(kisallat);
      })
      .catch(function (ex) {
        console.log("Response parsing failed. Error: ", ex);
      });
  }
  async getKeresek() {
    KeresService.getKeresById(this.state.id)
      .then((res) => {
        this.setState({ keresek: res.data });
        console.log(this.state.keresek);
      })
      .catch(function (ex) {
        console.log("Response parsing failed. Error: ", ex);
      });
  }

  render() {
    console.log(this.state.keresek, "szovegrender");
    if (typeof this.state.keresek.id == "undefined") return "";
    var count = Object.keys(this.state.keresek).length;
    console.log(count);
    return (
      <div>
        <div class="jovahagyas">
          <input
            type="text"
            value={this.state.keresek.tulajdonos.nev}
            // placeholder={this.state.keresek.tulajdonos}
          />
          <input type="text" />
          <button class="infoBtnAdd">jovahagy</button>
        </div>
        <table className="keresekTable">
          <thead>
            <tr>
              <th>Jobbful</th>
              <th>Balful</th>
              <th>Anyajobbful</th>
              <th>Anyabalful</th>
              <th>Apajobbful</th>
              <th>Apabalful</th>
              <th>bakok</th>
              <th>nostenyek</th>
              <th>fajta</th>
              <th>szuldat</th>
              <th>tenyeszto</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{this.state.bakok}</td>
              <td>{this.props.match.params.id}</td>
              <td>{this.state.keresek.apajobbful}</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default Jovahagyas;