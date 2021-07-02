import React, { Component } from "react";
import { Carousel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import FajtaService from "../service/FajtaService.js";
import { Link } from "react-router-dom";
import SearchResults from "react-filter-search";
import Pagination from "react-js-pagination";

class FajtaleirasokComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fajtak: [],
      filteredData: [],
      search: "",
      activePage: 0,
    };
  }
  state = { osszes: false, tyukok: false, nyulak: false };
  osszes = () => {
    this.setState({
      osszes: true,
      tyukok: false,
      nyulak: false,
    });
    FajtaService.getFajtak()
      .then((res) => {
        this.setState({ fajtak: res.data });
        console.log(this.state.data);
      })
      .catch(function (ex) {
        console.log("Response parsing failed. Error: ", ex);
      });
  };
  nyulak = () => {
    this.setState({
      nyulak: true,
      osszes: false,
      tyukok: false,
    });
    FajtaService.getNyulak()
      .then((res) => {
        this.setState({ fajtak: res.data });
        console.log(this.state.data);
      })
      .catch(function (ex) {
        console.log("Response parsing failed. Error: ", ex);
      });
  };
  tyukok = () => {
    this.setState({
      tyukok: true,
      nyulak: false,
      osszes: false,
    });
    FajtaService.getTyukok()
      .then((res) => {
        this.setState({ fajtak: res.data });
        console.log(this.state.data);
      })
      .catch(function (ex) {
        console.log("Response parsing failed. Error: ", ex);
      });
  };
  componentDidMount() {
    this.osszes();
  }

  handleSearch = (event) => {
    this.setState({ search: event.target.value });
    console.log(this.state.search);
  };
  handlePageChange(pageNumber) {
    console.log(`active page is ${pageNumber}`);
    this.setState({ activePage: pageNumber });
  }
  render() {
    const osszes = this.state.osszes ? "show" : "hide";
    const nyulak = this.state.nyulak ? "show" : "hide";
    const tyukok = this.state.tyukok ? "show" : "hide";
    function importAll(r) {
      return r.keys().map(r);
    }

    const images = importAll(require.context("./", false, /\.(png|jpeg|svg)$/));
    return (
      <div>
        <hr />
        <Carousel interval={2000}>
          <Carousel.Item>
            <img
              src="./img/kepek/20210521_203142.jpg"
              height="600px"
              width="100%"
              alt="img1"
            />
            <div className="in-left">
              <h1>Udvozollek a fajtaleirasoknal</h1>
              <div>
                ide is fog jonni szoveg csak meg nem tudom hogy mit tegyek be,
                valamit ami fontos lehet
              </div>
            </div>
          </Carousel.Item>
          <Carousel.Item>
            <img
              src="./img/kepek/20210523_153223.jpg"
              height="600px"
              width="100%"
              alt="img1"
            />
          </Carousel.Item>
        </Carousel>
        <div className="filter">
          <div
            className="filterBar"
            style={{ display: "block", margin: "0 auto" }}
          >
            <div
              className="navbarFilter"
              style={{ justifyContent: "space-evenly" }}
            >
              <ul>
                <li className={`selected${osszes}`}>
                  <a onClick={this.osszes}>Toate</a>
                </li>
                <li className={`selected${nyulak}`}>
                  <a onClick={this.nyulak}>Iepuri</a>
                </li>
                <li className={`selected${tyukok}`}>
                  <a onClick={this.tyukok}>Găini</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div>
          <input
            style={{ display: "block", margin: "0 auto", marginTop: "30px" }}
            placeholder="Introduci rasa"
            type="text"
            onChange={(e) => this.handleSearch(e)}
          />
          <SearchResults
            value={this.state.search}
            data={this.state.fajtak}
            renderResults={(results) => (
              <div className="fajtaContainer">
                {results.map((fajta) => (
                  <article className="initialBox" key={fajta.id}>
                    <div>
                      <img
                        className="fajtaImg"
                        src={"../img/fajtak/" + fajta.kep}
                        alt=""
                      />
                    </div>
                    <div className="leiras">
                      <div>
                        <h2>{fajta.fajta}</h2>
                        <div className="szoveg">{fajta.bemutatkozo}</div>
                      </div>
                      <button id={fajta.rovidites} className="button">
                        <Link to={`/descrieri-de-rasa/${fajta.rovidites}`}>
                          Citește mai mult
                        </Link>
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            )}
          />
          <Pagination
            activePage={this.state.activePage}
            itemsCountPerPage={10}
            totalItemsCount={this.state.fajtak.length}
            pageRangeDisplayed={5}
            onChange={this.handlePageChange.bind(this)}
          />
        </div>
      </div>
    );
  }
}

export default FajtaleirasokComponent;
