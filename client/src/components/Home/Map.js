import React from "react";
import ReactDOM from "react-dom";
import { compose, withProps } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";

const Map = compose(
  withProps({
    googleMapURL:
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyCy6XI9k69VW_vNjJ-q7rpdgPiFjJH1zMA&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />
  }),
  withScriptjs,
  withGoogleMap
)(props => (
  <GoogleMap defaultZoom={8} defaultCenter={{ lat: -34.397, lng: 150.644 }}>
    {props.isMarkerShown && (
      <div>
        <Marker
          position={{ lat: -34.397, lng: 150.644 }}
          icon= {"../../img/std-car-side-view.png"}
        />
        <Marker position={{ lat: -34.57, lng: 150.644 }} />
        <Marker position={{ lat: -34.677, lng: 150.644 }} />
        <Marker position={{ lat: -34.967, lng: 150.644 }} />
      </div>
    )}
  </GoogleMap>
));

// ReactDOM.render(
//   <Map isMarkerShown />,
//   document.getElementById("root")
// );

export default Map;
