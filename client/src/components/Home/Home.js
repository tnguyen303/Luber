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
      autoComplete="off"
      list="destinations"
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

    <button id="calcBtn" onClick={props.calculateFare}>
      Calculate Fare
    </button>
    <button onClick={props.showFareList}>Change Car Type</button>
    <div />
  </form>
);

const FareList = props => (
  <div id="fareListModal" className="modal">
    <span onClick={props.hideFareList} className="close">
      &times;
    </span>
    <div id="fareList" className="modal-content">
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

const LocationMap = props => (
  <iframe id="map" title="googlemap" src={props.encodedAPI} />
);

class Home extends React.Component {
  state = {
    isLocMapReady: false,
    isDirMapReady: false,
    view: "location",
    currentPosition: {},
    locationAPI: "",
    directionAPI: "",
    destinationList: [
      "1900 Dekalb ave atlanta",
      "590 Collingwood dr",
      "tech square",
      "ATT building atlanta",
      "georgia state capitol"
    ],
    origin: "",
    destination: "",
    distance: 0,
    distanceStr: "",
    duration: 0,
    durationStr: "",
    selectedFare: 0,
    fareList: [],
    fareListDisplay: false
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
  };

  encodeLocationAPI = () => {
    const encodedLink =
      "https://www.google.com/maps/embed/v1/place?q=" +
      this.state.currentPosition.latitude +
      "," +
      this.state.currentPosition.longitude +
      "&key=AIzaSyCy6XI9k69VW_vNjJ-q7rpdgPiFjJH1zMA";
    this.setState({ locationAPI: encodedLink });
  };

  componentDidMount() {
    this.getLocation(() => {
      this.encodeLocationAPI();
      this.loadLocMap();
    });
  }

  calculateFare = event => {
    event.preventDefault();
    this.encodeDirectionAPI();
    this.loadDirMap();
    this.showFareList(event);
    this.getTripInfo();
  };

  //getting CORS error messages on heroku & localhost & laptop & desktop, Cross-Origin-Request error, probably due to unaccepted security certificate
  // getTripInfo = () => {
  //   let originString = "";

  //   if (this.state.origin.length === 0) {
  //     originString =
  //       this.state.currentPosition.latitude +
  //       "," +
  //       this.state.currentPosition.longitude;
  //   } else {
  //     originString = encodeURI(this.state.origin);
  //   }

  //   const encodedLink =
  //     "https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=" +
  //     originString +
  //     "&destinations=" +
  //     encodeURI(this.state.destination) +
  //     "&key=AIzaSyCy6XI9k69VW_vNjJ-q7rpdgPiFjJH1zMA";
  //   console.log("success");
  //   axios.get(encodedLink, { crossDomain: true }).then(results => {
  //     const distanceInMeters = results.data.rows[0].elements[0].distance.value;
  //     const durationInSec = results.data.rows[0].elements[1].duration.value;
  //     console.log(distanceInMeters, durationInSec);
  //     this.setState({ distance: distanceInMeters, duration: durationInSec });
  //   });
  // };

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

        const distanceInMiles = distanceInMeters * 0.0006213;
        const distanceStr = `${this.roundUp(distanceInMiles, 2)} mi`;

        axios.get(`/api/fare/${distanceInMiles}`).then(results => {
          this.setState({ fareList: results.data });
          console.log(results);
        });

        this.setState({
          distance: distanceInMiles,
          distanceStr: distanceStr,
          duration: durationInSec,
          durationStr: durationStr
        });
      });
  };

  roundUp = (num, precision) => {
    precision = Math.pow(10, precision);
    return Math.ceil(num * precision) / precision;
  };

  showFareList = (event) => {
    event.preventDefault();
    this.setState({ fareListDisplay: true });
  };

  hideFareList = () => {
    this.setState({ fareListDisplay: false });
  };

  handleFareClick = event => {
    this.setState({ selectedFare: parseFloat(event.target.value) });
    this.hideFareList();
  };

  render() {
    return (
      <div>
        {this.state.fareList.length > 0 && this.state.fareListDisplay ? (
          <FareList
            fareList={this.state.fareList}
            hideFareList={this.hideFareList}
            handleFareClick={this.handleFareClick}
          />
        ) : null}
        <TripForm
          handleOriginChange={this.handleOriginChange}
          handleDestinationChange={this.handleDestinationChange}
          calculateFare={this.calculateFare}
          showFareList={this.showFareList}
          destinationList={this.state.destinationList}
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
