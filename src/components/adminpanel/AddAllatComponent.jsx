import React, { Component } from "react";
import Select from "react-select";
import axios from "axios";
import AdminPanelService from "../../service/AdminPanelService";
import AllatokService from "../../service/AllatokService";

class AddAllatComponent extends Component {
  constructor(props) {
    super(props);
    this.goBack = this.goBack.bind(this);

    this.state = {
      id: this.props.match.params.id,
      balful: "",
      jobbful: "",
      nem: "",
      fajtaId: "",
      tulajId: "",
      selectOptions: [],
      selectTulaj: [],
    };
  }
  goBack() {
    this.props.history.goBack();
  }
  componentDidMount() {
    console.log(this.state.id);
    if (this.state.id === "_add") {
      this.getOptions();
      this.getTulajok();

      return;
    } else {
      AllatokService.getKisallatById(this.state.id).then((res) => {
        let kisallat = res.data;
        console.log(res.data);
        this.setState({
          id: res.data.id,
          balful: res.data.balful,
          jobbful: res.data.jobbful,
          nem: res.data.nem,
          fajtaId: res.data.fajtaId,
          tulajId: res.data.tulajId,
        });
        console.log(kisallat);
        console.log(this.state.fajtaId);
      });
      this.getOptions();
      this.getTulajok();
    }
  }

  saveOrUpdateAllat = (e) => {
    e.preventDefault();
    let kisallatUpdate = {
      id: this.state.id,
      balful: this.state.balful,
      jobbful: this.state.jobbful,
      nem: this.state.nem,
      fajtaId: this.state.fajtaId,
      tulajId: this.state.tulajId,
    };
    console.log(this.state.fajtaId);
    let kisallatAdd = {
      balful: this.state.balful,
      jobbful: this.state.jobbful,
      nem: this.state.nem,
      fajtaId: this.state.fajtaId,
      tulajId: this.state.tulajId,
    };
    console.log("tulaj => " + JSON.stringify(kisallatAdd));
    console.log("tulaj => " + JSON.stringify(kisallatUpdate));

    if (this.state.id === "_add") {
      AllatokService.addKisallat(kisallatAdd).then((res) => {});
      this.goBack();
    } else {
      AllatokService.updateKisallat(
        kisallatUpdate,
        this.state.id
      ).then((res) => {});
      this.goBack();
    }
  };

  changeBalfulHandler = (event) => {
    this.setState({ balful: event.target.value });
  };

  changeJobbfulHandler = (event) => {
    this.setState({ jobbful: event.target.value });
  };
  changeNemHandler = (event) => {
    this.setState({ nem: event.target.value });
  };
  changeFajtaIdHandler = (event) => {
    this.setState({ fajtaId: event.target.value });
    console.log(event.target.value);
  };
  changeTulajIdHandler = (event) => {
    this.setState({ tulajId: event.target.value });
    console.log(event.target.value);
  };

  async getOptions() {
    const res = await axios.get("http://localhost:8090/api/fajta");
    const data = res.data;

    const options = data.map((response) => ({
      value: response.id,
      label: response.fajta,
    }));
    this.setState({ selectOptions: options });
    console.log(options);
  }
  async getTulajok() {
    const res = await axios.get("http://localhost:8090/api/tulaj");
    const data = res.data;

    const options = data.map((response) => ({
      value: response.id,
      label: response.nev,
    }));
    this.setState({ selectTulaj: options });
    console.log(options);
  }
  render() {
    if (!this.state.selectOptions.length) return null;

    const nem = [
      { value: "true", label: "Mascul" },
      { value: "false", label: "Femela" },
    ];

    return (
      <div>
        <form class="addForm">
          <div>
            <label> Urechea dreapta: </label>
            <input
              placeholder="Urechea dreapta"
              name="Urechea dreapta"
              className="form-control"
              value={this.state.balful}
              onChange={this.changeBalfulHandler}
            />
          </div>
          <div>
            <label> Urechea stânga: </label>
            <input
              placeholder="Urechea stanga"
              name="Urechea stanga"
              className="form-control"
              value={this.state.jobbful}
              onChange={this.changeJobbfulHandler}
            />
          </div>

          <div>
            <label> Sex: </label>
            <select
              placeholder={this.state.fajtaId == 0 ? "femela" : "mascul"}
              onChange={this.changeNemHandler}
            >
              {nem.map((option) => (
                <option value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label> Rasa: </label>
            <select
              value={this.state.selectOptions.value}
              onChange={this.changeFajtaIdHandler}
            >
              {this.state.selectOptions.map((option) => (
                <option value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label> Crescător: </label>
            <select
              value={this.state.selectTulaj.value}
              onChange={this.changeTulajIdHandler}
            >
              {this.state.selectTulaj.map((option) => (
                <option value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>
          <button className="btn btn-success" onClick={this.saveOrUpdateAllat}>
            Salvare
          </button>
        </form>
      </div>
    );
  }
}

export default AddAllatComponent;