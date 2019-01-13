import React, { Component } from "react";
import axios from "axios";
import logo from "./logo.svg";
import Account from "./components/Account";
import Header from "./components/Header";
import History from "./components/History";
import Home from "./components/Home";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import "./css/reset.css";
import "./css/styles.css";

class App extends Component {
  state = {
    uid: "",
    pw: "",
    view: "login"
  };

  changeUid = event => {
    this.setState({ uid: event.target.value });
  };

  changePw = event => {
    this.setState({ pw: event.target.value });
  };

  submitLogin = event => {
    event.preventDefault();
    axios
      .post("/api/login", { uid: this.state.uid, pw: this.state.pw })
      .then(result => {
        if (result.data.success) {
          this.setState({ view: "account" });
        } else {
          alert("mobile phone # or password is incorrect. Please try again");
        }
      })
      .catch(error => console.log(error));
  };

  viewHome = event => {
    event.preventDefault();
    this.setState({ view: "home" });
  };

  viewAccount = event => {
    event.preventDefault();
    this.setState({ view: "account" });
  };

  viewHistory = event => {
    event.preventDefault();
    this.setState({ view: "history" });
  };

  render() {
    return (
      <div className="App">
        <Header />
        {this.state.view === "login" ? (
          <Login
            changePw={this.changePw}
            changeUid={this.changeUid}
            submitLogin={this.submitLogin}
          />
        ) : null}
        {this.state.view === "home" ? <Home /> : null}
        {this.state.view === "account" ? <Account /> : null}
        {this.state.view === "history" ? <History /> : null}
        {this.state.view !== "login" ? (
          <Navbar
            viewHome={this.viewHome}
            viewAccount={this.viewAccount}
            viewHistory={this.viewHistory}
          />
        ) : null}
      </div>
    );
  }
}

export default App;
