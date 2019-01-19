import React from "react";

const Account = props => (
  <div id="account-form">
    <form>
      <h1>Account</h1>
      <br />
      <label htmlFor="uid">Mobile phone #</label>
      <input id="uid" defaultValue="404123567" /><br />
      <label htmlFor="password">Password</label>
      <input id="Password" defaultValue="password" type="password" /><br />
      <label htmlFor="email">Email</label>
      <input id="email" defaultValue="tringuyen552911@gmail.com" /><br />
      <br />
      <button onClick={props.submitAccount}>Submit</button>
    </form>
    <br />
    <br />
    <h1>Billing</h1>
    <br />
    <label htmlFor="card-number">Credit/Debit card number</label>
    <input id="card-number" type="password" defaultValue="4400660910981412" /><br />
    <label htmlFor="exp-month">Exp month</label>
    <input id="exp-month" defaultValue="03" /><br />
    <label htmlFor="exp-year">Exp year</label>
    <input id="exp-year" defaultValue="22" /><br />
    <label htmlFor="cvv">CVV</label>
    <input id="cvv" defaultValue="078" /><br />
    <br />
    <label htmlFor="name">Name on card</label>
    <input id="name" defaultValue="James Smith" /><br />
    <label htmlFor="address">Address</label>
    <input id="address" defaultValue="1110 Garner Creek Dr SW" /><br />
    <label htmlFor="city">City</label>
    <input id="city" defaultValue="Lilburn" /><br />
    <label htmlFor="state">State</label>
    <input id="state" defaultValue="Georgia" /><br />
    <label htmlFor="zip">Zip code</label>
    <input id="zip" defaultValue="30047" /><br />
    <br />
    <button onClick={props.submitBilling}>Submit</button>
  </div>
);

export default Account;
