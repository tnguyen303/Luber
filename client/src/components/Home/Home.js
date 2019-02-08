import React from "react";
import axios from "axios";
import Map from "./Map";

// import images from "../../img";

//Import React Script Library to load Google object
import Script from "react-load-script";

const APIkey = "AIzaSyCy6XI9k69VW_vNjJ-q7rpdgPiFjJH1zMA";

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
      // autoComplete="off" enable to switch to ride history display
      // list="destinations" enable to switch to ride history display
      id="destination"
      onChange={props.handleDestinationChange}
      placeholder="ex: 115 westwood ave atlanta"
    />
    <datalist id="destinations">
      {props.destinationList.map((e, i) => (
        <option value={e} key={i} />
      ))}
    </datalist>
    <br />
    {props.isLocReady && props.fareList.length === 0 ? (
      <button id="calcBtn" onClick={props.calculateFare}>
        Calculate Fare
      </button>
    ) : !props.isLocReady? (
      <div>
        <p style={{textAlign: "center"}}>
          Waiting for current location. Make sure you have location services
          turned ON!
        </p>
        <img
          id="waiting-for-location"
          src={require("../../img/waiting-for-location.gif")}
          alt="waiting-for-location"
        />
      </div>
    ) : null}

    {props.fareList.length > 0 ? (
      <button id="changeFareBtn" onClick={props.showFareList}>
        {props.selectedCarDesc}
        <br />
        <span>Change Car Type</span>
      </button>
    ) : null}
    {props.selectedFare !== 0 ? (
      <button id="orderRideBtn" onClick={props.orderRide}>
        GO
      </button>
    ) : null}
    <div />
  </form>
);

const FareList = props => (
  <div id="fareListModal" className="modal">
    <span onClick={props.hideFareList} className="close">
      &times;
    </span>
    <div id="fareList" className="modal-content">
      <p style={{ textAlign: "center", fontWeight: "bold", color: "green" }}>
        {props.duration}
      </p>
      <p style={{ textAlign: "center", fontWeight: "bold" }}>
        {props.distance}
      </p>
      {props.fareList.map((e, i) => (
        <button
          className="fareBtn"
          onClick={props.handleFareClick}
          id={e.type}
          key={i}
          value={e.price}
        >
          {e.description}
          <span> ${e.price}</span>
        </button>
      ))}
    </div>
  </div>
);

const DirectionMap = props => (
  <iframe id="map" title="googlemap" src={props.encodedAPI} />
);
//"../../img/lady3.jpg"
const DriverEnrouteScreen = props => (
  <div id="DriverEnrouteScreen">
    <img
      id="userAvatar"
      alt="driver-avatar"
      src={require("../../img/lady3.jpg")}
    />
    <p style={{ fontWeight: "bold" }}>{props.driverName}</p>
    <p>is on the way!</p>
    <p style={{ color: "#42f4a7", fontWeight: "bold" }}>
      ETA {props.driverEta} min
    </p>
    <button id="calcBtn" onClick={props.messageDriver}>
      Add Pickup Note
    </button>
    <button id="cancelRideBtn" onClick={props.cancelRide}>
      Cancel Ride
    </button>
  </div>
);

class Home extends React.Component {
  state = {
    isLocReady: false,
    isDirMapReady: false,
    view: "location",
    currentPosition: {},
    directionAPI: "",
    destinationList: [],
    origin: "",
    destination: "",
    distance: 0,
    distanceStr: "",
    duration: 0,
    durationStr: "",
    selectedFare: 0,
    selectedCar: "",
    selectedCarDesc: "",
    fareList: [],
    fareListDisplay: false,
    driverLocList: [],
    matchingDriver: {},
    driverEta: "",
    tripId: "",
    driverAvatar: "../../img/lady3.jpg"
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

  getDriverLocList = () => {
    axios
      .post("/api/drivers", {
        locationStr: "",
        destinationStr: encodeURI(
          `${this.state.currentPosition.latitude},${
            this.state.currentPosition.longitude
          }`
        )
      })
      .then(result => {
        this.setState({ driverLocList: result.data });
      });
  };

  getTripHistory = () => {
    axios.post("/api/triphistory", { uid: this.props.uid }).then(result => {
      this.setState({
        destinationList: result.data
          .map(e => e.to)
          .filter((v, i, a) => a.indexOf(v) === i)
      });
    });
  };

  componentDidMount() {
    this.getTripHistory();
    this.getLocation(() => {
      this.setState({ isLocReady: true });
      this.getDriverLocList();
    });
  }

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
    this.clearTrip();
  };

  clearTrip = () => {
    this.setState({
      view: "location",
      directionAPI: "",
      distance: 0,
      distanceStr: "",
      duration: 0,
      durationStr: "",
      selectedFare: 0,
      selectedCar: "",
      selectedCarDesc: "",
      fareList: [],
      matchingDriver: {},
      driverEta: "",
      tripId: ""
    });
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
      "&key=" +
      APIkey;
    this.setState({ directionAPI: encodedLink });
  };

  calculateFare = event => {
    event.preventDefault();
    if (document.getElementById("destination").value.trim().length < 5) {
      alert("Please input a valid destination, ex: 1 Amphitheater Way Atlanta");
    } else {
      this.encodeDirectionAPI();
      this.loadDirMap();
      this.showFareList(event);
      this.getTripInfo();
    }
  };

  fillDestinationField = input => {
    document.getElementById("destination").value = input;
  };

