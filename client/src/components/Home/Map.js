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
  <GoogleMap defaultZoom={15} defaultCenter={props.currentPosition}>
    {props.isMarkerShown && (
      <div>
        <Marker position={props.currentPosition} />
        {props.driverLocList.map((e,i) => (
          <Marker
            // animation={this.props.google.maps.Animation.DROP}
            key={i}
            position={{ lat: e.lat, lng: e.lng }}
            icon={
              e.vehicleType === "std"
                ? stdCarIcon
                : e.vehicleType === "lux"
                ? luxCarIcon
                : e.vehicleType === "lg"
                ? lgCarIcon
                : null
            }
          />
        ))}
      </div>
    )}
  </GoogleMap>
));

export default Map;
