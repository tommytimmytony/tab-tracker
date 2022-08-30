const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const menuSchema = new Schema({
    // _id: ObjectId
    name: {type:String, required:true},
    price:{type:Number, required:true}
});
const ordersSchema = new Schema({
    // _id: ObjectId
    name: {type:String, required:true},
    price:{type:Number, required:true}
});
const historySchema = new Schema({
    // _id: ObjectId
    name: {type:String, required:true},
    price:{type:Number, required:true},
    date: {type:Date, default:Date.now}
});

const Menu = mongoose.model('menu', menuSchema);
const Orders = mongoose.model('order', ordersSchema);
const History = mongoose.model('history', historySchema);
const mySchemas = {'Menu': Menu, 'Orders':Orders, 'History': History };

module.exports = mySchemas;