  getTripInfo = () => {
    let originString = "";

    if (this.state.origin.length === 0) {
      originString =
        this.state.currentPosition.latitude +
        "," +
        this.state.currentPosition.longitude;
    } else {
      originString = encodeURI(this.state.origin);
    }

    const destinationString = encodeURI(this.state.destination);

    axios
      .get(`/api/trip/${originString}/${destinationString}`)
      .then(results => {
        const distanceInMeters =
          results.data.rows[0].elements[0].distance.value;
        const durationInSec = results.data.rows[0].elements[0].duration.value;
        const durationStr = results.data.rows[0].elements[0].duration.text;
        const origin = results.data.origin_addresses[0];
        const destination = results.data.destination_addresses[0];

        const distanceInMiles = distanceInMeters * 0.0006213;
        const distanceStr = `${this.roundUp(distanceInMiles, 2)} mi`;

        axios.get(`/api/fare/${distanceInMiles}`).then(results => {
          this.setState({ fareList: results.data });
        });

        this.setState({
          origin: origin,
          destination: destination,
          distance: distanceInMiles,
          distanceStr: distanceStr,
          duration: durationInSec,
          durationStr: durationStr
        });

        this.fillDestinationField(destination);
      });
  };

  roundUp = (num, precision) => {
    precision = Math.pow(10, precision);
    return Math.ceil(num * precision) / precision;
  };

  showFareList = event => {
    event.preventDefault();
    this.setState({ fareListDisplay: true });
  };

  hideFareList = () => {
    this.setState({ fareListDisplay: false });
  };

  handleFareClick = event => {
    this.setState({
      selectedFare: parseFloat(event.target.value),
      selectedCar: event.target.id,
      selectedCarDesc: event.target.textContent
    });
    this.hideFareList();
  };

  orderRide = event => {
    event.preventDefault();
    const matchingVehicleTypeList = this.state.driverLocList.filter(
      e => e.vehicleType === this.state.selectedCar
    );
    const matchingDriver = matchingVehicleTypeList[0];
    this.setState(
      {
        matchingDriver: matchingDriver,
        driverEta: this.roundUp(matchingDriver.duration / 60, 0)
      },
      () => this.setState({ view: "driverEnroute" })
    );
    axios
      .post("/api/trip", {
        time: Date.now(),
        from: this.state.origin,
        to: this.state.destination,
        fare: this.state.selectedFare,
        vehicleType: this.state.selectedCar,
        driverUid: matchingDriver.uid,
        driverName: matchingDriver.fullName,
        riderUid: this.props.uid
      })
      .then(result => this.setState({ tripId: result.data._id }));
  };

  cancelRide = event => {
    event.preventDefault();
    axios
      .post("/api/canceltrip", { wasCancelled: true, _id: this.state.tripId })
      .then(result => alert("Trip cancelled successfully"));
    this.setState({ destination: "" });
    this.clearTrip();
  };

  handleScriptLoad = () => {
    // Declare Options For Autocomplete
    var options = { types: ["address"] };
    // Initialize Google Autocomplete
    /*global google*/
    this.autocomplete = new google.maps.places.Autocomplete(
      document.getElementById("destination"),
      options
    );
    // Fire Event when a suggested name is selected
    this.autocomplete.addListener("place_changed", this.handlePlaceSelect);
  };

  handlePlaceSelect = () => {
    let addressObject = this.autocomplete.getPlace();
    let address = addressObject.address_components;

    if (address) {
      this.setState({
        destination: addressObject.formatted_address
      });
    }
  };

  render() {
    return (
      <div id="home">
        <Script
          url={`https://maps.googleapis.com/maps/api/js?key=${APIkey}&libraries=places`}
          onLoad={this.handleScriptLoad}
        />
        {this.state.fareList.length > 0 && this.state.fareListDisplay ? (
          <FareList
            fareList={this.state.fareList}
            hideFareList={this.hideFareList}
            handleFareClick={this.handleFareClick}
            duration={this.state.durationStr}
            distance={this.state.distanceStr}
          />
        ) : null}
        <div>
          {this.state.view === "location" || this.state.view === "direction" ? (
            <TripForm
              handleOriginChange={this.handleOriginChange}
              handleDestinationChange={this.handleDestinationChange}
              calculateFare={this.calculateFare}
              showFareList={this.showFareList}
              destinationList={this.state.destinationList}
              selectedFare={this.state.selectedFare}
              selectedCarDesc={this.state.selectedCarDesc}
              fareList={this.state.fareList}
              orderRide={this.orderRide}
              isLocReady={this.state.isLocReady}
            />
          ) : this.state.view === "driverEnroute" ? (
            <DriverEnrouteScreen
              driverName={this.state.matchingDriver.fullName}
              driverEta={this.state.driverEta}
              cancelRide={this.cancelRide}
              driverAvatar={this.state.driverAvatar}
            />
          ) : null}
        </div>
        <div id="mapArea">
          {this.state.view === "location" && this.state.isLocReady ? (
            <Map
              currentPosition={{
                lat: this.state.currentPosition.latitude,
                lng: this.state.currentPosition.longitude
              }}
              driverLocList={this.state.driverLocList}
              isMarkerShown
            />
          ) : this.state.view === "direction" && this.state.isDirMapReady ? (
            <DirectionMap encodedAPI={this.state.directionAPI} />
          ) : this.state.view === "driverEnroute" ? (
            <Map
              currentPosition={{
                lat: this.state.currentPosition.latitude,
                lng: this.state.currentPosition.longitude
              }}
              driverLocList={[this.state.matchingDriver]}
              isMarkerShown
            />
          ) : null}
        </div>
      </div>
    );
  }
}

export default Home;
