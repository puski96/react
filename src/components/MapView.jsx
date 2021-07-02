import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import React, { PureComponent } from "react";
import jel from "../img/map-marker-png-download.png";
import ReactMapGL, { Marker } from "react-map-gl";
import HelysegekService from "../service/HelysegekService";
import HirdetesService from "../service/HirdetesekService";

const Map = ReactMapboxGl({
  accessToken:
    "pk.eyJ1IjoicHVza2k5NiIsImEiOiJja25hOTJzeTAwenRjMnJ0YXQwMzRpNWV4In0.ElYpo9WdpgCbQsFCYrBsvg",
});
const response = null;
class MapView extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      viewport: {
        width: "100%",
        height: "100vh",
        latitude: 42.430472,
        longitude: -123.334102,
        zoom: 16,
      },
      userLocation: {},
      helysegek: [],
      reload: false,
    };
  }
  componentDidMount() {
    HirdetesService.getHirdetesek()
      .then((res) => {
        let setHelyseg = {
          lat: res.data.latitude,
          long: res.data.longitude,
        };
        this.setState({ helysegek: res.data });
      })
      .catch(function (ex) {
        console.log("Response parsing failed. Error: ", ex);
      });

    navigator.geolocation.getCurrentPosition((position) => {
      let setUserLocation = {
        lat: position.coords.latitude,
        long: position.coords.longitude,
      };
      let newViewport = {
        height: "100vh",
        width: "100vw",
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        zoom: 10,
      };
      this.setState({
        viewport: newViewport,
        userLocation: setUserLocation,
      });
    });
    // this.setState({ reload: true });
  }
  render() {
    // const valami = true;
    // this.setState({ reload: true });

    // if (this.state.helysegek.length != null) {
    // this.forceUpdate();
    return (
      <div>
        <ReactMapGL
          {...this.state.viewport}
          mapStyle="mapbox://styles/mapbox/outdoors-v11"
          onViewportChange={(viewport) => this.setState({ viewport })}
          mapboxApiAccessToken="pk.eyJ1IjoicHVza2k5NiIsImEiOiJja25hOTJzeTAwenRjMnJ0YXQwMzRpNWV4In0.ElYpo9WdpgCbQsFCYrBsvg"
        >
          {Object.keys(this.state.helysegek).length !== 0 ? (
            this.state.helysegek.map((helyseg) => (
              <Marker
                key={helyseg.id}
                anchor="bottom"
                latitude={Number(helyseg.longitude)}
                longitude={Number(helyseg.latitude)}
              >
                <img className="marker" />
              </Marker>
            ))
          ) : (
            <div>Empty</div>
          )}
          {Object.keys(this.state.userLocation).length !== 0 ? (
            <Marker
              latitude={this.state.userLocation.lat}
              longitude={this.state.userLocation.long}
            >
              <img className="marker1" />
            </Marker>
          ) : (
            <div>Empty</div>
          )}
        </ReactMapGL>
      </div>
    );
    // } else {
    //   return <div>Loading</div>;
    // }
  }
}

export default MapView;
