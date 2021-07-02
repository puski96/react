
import React, { PureComponent } from "react";
import ReactMapGL, { Marker } from "react-map-gl";
import jel from "../img/images.png";

const mapStyle = {
  width: "100%",
  height: 500,
};

const mapboxApiKey =
  "pk.eyJ1IjoicHVza2k5NiIsImEiOiJja25hOTJzeTAwenRjMnJ0YXQwMzRpNWV4In0.ElYpo9WdpgCbQsFCYrBsvg";

class MapComponent extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      viewport: {
        latitude: 45.50884,
        longitude: -73.58781,
        zoom: 15,
      },
    };
  }
  componentDidMount() {
    navigator.geolocation.getCurrentPosition((position) => {
      let newViewport = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        zoom: 12,
      };
      this.setState({
        viewport: newViewport,
      });
    });
  }

  render() {
   
    return (
      <div>
        <ReactMapGL
          mapboxApiAccessToken={
            "pk.eyJ1IjoicHVza2k5NiIsImEiOiJja25hOTJzeTAwenRjMnJ0YXQwMzRpNWV4In0.ElYpo9WdpgCbQsFCYrBsvg"
          }
          mapStyle="mapbox://styles/mapbox/streets-v11"
          {...this.state.viewport}
          {...mapStyle}
          onViewportChange={(viewport) => this.setState({ viewport })}
        >
          <Marker
            pitchAlignment="map"
            latitude={this.state.viewport.latitude}
            longitude={this.state.viewport.longitude}
          >
            <img className="marker" />
          </Marker>
        </ReactMapGL>
      </div>
    );
  }
}

export default MapComponent;