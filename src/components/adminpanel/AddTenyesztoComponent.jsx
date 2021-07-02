import React, { Component } from "react";
import Select from "react-select";
import axios from "axios";
import AdminPanelService from "../../service/AdminPanelService";
import TenyesztokService from "../../service/TenyesztokService";

class addTenyesztoComponent extends Component {
  constructor(props) {
    super(props);
    this.goBack = this.goBack.bind(this);

    this.state = {
      id: this.props.match.params.id,
      tenyeszto: {},
      nev: "",
      cim: "",
      telszam: "",
      biro: "",
      egyesuletId: "",
      selectOptions: [],
    };
    console.log(this.state.selectOptions);
  }
  goBack() {
    this.props.history.goBack();
  }
  componentDidMount() {
    console.log(this.state.id);
    if (this.state.id === "_add") {
      this.getOptions();
      return;
    } else {
      TenyesztokService.getTenyesztoById(this.state.id).then((res) => {
        let tulaj = res.data;
        console.log(res.data);
        this.setState({
          id: res.data.id,
          nev: res.data.nev,
          cim: res.data.cim,
          telszam: res.data.telszam,
          biro: res.data.biro,
          egyesuletId: res.data.egyesuletId,
          // tenyeszto: res.data,
        });
        console.log(tulaj);
      });
      this.getOptions();
    }
    console.log(this.state);
  }

  saveOrUpdateTulaj = (e) => {
    e.preventDefault();
    let tulajUpdate = {
      id: this.state.id,
      nev: this.state.nev,
      cim: this.state.cim,
      telszam: this.state.telszam,
      biro: this.state.biro,
      egyesuletId: this.state.egyesuletId,
    };
    let tulajAdd = {
      nev: this.state.nev,
      cim: this.state.cim,
      telszam: this.state.telszam,
      biro: this.state.biro,
      egyesuletId: this.state.egyesuletId,
    };
    console.log("tulaj => " + JSON.stringify(tulajAdd));
    console.log("tulaj => " + JSON.stringify(tulajUpdate));

    if (this.state.id === "_add") {
      TenyesztokService.addTenyeszto(tulajAdd).then((res) => {});
      this.goBack();
    } else {
      TenyesztokService.updateTenyeszto(
        tulajUpdate,
        this.state.id
      ).then((res) => {});
      this.goBack();
    }
  };

  changeNevHandler = (event) => {
    this.setState({ nev: event.target.value });
  };

  changeCimHandler = (event) => {
    this.setState({ cim: event.target.value });
  };
  changeTelHandler = (event) => {
    this.setState({ telszam: event.target.value });
  };
  changeBiroHandler = (event) => {
    this.setState({ biro: event.target.value });
    console.log(event.target.value);
  };
  changeEgyesuletHandler = (event) => {
    this.setState({ egyesuletId: event.target.value });
    console.log(event.target.value);
  };

  async getOptions() {
    let axiosConfig = {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        Authorization:
          "Bearer " + JSON.parse(localStorage.getItem("user")).access_token,
      },
    };
    const res = await axios.get(
      "http://localhost:8090/api/egyesulet",
      axiosConfig
    );
    const data = res.data;

    const options = data.map((response) => ({
      value: response.id,
      label: response.nev,
    }));
    this.setState({ selectOptions: options });
    console.log(options);
  }
  render() {
    if (!this.state.selectOptions.length) return null;

    const arbitru = [
      { value: "true", label: "Da" },
      { value: "false", label: "Nu" },
    ];

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
            <label> Adresa </label>
            <input
              placeholder="Adresa"
              name="adresa"
              className="form-control"
              value={this.state.cim}
              onChange={this.changeCimHandler}
            />
          </div>
          <div>
            <label> Nr tel </label>
            <input
              placeholder="Nr tel"
              name="telefon"
              className="form-control"
              value={this.state.telszam}
              onChange={this.changeTelHandler}
            />
          </div>
          <div>
            <label> Arbitru </label>
            <select
              placeholder={this.state.biro == 0 ? "nu" : "da"}
              onChange={this.changeBiroHandler}
            >
              {arbitru.map((option) => (
                <option value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label> Asociație </label>
            <select
              value={this.state.selectOptions.value}
              onChange={this.changeEgyesuletHandler}
            >
              {this.state.selectOptions.map((option) => (
                <option value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>
          <button className="btn btn-success" onClick={this.saveOrUpdateTulaj}>
            Salvare
          </button>
        </form>
      </div>
    );
  }
}

export default addTenyesztoComponent;