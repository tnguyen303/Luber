import React from "react";
import { compose, withProps } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";

const stdCarIcon = {
  url: require("../../img/std-car-side-view.png"),
  scaledSize: { width: 50, height: 50 }
};
const luxCarIcon = {
  url: require("../../img/lambo-side-view.png"),
  scaledSize: { width: 50, height: 50 }
};
const lgCarIcon = {
  url: require("../../img/minivan-side-view.png"),
  scaledSize: { width: 50, height: 30 }
};

const Map = compose(
  withProps({
    googleMapURL:
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyCy6XI9k69VW_vNjJ-q7rpdgPiFjJH1zMA&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `100%` }} />,
    mapElement: <div style={{ height: `100%` }} />
  }),
  withScriptjs,
  withGoogleMap
)(props => (
  <GoogleMap defaultZoom={13.5} defaultCenter={{ lat: -34.100, lng: 150.644 }}>
    {props.isMarkerShown && (
      <div>
        <Marker position={{ lat: -34.100, lng: 150.644 }} />
        <Marker position={{ lat: -34.110, lng: 150.644 }} icon={stdCarIcon} />
        <Marker position={{ lat: -34.120, lng: 150.644 }} icon={stdCarIcon} />
        <Marker position={{ lat: -34.090, lng: 150.644 }} icon={luxCarIcon} />
        <Marker position={{ lat: -34.080, lng: 150.644 }} icon={lgCarIcon} />
      </div>
    )}
  </GoogleMap>
));

export default Map;
