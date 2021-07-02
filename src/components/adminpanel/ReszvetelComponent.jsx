import React, { Component } from "react";
import AllatokService from "../../service/AllatokService";
import { Link } from "react-router-dom";
import ReszvetelService from "../../service/ReszvetelService";

class ReszvetelComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      reszvetelek: [],
    };
    this.editReszvetel = this.editReszvetel.bind(this);
  }

  editReszvetel(id) {
    this.props.history.push(`/add-participare/${id}`);
  }
  componentDidMount() {
    ReszvetelService.getResztvetelek()
      .then((res) => {
        this.setState({ reszvetelek: res.data });
      })
      .catch(function (ex) {
        console.log("Response parsing failed. Error: ", ex);
      });
    console.log(this.state.reszvetelek);
  }
  deleteKisallat(id) {
    ReszvetelService.deleteResztvetel(id).then((res) => {
      this.setState({
        reszvetelek: this.state.reszvetelek.filter(
          (reszvetel) => reszvetel.id !== id
        ),
      });
      console.log(this.state.reszvetelek);
    });
  }
  render() {
    if (this.state.reszvetelek != "null")
      return (
        <div>
          <button className="infoBtnAdd">
            <Link to={`/add-participare/_add`}>Adaugă</Link>
          </button>
          <table className="tagokTable">
            <thead>
              <tr>
                <th>Punctaj</th>

                <th>Expoziție</th>

                <th>Animal</th>
              </tr>
            </thead>
            <tbody>
              {this.state.reszvetelek.map((reszvetel) => (
                <tr key={reszvetel.id}>
                  <td>{reszvetel.pontszam}</td>
                  <td>{reszvetel.kiallitas.helyseg}</td>
                  <td>
                    {reszvetel.kisallat.fajta.fajta +
                      " " +
                      reszvetel.kisallat.balful +
                      " " +
                      reszvetel.kisallat.jobbful}
                  </td>

                  <td>
                    <button className="infoBtn" id={reszvetel.id}>
                      <Link to={`/add-participare/${reszvetel.id}`}>
                        Update
                      </Link>
                    </button>
                    <button
                      className="infoBtn"
                      onClick={() => this.deleteResztvetel(reszvetel.id)}
                      id={reszvetel.id}
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

export default ReszvetelComponent;
