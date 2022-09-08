const express = require("express");
const router = express.Router();
const Schemas = require("../Schemas");

//Getting all
router.get("/menus", async (req, res) => {
  try {
    const menu = Schemas.Menu;
    const menuData = await menu.find();
    res.json(menuData);
  } catch (err) {
    res.status(500).res.json({ message: err.message });
  }
});

router.get("/orders", async (req, res) => {
  try {
    const order = Schemas.Orders;
    const orderData = await order.find();
    res.json(orderData);
  } catch (err) {
    res.status(500).res.json({ message: err.message });
  }
});

router.get("/histories", async (req, res) => {
  try {
    const history = Schemas.History;
    const historyData = await history.find();
    res.json(historyData);
  } catch (err) {
    res.status(500).res.json({ message: err.message });
  }
});

router.get("/ordernums", async (req, res) => {
  try{
    const num = Schemas.OrderNum;
    const numData = await num.find();
    res.json(numData);
  }catch(err){
    res.status(500).res.json({message: err.message});
  }
})
//Getting one
router.get("/menus/:id", getDataMenu, (req, res) => {
  res.json(res.menu);
});
router.get("/orders/:id", getDataOrders, (req, res) => {
  res.json(res.order);
});
router.get("/histories/:id", getDataHistory, (req, res) => {
  res.json(res.history);
});

//Creating one 
router.post("/menus", async (req, res) => {
  const menu = new Schemas.Menu({ name: req.body.name, price: req.body.price });
  try {
    const newMenu = await menu.save();
    res.status(201).json(newMenu);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.post("/orders", async (req, res) => {
  const order = new Schemas.Orders({
    orderNum: req.body.orderNum,
    Summary: req.body.Summary,
  });
  try {
    const newOrder = await order.save();
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.post("/histories", async (req, res) => {
  const history = new Schemas.History({
    orderNum: req.body.orderNum,
    Summary: req.body.Summary,
    date: req.body.date
  });
  try {
    const newHistory = await history.save();
    res.status(201).json(newHistory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.post("/ordernums", async (req, res) => {
  const num = new Schemas.OrderNum({
    orderNum: req.body.orderNum,
  });
  try {
    const newNum = await num.save();
    res.status(201).json(newNum);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
//Updating one
router.patch('/orders/:id', getDataOrders, async (req, res) => {
    if (req.body.orderNum !== null)
        res.order.orderNum = req.body.orderNum;
    if(req.body.Summary !== null){
        res.order.Summary = req.body.Summary;
    }
    if(req.body.id !== null){
        res.order.id = req.body.id;
    }
    try {
        const updatedOrder = await res.order.save();
        res.json(updatedOrder);
    } catch (err) {
        res.status(400).json({message: err.message});
    }
})

router.patch("/ordernums/:id", getDataOrderNum, async (req, res) => {
  if (req.body.orderNum !== null) res.num.orderNum = req.body.orderNum;

  try {
    const updatedOrder = await res.num.save();
    res.json(updatedOrder);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
//Deleting one
router.delete("/menus/:id", getDataMenu, async (req, res) => {
  try {
    await res.menu.remove();
    res.json({ message: `Deleted Tabs` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
router.delete("/orders/:id", getDataOrders, async (req, res) => {
  try {
    await res.order.remove();
    res.json({ message: `Deleted OrdersTabs` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// function to find Data
async function getDataMenu(req, res, next) {
  let menu;
  try {
    menu = await Schemas.Menu.findById(req.params.id);
    if (menu === null)
      return res.status(404).json({ message: "Cannot find menuTab" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.menu = menu;
  next();
}

async function getDataOrders(req, res, next) {
  let order;
  try {
    order = await Schemas.Orders.findById(req.params.id);
    if (order === null)
      return res.status(404).json({ message: "Cannot find ordersTab" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.order = order;
  next();
}

async function getDataHistory(req, res, next) {
  let history;
  try {
    history = await Schemas.History.findById(req.params.id);
    if (menu === null)
      return res.status(404).json({ message: "Cannot find menuTab" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.history = history;
  next();
}

async function getDataOrderNum(req, res, next) {
  let num;
  try {
    num = await Schemas.OrderNum.findById(req.params.id);
    if (num === null)
      return res.status(404).json({ message: "Cannot find menuTab" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.num = num;
  next();
}

module.exports = router;
