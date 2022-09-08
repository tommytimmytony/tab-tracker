import React from "react";
export default function Display({ movements, number }) {
  const orderNum = number;
  const itemsNum = Object.values(movements).reduce(
    (sum, { quantity }) => sum + quantity,
    0
  );
  let subTotal = Object.values(movements).reduce(
    (sum, { total }) => sum + total,
    0
  );
  let tax = subTotal * 0.0825;
  let total = subTotal + tax;
  return (
    <>
      <ul className="checkout_description">
        <li className="orderNum">Orders # {orderNum}</li>
        <li className="items">Items : {itemsNum}</li>
        <li className="subTotal">SubTotal : {Number(subTotal).toFixed(2)}</li>
        <li className="tax">Tax : {Number(tax).toFixed(2)}</li>
      </ul>
      <div className="total">Total : {Number(total).toFixed(2)}</div>
    </>
  );
}
