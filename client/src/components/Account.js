import React from "react";
import axios from "axios";

class Account extends React.Component {
  state = {
    isDataReady: false,
    uid: 0,
    pw: "",
    role: "",
    vehicleType: "",
    avatar: "",
    email: "",
    fullName: "",
    billing: {
      cardNumber: 0,
      expMonth: 0,
      expYear: 0,
      CVV: 0,
      nameOnCard: "",
      address: "",
      city: "",
      state: "",
      zip: 0
    },
    tripList: [],
    currentLoc: {
      latitude: 0,
      longitude: 0,
      streetAddress: ""
    }
  };

  getAccountInfo = () => {
    axios.post("/api/account", { uid: this.props.uid }).then(result => {
      const data = result.data;
      this.setState({
        uid: data.uid,
        pw: data.pw,
        role: data.role,
        vehicleType: data.vehicleType,
        avatar: data.avatar,
        email: data.email,
        fullName: data.fullName,
        billing: {
          cardNumber: data.billing.cardNumber,
          expMonth: data.billing.expMonth,
          expYear: data.billing.expYear,
          CVV: data.billing.CVV,
          nameOnCard: data.billing.nameOnCard,
          address: data.billing.address,
          city: data.billing.city,
          state: data.billing.state,
          zip: data.billing.zip
        },
        tripList: data.tripList,
        currentLoc: {
          latitude: data.currentLoc.latitude,
          longitude: data.currentLoc.longitude,
          streetAddress: data.currentLoc.streetAddress
        }
      });

      this.setState({ isDataReady: true });
    });
  };

  componentDidMount() {
    this.getAccountInfo();
    console.log(this.state.avatar);
  }

  submitAccount = event => {
    event.preventDefault();
    axios
      .post("/api/accountupdate", {
        uid: this.props.uid,
        pw: document.getElementById("pw").value,
        email: document.getElementById("email").value,
        fullName: document.getElementById("fullName").value,
        billing: {
          cardNumber: document.getElementById("cardNumber").value,
          expMonth: document.getElementById("expMonth").value,
          expYear: document.getElementById("expYear").value,
          CVV: document.getElementById("CVV").value,
          nameOnCard: document.getElementById("nameOnCard").value,
          address: document.getElementById("address").value,
          city: document.getElementById("city").value,
          state: document.getElementById("state").value,
          zip: document.getElementById("zip").value
        }
      })
      .then(result => alert("Changes saved successfully"));
  };

  render() {
    return (
      <div id="account-form">
        {this.state.isDataReady ? (
          <div>
            <form style={{ paddingBottom: "20px" }}>
              <h1>Account</h1>
              <br />
              {this.state.avatar === "" ? (
                <img
                  id="userAvatar"
                  alt="add-avatar"
                  src={require("../img/add-avatar.png")}
                />
              ) : (
                <img
                  id="userAvatar"
                  alt="user-avatar"
                  src={require("../img/man1.jpg")}
                />
              )}
              <br />
              <label htmlFor="fullName">Full Name</label>
              <input id="fullName" defaultValue={this.state.fullName} />
              <br />
              <label htmlFor="uid">Mobile phone #</label>
              <input
                id="uid"
                defaultValue={this.state.uid}
                disabled="disabled"
              />
              <br />
              <label htmlFor="pw">Password</label>
              <input id="pw" defaultValue={this.state.pw} type="password" />
              <br />
              <label htmlFor="email">Email</label>
              <input id="email" defaultValue={this.state.email} />
              <br />
              <br />
              <h1>Billing</h1>
              <br />
              <label htmlFor="cardNumber">Credit/Debit card number</label>
              <input
                id="cardNumber"
                type="password"
                defaultValue={this.state.billing.cardNumber}
              />
              <br />
              <label htmlFor="expMonth">Exp month</label>
              <input id="expMonth" defaultValue={this.state.billing.expMonth} />
              <br />
              <label htmlFor="expYear">Exp year</label>
              <input id="expYear" defaultValue={this.state.billing.expYear} />
              <br />
              <label htmlFor="CVV">CVV</label>
              <input
                id="CVV"
                type="password"
                defaultValue={this.state.billing.CVV}
              />
              <br />
              <br />
              <label htmlFor="nameOnCard">Name on card</label>
              <input
                id="nameOnCard"
                defaultValue={this.state.billing.nameOnCard}
              />
              <br />
              <label htmlFor="address">Address</label>
              <input id="address" defaultValue={this.state.billing.address} />
              <br />
              <label htmlFor="city">City</label>
              <input id="city" defaultValue={this.state.billing.city} />
              <br />
              <label htmlFor="state">State</label>
              <input id="state" defaultValue={this.state.billing.state} />
              <br />
              <label htmlFor="zip">Zip code</label>
              <input id="zip" defaultValue={this.state.billing.zip} />
              <br />
              <br />
              <button onClick={this.submitAccount}>Save</button>
            </form>
          </div>
        ) : null}
      </div>
    );
  }
}

export default Account;
