import React, { Component } from "react";
import TulajokService from "../service/TulajokService";
import { Link } from "react-router-dom";

class TagokComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tulajok: [],
    };
  }

  componentDidMount() {
    TulajokService.getTulajok()
      .then((res) => {
        this.setState({ tulajok: res.data });
      })
      .catch(function (ex) {
        console.log("Response parsing failed. Error: ", ex);
      });
  }

  render() {
    return (
      <div>
        <table className="tagokTable">
          <thead>
            <tr>
              <th>Nev</th>

              <th>Cim</th>

              <th>Egyesulet</th>

              <th>Fajtak</th>
            </tr>
          </thead>
          <tbody>
            {this.state.tulajok.map((tulaj) => (
              <tr key={tulaj.id}>
                <td>{tulaj.nev}</td>
                <td>{tulaj.cim}</td>
                <td>{tulaj.egyesuletNev}</td>
                <td>{tulaj.fajtanev.slice(1, -1)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default TagokComponent;
