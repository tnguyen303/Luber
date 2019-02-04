import React from "react";
import axios from "axios";
import moment from "moment";

class History extends React.Component {
  state = {
    tripList: []
  };

  getTripHistory = () => {
    axios
      .post("/api/triphistory", { uid: this.props.uid })
      .then(result => this.setState({ tripList: result.data }));
  };

  componentDidMount() {
    this.getTripHistory();
  }

  render() {
    return (
      <div id="rideHistory">
        <h1 style={{fontSize:"25px"}}>History</h1>
        <table>
          <tbody>
            <tr>
              <th>Date/Time</th>
              <th>From</th>
              <th>To</th>
              <th>Paid</th>
              <th>Service</th>
              <th>Driver</th>
            </tr>
            {this.state.tripList.map((e, i) => (
              <tr key={i}>
                <td>{moment(e.time).format('llll')}</td>
                <td>{e.from}</td>
                <td>{e.to}</td>
                <td>${e.fare}</td>
                <td>{e.vehicleType}</td>
                <td>{e.driverName}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default History;
