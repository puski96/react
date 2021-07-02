import React, { Component } from "react";
import EgyesuletekService from "../../service/EgyesuletekService";
import { Link } from "react-router-dom";

class EgyesuletekComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      egyesuletek: [],
    };
    this.editEgyesulet = this.editEgyesulet.bind(this);
  }

  editEgyesulet(id) {
    this.props.history.push(`/add-egyesulet/${id}`);
  }
  componentDidMount() {
    EgyesuletekService.getEgyesuletek()
      .then((res) => {
        this.setState({ egyesuletek: res.data });
        console.log(this.state);
      })
      .catch(function (ex) {
        console.log("Response parsing failed. Error: ", ex);
      });
  }
  deleteEgyesulet(id) {
    EgyesuletekService.deleteEgyesulet(id).then((res) => {
      this.setState({
        egyesuletek: this.state.egyesuletek.filter(
          (Egyesulet) => Egyesulet.id !== id
        ),
      });
      console.log(this.state.egyesuletek);
    });
  }
  render() {
    
    return (
      <div>
        <button className="infoBtnAdd">
          <Link to={`/add-asociatie/_add`}>Adaugă</Link>
        </button>
        <table className="tagokTable">
          <thead>
            <tr>
              <th>Nume</th>

              <th>Localitate</th>

              <th>Președinte</th>
              <th>Nr. Asociație</th>
            </tr>
          </thead>
          <tbody>
            {this.state.egyesuletek.map((Egyesulet) => (
              <tr key={Egyesulet.id}>
                <td>{Egyesulet.nev}</td>
                <td>{Egyesulet.helyseg}</td>
                <td>{Egyesulet.elnok}</td>
                <td>{Egyesulet.azonosito}</td>
                <td>
                  <button className="infoBtn" id={Egyesulet.id}>
                    <Link to={`/add-asociatie/${Egyesulet.id}`}>Update</Link>
                  </button>
                  <button
                    className="infoBtn"
                    onClick={() => this.deleteEgyesulet(Egyesulet.id)}
                    id={Egyesulet.id}
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

export default EgyesuletekComponent;
