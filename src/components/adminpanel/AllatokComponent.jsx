import React, { Component } from "react";
import AllatokService from "../../service/AllatokService";
import { Link } from "react-router-dom";
import FajtaService from "../../service/FajtaService";

class AllatokComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      allatok: [],
    };
    this.editAllatok = this.editAllatok.bind(this);
  }

  editAllatok(id) {
    this.props.history.push(`/add-animale/${id}`);
  }
  componentDidMount() {
    AllatokService.getkisallatok()
      .then((res) => {
        this.setState({ allatok: res.data });
      })
      .catch(function (ex) {
        console.log("Response parsing failed. Error: ", ex);
      });
    console.log(this.state.allatok);
  }
  deleteKisallat(id) {
    AllatokService.deleteKisallat(id).then((res) => {
      this.setState({
        allatok: this.state.allatok.filter((allat) => allat.id !== id),
      });
      console.log(this.state.allatok);
    });
  }
  render() {
    const allatok = this.state.allatok;
    console.log(this.state.allatok);
    if (this.state.allatok != "null")
      return (
        <div>
          <button className="infoBtnAdd">
            <Link to={`/add-animale/_add`}>Adaugă</Link>
          </button>
          <table className="tagokTable">
            <thead>
              <tr>
                <th>Urechea stânga</th>

                <th>Urechea dreapta</th>

                <th>Sex</th>

                <th>Rasa</th>
              </tr>
            </thead>
            <tbody>
              {this.state.allatok.map((allat) => (
                <tr key={allat.id}>
                  <td>{allat.balful}</td>
                  <td>{allat.jobbful}</td>
                  <td>{allat.nem ? "mascul" : "femela"}</td>
                  <td>{allat.fajta.fajta}</td>
                  <td>
                    <button className="infoBtn" id={allat.id}>
                      <Link to={`/add-animale/${allat.id}`}>Update</Link>
                    </button>
                    <button
                      className="infoBtn"
                      onClick={() => this.deleteKisallat(allat.id)}
                      id={allat.id}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
  }
}

export default AllatokComponent;
