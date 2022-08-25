import "./css/app.css";
import Menu from "./components/Menu";
import Orders from "./components/Orders";
import History from "./components/History";
import { useState } from "react";

function App() {
  const [showMode, setShowMode] = useState(<Menu />);
  const [showHighlight, setShowHighlight] = useState("Menu");
  console.log(showHighlight);
  function provideHighlight(mode) {
    if (mode === showHighlight) return "red";
    else return "black";
  }
  return (
    <div className="container-fluid p-0">
      <div className="tabs_container">{showMode}</div>

      <div className="items_container">
        <div className="mode_container">
          <button
            className="mode_btn"
            style={{ color: provideHighlight("Menu") }}
            onClick={() => {
              setShowHighlight("Menu");
              setShowMode(<Menu />);
            }}
          >
            MENU
          </button>
          <button
            className="mode_btn"
            style={{ color: provideHighlight("Orders") }}
            onClick={() => {
              setShowHighlight("Orders");
              setShowMode(<Orders />);
            }}
          >
            ORDERS
          </button>
          <button
            className="mode_btn"
            style={{ color: provideHighlight("History") }}
            onClick={() => {
              setShowHighlight("History");
              setShowMode(<History />);
            }}
          >
            HISTORY
          </button>
        </div>

        <div className="movements_container">
          <div className="movements_text">Product</div>
          <div className="movements_text">Qty</div>
          <div className="movements_text">Each</div>
          <div className="movements_text">Total</div>

          <div className="movements_item">Mango</div>
          <div className="movements_item">2</div>
          <div className="movements_item">3.00</div>
          <div className="movements_item">6.00</div>
        </div>

        <hr style={{ margin: 0 }}></hr>

        <div className="display_container">
          <ul className="checkout_description">
            <li className="orderNum">Orders #</li>
            <li className="items">Items :</li>
            <li className="subTotal">SubTotal :</li>
            <li className="tax">Tax :</li>
          </ul>

          <div className="total">Total :</div>

          <div className="checkout_btn">
            <button className="checkout_hold_btn">HOLD</button>
            <button className="checkout_pay_btn">PAY</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
