import React from "react";
import axios from "axios";

// const Account = props => (
//   <div id="account-form">
//     <form>
//       <h1>Account</h1>
//       <br />
//       <label htmlFor="uid">Mobile phone #</label>
//       <input id="uid" defaultValue="404123567" /><br />
//       <label htmlFor="password">Password</label>
//       <input id="Password" defaultValue="password" type="password" /><br />
//       <label htmlFor="email">Email</label>
//       <input id="email" defaultValue="tringuyen552911@gmail.com" /><br />
//       <br />
//       <button onClick={props.submitAccount}>Submit</button>
//     </form>
//     <br />
//     <br />
//     <h1>Billing</h1>
//     <br />
//     <label htmlFor="card-number">Credit/Debit card number</label>
//     <input id="card-number" type="password" defaultValue="4400660910981412" /><br />
//     <label htmlFor="exp-month">Exp month</label>
//     <input id="exp-month" defaultValue="03" /><br />
//     <label htmlFor="exp-year">Exp year</label>
//     <input id="exp-year" defaultValue="22" /><br />
//     <label htmlFor="cvv">CVV</label>
//     <input id="cvv" defaultValue="078" /><br />
//     <br />
//     <label htmlFor="name">Name on card</label>
//     <input id="name" defaultValue="James Smith" /><br />
//     <label htmlFor="address">Address</label>
//     <input id="address" defaultValue="1110 Garner Creek Dr SW" /><br />
//     <label htmlFor="city">City</label>
//     <input id="city" defaultValue="Lilburn" /><br />
//     <label htmlFor="state">State</label>
//     <input id="state" defaultValue="Georgia" /><br />
//     <label htmlFor="zip">Zip code</label>
//     <input id="zip" defaultValue="30047" /><br />
//     <br />
//     <button onClick={props.submitBilling}>Submit</button>
//   </div>
// );

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
      console.log(result.data);
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
  }

  submitAccount = () => {
    console.log("hi");
  };

  submitBilling = () => {
    console.log("hi");
  };

  render() {
    return (
      <div id="account-form">
        {this.state.isDataReady ? (
          <div>
            <form>
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
                  src={require("../img/lady1.jpg")}
                />
              )}
              <br />
              <label htmlFor="uid">Mobile phone #</label>
              <input id="uid" defaultValue={this.state.uid} />
              <br />
              <label htmlFor="password">Password</label>
              <input
                id="password"
                defaultValue={this.state.pw}
                type="password"
              />
              <br />
              <label htmlFor="email">Email</label>
              <input id="email" defaultValue={this.state.email} />
              <br />
              <br />
              <button onClick={this.submitAccount}>Save</button>
            </form>
            <br />
            <br />
            <h1>Billing</h1>
            <br />
            <label htmlFor="card-number">Credit/Debit card number</label>
            <input
              id="card-number"
              type="password"
              defaultValue={this.state.billing.cardNumber}
            />
            <br />
            <label htmlFor="exp-month">Exp month</label>
            <input id="exp-month" defaultValue={this.state.billing.expMonth} />
            <br />
            <label htmlFor="exp-year">Exp year</label>
            <input id="exp-year" defaultValue={this.state.billing.expYear} />
            <br />
            <label htmlFor="cvv">CVV</label>
            <input
              id="cvv"
              type="password"
              defaultValue={this.state.billing.CVV}
            />
            <br />
            <br />
            <label htmlFor="name">Name on card</label>
            <input id="name" defaultValue={this.state.billing.nameOnCard} />
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
            <button onClick={this.submitBilling}>Save</button>
          </div>
        ) : null}
      </div>
    );
  }
}

export default Account;
