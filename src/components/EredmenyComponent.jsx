import React, { Component } from "react";
import ReszvetelService from "../service/ReszvetelService";
import SearchResults from "react-filter-search";

class EredmenyComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id,
      reszvetelek: [],
      search: "",
    };
  }
  componentDidMount() {
    console.log(this.state.id);
    ReszvetelService.getResztvetel(this.state.id).then((res) => {
      this.setState({
        reszvetelek: res.data,
      });
      console.log(this.state.reszvetelek);
    });
  }
  handleSearch = (event) => {
    this.setState({ search: event.target.value });
    console.log(this.state.search);
  };
  render() {
    if (this.state.reszvetelek != null)
      return (
        <div>
          <input
            style={{ display: "block", margin: "0 auto", marginTop: "40px" }}
            placeholder="Introduci rasa"
            type="text"
            onChange={(e) => this.handleSearch(e)}
          />
          <SearchResults
            value={this.state.search}
            data={this.state.reszvetelek}
            renderResults={(results) => (
              <table className="tagokTable">
                <thead>
                  <tr>
                    <th>Rasa</th>
                    <th>Urechea dreaptă</th>
                    <th>Urechea stânga</th>
                    <th>Crescător</th>
                    <th>Punctaj</th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((kiallitas) => (
                    <tr key={kiallitas.id}>
                      <td>{kiallitas.kisallat.fajta.fajta}</td>
                      <td>{kiallitas.kisallat.jobbful}</td>
                      <td>{kiallitas.kisallat.balful}</td>
                      <td>{kiallitas.kisallat.tulaj.nev}</td>
                      <td>{kiallitas.pontszam}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          />
        </div>
      );
  }
}

export default EredmenyComponent;
