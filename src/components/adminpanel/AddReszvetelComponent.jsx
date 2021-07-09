import React, { Component } from "react";
import Select from "react-select";
import axios from "axios";
import AdminPanelService from "../../service/AdminPanelService";
import AllatokService from "../../service/AllatokService";
import ReszvetelService from "../../service/ReszvetelService";

class AddAllatComponent extends Component {
  constructor(props) {
    super(props);
    this.goBack = this.goBack.bind(this);

    this.state = {
      id: this.props.match.params.id,
      pontszam: "",
      kisallatId: "",
      kiallitasId: "",
      selectOptions: [],
      selectKiallitas: [],
    };
  }
  goBack() {
    this.props.history.goBack();
  }
  componentDidMount() {
    console.log(this.state.id);
    if (this.state.id === "_add") {
      this.getOptions();
      this.getKiallitasok();

      return;
    } else {
      ReszvetelService.getResztvetelById(this.state.id).then((res) => {
        let reszvetel = res.data;
        console.log(res.data);
        this.setState({
          id: res.data.id,
          pontszam: res.data.pontszam,
          kisallatId: res.data.kisallatId,
          kiallitasId: res.data.kiallitasId,
        });
        console.log(reszvetel);
        console.log(this.state.kisallatId);
      });
      this.getOptions();
      this.getKiallitasok();
    }
  }

  saveOrUpdateReszvetel = (e) => {
    e.preventDefault();
    let reszvetelUpdate = {
      id: this.state.id,
      pontszam: this.state.pontszam,
      kisallatId: this.state.kisallatId,
      kiallitasId: this.state.kiallitasId,
    };
    console.log(this.state.kisallatId);
    let reszvetelAdd = {
      pontszam: this.state.pontszam,
      kisallatId: this.state.kisallatId,
      kiallitasId: this.state.kiallitasId,
    };
    console.log("tulaj => " + JSON.stringify(reszvetelAdd));
    console.log("tulaj => " + JSON.stringify(reszvetelUpdate));

    if (this.state.id === "_add") {
      ReszvetelService.addResztvetel(reszvetelAdd).then((res) => {});
      this.goBack();
    } else {
      ReszvetelService.updateResztvetel(reszvetelUpdate, this.state.id).then(
        (res) => {}
      );
      this.goBack();
    }
  };
  changePontszamHandler = (event) => {
    this.setState({ pontszam: event.target.value });
  };
  changeKisallatIdHandler = (event) => {
    this.setState({ kisallatId: event.target.value });
    console.log(event.target.value);
  };
  changeKiallitasIdHandler = (event) => {
    this.setState({ kiallitasId: event.target.value });
    console.log(event.target.value);
  };

  async getOptions() {
    let axiosConfig = {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        Authorization: localStorage.getItem("user")
          ? "Bearer " + JSON.parse(localStorage.getItem("user")).access_token
          : "",
      },
    };
    const res = await axios.get(
      "https://tenyeszto.herokuapp.com/api/kisallat",
      axiosConfig
    );
    const data = res.data;

    const options = data.map((response) => ({
      value: response.id,
      label:
        response.fajta.fajta + " " + response.jobbful + " " + response.balful,
    }));
    this.setState({ selectOptions: options });
    console.log(options);
  }
  async getKiallitasok() {
    const res = await axios.get(
      "https://tenyeszto.herokuapp.com/api/kiallitas"
    );
    const data = res.data;

    const options = data.map((response) => ({
      value: response.id,
      label: response.helyseg,
    }));
    this.setState({ selectKiallitas: options });
    console.log(options);
  }
  render() {
    if (!this.state.selectOptions.length) return null;

    return (
      <div>
        <form class="addForm">
          <div>
            <label> Punctaj </label>
            <input
              placeholder="Punctaj"
              name="Punctaj"
              className="form-control"
              value={this.state.pontszam}
              onChange={this.changePontszamHandler}
            />
          </div>

          <div>
            <label> Animal </label>
            <select
              value={this.state.selectOptions.value}
              onChange={this.changeKisallatIdHandler}
            >
              {this.state.selectOptions.map((option) => (
                <option value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label> Expoziție </label>
            <select
              value={this.state.selectKiallitas.value}
              onChange={this.changeKiallitasIdHandler}
            >
              {this.state.selectKiallitas.map((option) => (
                <option value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>
          <button
            className="btn btn-success"
            onClick={this.saveOrUpdateReszvetel}
          >
            Salvare
          </button>
        </form>
      </div>
    );
  }
}

export default AddAllatComponent;
