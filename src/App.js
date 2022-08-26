import "./css/app.css";
import Menu from "./components/Menu/Menu";
import Orders from "./components/Orders/Orders";
import History from "./components/History/History";
import { useState, useEffect } from "react";
import Movements from "./components/Menu/Movements";
import Display from "./components/Menu/Display";
import { useTabs } from "./contexts/TabsContext";

function App() {
  const [showMode, setShowMode] = useState(<Menu />);
  const [showHighlight, setShowHighlight] = useState("Menu");
  function provideHighlight(mode) {
    if (mode === showHighlight) return "red";
    else return "black";
  }

  const { movements } = useTabs();

  function updateMovements(){
     movements.map((movement) => {
       return (
         <Movements
           key={movement.id}
           name={movement.name}
           quantity={movement.quantity}
           price={movement.price}
           total={movement.total}
         />
       );
     });
  }
  return (
    <>
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
            <div className="movements_text">&#8203;</div>
    
            {movements.map((movement) => {
              return (
                <Movements
                  key={movement.id}
                  name={movement.name}
                  quantity={movement.quantity}
                  price={movement.price}
                  total={movement.total}
                />
              );
            })}
            {useEffect(() => {
              movements.map((movement) => {
                return (
                  <Movements
                    key={movement.id}
                    name={movement.name}
                    quantity={movement.quantity}
                    price={movement.price}
                    total={movement.total}
                  />
                );
              });
            }, [movements])}
          </div>

          <hr style={{ margin: 0 }}></hr>

          <div className="display_container">
            {/* <ul className="checkout_description">
              <li className="orderNum">Orders #</li>
              <li className="items">Items :</li>
              <li className="subTotal">SubTotal :</li>
              <li className="tax">Tax :</li>
            </ul>

            <div className="total">Total :</div> */}
            <Display movements={movements} />
      
            <div className="checkout_btn">
              <button className="checkout_hold_btn">HOLD</button>
              <button className="checkout_pay_btn">PAY</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
