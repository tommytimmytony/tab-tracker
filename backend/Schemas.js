const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const menuSchema = new Schema({
  // _id: ObjectId
  name: { type: String, required: true },
  price: { type: Number, required: true },
});
const ordersSchema = new Schema({
  // _id: ObjectId
  orderNum: { type: Number, required: true },
  Summary: [{ name: String, price: Number, quantity: Number, total: Number }],
});
const historySchema = new Schema({
  // _id: ObjectId
  orderNum: { type: Number, required: true },
  Summary: [{ name: String, price: Number, quantity: Number, total: Number }],
  date: { type: String, required: true },
  ISOdate: { type: Date, default: Date.now },
});

const OrderNumSchema = new Schema({
  //_id: ObjectId
  orderNum: { type: Number, required: true },
});
const Menu = mongoose.model("menu", menuSchema);
const Orders = mongoose.model("order", ordersSchema);
const History = mongoose.model("history", historySchema);
const OrderNum = mongoose.model("orderNum", OrderNumSchema);
const mySchemas = { Menu: Menu, Orders: Orders, History: History, OrderNum : OrderNum};

module.exports = mySchemas;
