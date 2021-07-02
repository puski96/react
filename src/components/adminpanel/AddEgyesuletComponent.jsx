import React, { Component } from "react";
import Select from "react-select";
import axios from "axios";
import AdminPanelService from "../../service/AdminPanelService";
import EgyesuletekService from "../../service/EgyesuletekService";

class addEgyesuletComponent extends Component {
  constructor(props) {
    super(props);
    this.goBack = this.goBack.bind(this);
    this.state = {
      id: this.props.match.params.id,
      nev: "",
      helyseg: "",
      elnok: "",
      azonosito: "",
    };
  }
  goBack() {
    this.props.history.goBack();
  }
  componentDidMount() {
    if (this.state.id === "_add") {
      return;
    } else {
      EgyesuletekService.getEgyesuletById(this.state.id).then((res) => {
        let egyesulet = res.data;
        console.log(res.data);
        this.setState({
          id: res.data.id,
          nev: res.data.nev,
          helyseg: res.data.helyseg,
          elnok: res.data.elnok,
          azonosito: res.data.azonosito,
        });
        console.log(egyesulet);
      });
    }
    console.log(this.state);
  }

  saveOrUpdateEgyesulet = (e) => {
    e.preventDefault();
    let egyesuletUpdate = {
      id: this.state.id,
      nev: this.state.nev,
      helyseg: this.state.helyseg,
      elnok: this.state.elnok,
      azonosito: this.state.azonosito,
    };
    let egyesuletAdd = {
      nev: this.state.nev,
      helyseg: this.state.helyseg,
      elnok: this.state.elnok,
      azonosito: this.state.azonosito,
    };
    console.log("egyesulet => " + JSON.stringify(egyesuletAdd));
    console.log("egyesulet => " + JSON.stringify(egyesuletUpdate));

    if (this.state.id === "_add") {
      EgyesuletekService.addEgyesulet(egyesuletAdd).then((res) => {});
      this.goBack();
    } else {
      EgyesuletekService.updateEgyesulet(
        egyesuletUpdate,
        this.state.id
      ).then((res) => {});
      this.goBack();
    }
  };

  changeNevHandler = (event) => {
    this.setState({ nev: event.target.value });
  };

  changeHelysegHandler = (event) => {
    this.setState({ helyseg: event.target.value });
  };
  changeAzonositoHandler = (event) => {
    this.setState({ azonosito: event.target.value });
  };
  changeElnokHandler = (event) => {
    this.setState({ elnok: event.target.value });
  };

  render() {
    return (
      <div>
        <form class="addForm">
          <div>
            <label> Nume </label>
            <input
              placeholder="Nume"
              name="nume"
              className="form-control"
              value={this.state.nev}
              onChange={this.changeNevHandler}
            />
          </div>
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
            <label> Președinte </label>
            <input
              placeholder="Elnok"
              name="elnok"
              className="form-control"
              value={this.state.elnok}
              onChange={this.changeElnokHandler}
            />
          </div>
          <div>
            <label> Nr. Asociație </label>
            <input
              placeholder="Azonosito"
              name="azonosito"
              className="form-control"
              value={this.state.azonosito}
              onChange={this.changeAzonositoHandler}
            />
          </div>
          <button
            className="btn btn-success"
            onClick={this.saveOrUpdateEgyesulet}
          >
            Salvare
          </button>
        </form>
      </div>
    );
  }
}

export default addEgyesuletComponent;