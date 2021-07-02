import React, { Component } from "react";
import KiallitasokService from "../../service/KiallitasokService";
import { Link } from "react-router-dom";

class KiallitasComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      kiallitasok: [],
    };
    this.editKiallitas = this.editKiallitas.bind(this);
  }

  editKiallitas(id) {
    this.props.history.push(`/add-expozitie/${id}`);
  }
  componentDidMount() {
    KiallitasokService.getKiallitasok()
      .then((res) => {
        this.setState({ kiallitasok: res.data });
        console.log(this.state);
      })
      .catch(function (ex) {
        console.log("Response parsing failed. Error: ", ex);
      });
  }
  deleteKiallitas(id) {
    KiallitasokService.deleteKiallitas(id).then((res) => {
      this.setState({
        kiallitasok: this.state.kiallitasok.filter(
          (kiallitas) => kiallitas.id !== id
        ),
      });
      console.log(this.state.kiallitasok);
    });
  }
  render() {
    return (
      <div>
        <button className="infoBtnAdd">
          <Link to={`/add-expozitie/_add`}>Adaugă</Link>
        </button>
        <table className="tagokTable">
          <thead>
            <tr>
              <th>Localitate</th>

              <th>Începe</th>

              <th>Se termină</th>
            </tr>
          </thead>
          <tbody>
            {this.state.kiallitasok.map((kiallitas) => (
              <tr key={kiallitas.id}>
                <td>{kiallitas.helyseg}</td>
                <td>{kiallitas.kezdodatum}</td>
                <td>{kiallitas.vegdatum}</td>
                <td>
                  <button className="infoBtn" id={kiallitas.id}>
                    <Link to={`/add-expozitie/${kiallitas.id}`}>Update</Link>
                  </button>
                  <button
                    className="infoBtn"
                    onClick={() => this.deletekiallitas(kiallitas.id)}
                    id={kiallitas.id}
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

export default KiallitasComponent;