import React from "react";
import axios from "axios";

const TripForm = props => (
  <form id="trip-form">
    <label htmlFor="origin">From</label>
    <input
      id="origin"
      onChange={props.handleOriginChange}
      defaultValue="Current Location"
    />
    <br />
    <label htmlFor="destination">To</label>
    <input
      id="destination"
      onChange={props.handleDestinationChange}
      placeholder="ex: 115 westwood ave atlanta"
    />
    <br />

    <button id="go-button" onClick={props.calculateFare}>
      Calculate Fare
    </button>
  </form>
);

const DirectionMap = props => (
  <iframe id="map" title="googlemap" src={props.encodedAPI} allowFullScreen />
);

const LocationMap = props => (
  <iframe id="map" title="googlemap" src={props.encodedAPI} allowFullScreen />
);

class Home extends React.Component {
  state = {
    isLocMapReady: false,
    isDirMapReady: false,
    view: "location",
    currentPosition: {},
    locationAPI: "",
    directionAPI: "",
    origin: "",
    destination: "",
    distance: 0,
    duration: 0,
    fare: 0
  };

  getLocation = callback => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        //anynomouse callback function used, setstate to finish before running the callback function, which is encodeLocationAPI()
        this.setState({ currentPosition: position.coords }, () => {
          callback();
        });
      });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  };

  loadLocMap = () => {
    this.setState({ isLocMapReady: true });
  };

  loadDirMap = () => {
    this.setState({ view: "direction", isDirMapReady: true });
  };

  handleOriginChange = event => {
    event.preventDefault();
    this.setState({ origin: event.target.value });
  };

  handleDestinationChange = event => {
    event.preventDefault();
    this.setState({ destination: event.target.value });
  };

  encodeDirectionAPI = () => {
    let originString = "";

    if (this.state.origin.length === 0) {
      originString =
        this.state.currentPosition.latitude +
        "," +
        this.state.currentPosition.longitude;
    } else {
      originString = encodeURI(this.state.origin);
    }
    const encodedLink =
      "https://www.google.com/maps/embed/v1/directions?origin=" +
      originString +
      "&destination=" +
      encodeURI(this.state.destination) +
      "&key=AIzaSyCy6XI9k69VW_vNjJ-q7rpdgPiFjJH1zMA";
    this.setState({ directionAPI: encodedLink });
    this.loadDirMap();
  };

  encodeLocationAPI = () => {
    const encodedLink =
      "https://www.google.com/maps/embed/v1/place?q=" +
      this.state.currentPosition.latitude +
      "," +
      this.state.currentPosition.longitude +
      "&key=AIzaSyCy6XI9k69VW_vNjJ-q7rpdgPiFjJH1zMA";
    this.setState({ locationAPI: encodedLink });
    this.loadLocMap();
  };

  componentDidMount() {
    this.getLocation(() => {
      this.encodeLocationAPI();
    });
  }

  calculateFare = event => {
    event.preventDefault();
    this.encodeDirectionAPI();
  };

  render() {
    return (
      <div>
        <TripForm
          handleOriginChange={this.handleOriginChange}
          handleDestinationChange={this.handleDestinationChange}
          calculateFare={this.calculateFare}
        />
        <div id="mapArea">
          {this.state.view === "location" && this.state.isLocMapReady ? (
            <LocationMap encodedAPI={this.state.locationAPI} />
          ) : null}
          {this.state.view === "direction" && this.state.isDirMapReady ? (
            <DirectionMap encodedAPI={this.state.directionAPI} />
          ) : null}
        </div>
      </div>
    );
  }
}

export default Home;
