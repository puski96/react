import React, { Component } from "react";
import Select from "react-select";
import AdminPanelService from "../../service/AdminPanelService";
import KiallitasokService from "../../service/KiallitasokService";

class addKiallitasComponent extends Component {
  constructor(props) {
    super(props);
    this.goBack = this.goBack.bind(this);
    this.state = {
      id: this.props.match.params.id,
      helyseg: "",
      kezdodatum: "",
      vegdatum: "",
    };
  }
  goBack() {
    this.props.history.goBack();
  }
  componentDidMount() {
    if (this.state.id === "_add") {
      return;
    } else {
      KiallitasokService.getKiallitasById(this.state.id).then((res) => {
        let kiallitas = res.data;
        console.log(res.data);
        this.setState({
          id: res.data.id,
          helyseg: res.data.helyseg,
          kezdodatum: res.data.kezdodatum,
          vegdatum: res.data.vegdatum,
        });
        console.log(kiallitas);
      });
    }
    console.log(this.state);
  }

  saveOrUpdateKiallitas = (e) => {
    e.preventDefault();
    let kiallitasUpdate = {
      id: this.state.id,
      helyseg: this.state.helyseg,
      kezdodatum: this.state.kezdodatum,
      vegdatum: this.state.vegdatum,
    };
    let kiallitasAdd = {
      helyseg: this.state.helyseg,
      kezdodatum: this.state.kezdodatum,
      vegdatum: this.state.vegdatum,
    };
    console.log("kiallitas => " + JSON.stringify(kiallitasAdd));
    console.log("kiallitas => " + JSON.stringify(kiallitasUpdate));

    if (this.state.id === "_add") {
      KiallitasokService.addKiallitas(kiallitasAdd).then((res) => {});
      this.goBack();
    } else {
      KiallitasokService.updateKiallitas(
        kiallitasUpdate,
        this.state.id
      ).then((res) => {});
      this.goBack();
    }
  };

  changeVegdatumHandler = (event) => {
    this.setState({ vegdatum: event.target.value });
  };

  changeHelysegHandler = (event) => {
    this.setState({ helyseg: event.target.value });
  };
  changeKezdodatumHandler = (event) => {
    this.setState({ kezdodatum: event.target.value });
  };

  render() {
    return (
      <div>
        <form class="addForm">
          <div>
            <label> Localitate </label>
            <input
              placeholder="Localitate"
              name="localitate"
              className="form-control"
              value={this.state.helyseg}
              onChange={this.changeHelysegHandler}
            />
          </div>
          <div>
            <label> Incepe </label>
            <input
              type="date"
              placeholder="Inceput"
              name="Inceput"
              className="form-control"
              value={this.state.kezdodatum}
              onChange={this.changeKezdodatumHandler}
            />
          </div>
          <div>
            <label> Termină </label>
            <input
              type="date"
              placeholder="Terminat"
              name="Terminat"
              className="form-control"
              value={this.state.vegdatum}
              onChange={this.changeVegdatumHandler}
            />
          </div>

          <button
            className="btn btn-success"
            onClick={this.saveOrUpdateKiallitas}
          >
            Salvare
          </button>
        </form>
      </div>
    );
  }
}

export default addKiallitasComponent;