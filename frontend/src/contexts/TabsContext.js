import React, { useContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
const TabsContext = React.createContext();
export function useTabs() {
  return useContext(TabsContext);
}

export const TabsProvider = ({ children }) => {
  const initialProducts = {
    product1: {
      name: "Apple",
      price: 4.25,
    },
    product2: {
      name: "Banana",
      price: 5.99,
    },
    product3: {
      name: "Orange",
      price: 10.0,
    },
    product4: {
      name: "Watermelons",
      price: 4.99,
    },
    product5: {
      name: "Kiwi",
      price: 3.0,
    },
    product6: {
      name: "Mango",
      price: 2.0,
    },
  };
  const api = axios.create({
    baseURL: `http://localhost:5000/api`,
  });
  const [menuTabs, setMenuTabs] = useState([]);
  const [ordersTabs, setOrdersTabs] = useState([]);
  const [historyTabs, setHistoryTabs] = useState([]);
  const [movements, setMovements] = useState([]);
  const [orderNums, setOrderNums] = useState(1);
  const [editBtn, setEditBtn] = useState(false);
  const [largestOrderNums, setLargestOrderNums] = useState(1);
  const [orderNumId, setOrderNumId] = useState(0);

  useEffect(() => {
    async function start() {
      console.log("initializing...");
      let dataMenu = await fetchData("/menus");
      let dataOrders = await fetchData("/orders");
      let dataHistory = await fetchData("/histories");
      let dataOrderNum = await fetchData("/ordernums");
      if (dataOrderNum === undefined){
        alert("Not Connected to database");
        return;
      }
      if (dataOrderNum.length === 0)
        await createData("/ordernums", null, null, 1);
      setOrderNumId(dataOrderNum[0]._id);
      setMenuTabs(dataMenu);
      setOrdersTabs(dataOrders);
      setHistoryTabs(dataHistory);
      setOrderNums(dataOrderNum[0].orderNum);
      setLargestOrderNums(dataOrderNum[0].orderNum);
      if (dataMenu.length === 0) {
        for (const product in initialProducts) {
          addMenuTabs({
            name: initialProducts[product].name,
            price: initialProducts[product].price,
          });
        }
      }
    }

    start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const sorted = historyTabs.sort(function (a, b) {
      return a.orderNum - b.orderNum;
    });
    setHistoryTabs(sorted);
  }, [historyTabs]);

  async function fetchData(dbTable) {
    try {
      const data = await api.get(dbTable).then((res) => res.data);
      return data;
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  }

  async function createData(dbTable, name, price, orderNum, Summary, date) {
    let res;
    if (dbTable === "/menus")
      res = await api.post(dbTable, { name: name, price: price });
    if (dbTable === "/orders")
      res = await api.post(dbTable, { orderNum: orderNum, Summary: Summary });
    if (dbTable === "/histories")
      res = await api.post(dbTable, {
        orderNum: orderNum,
        Summary: Summary,
        date: date,
      });
    if (dbTable === "/ordernums")
      res = await api.post(dbTable, { orderNum: orderNum });
    return res.data;
  }

  async function addMenuTabs({ name, price }) {
    const prevTabs = await fetchData("/menus");
    if (prevTabs.find((menuTabs) => menuTabs.name === name)) {
      return;
    }
    const res = await createData("/menus", name, price);
    setMenuTabs([...prevTabs, res]);
  }

  async function incrementOrderNums() {
    const num = orderNums + 1;
    const largestNum = Math.max(largestOrderNums, num);
    setLargestOrderNums(largestNum);
    setOrderNums(num);
    await api.patch(`/ordernums/${orderNumId}`, {
      orderNum: largestNum,
    });
  }

  async function addOrdersTabs({ orderNum, Summary }) {
    const prevOrders = [...ordersTabs];
    const orderIndex = prevOrders.findIndex(
      (order) => order.orderNum === orderNum
    );
    const orders = prevOrders.find((order) => order.orderNum === orderNum);
    const largestNum = Math.max(largestOrderNums, orderNum + 1);
    setLargestOrderNums(largestNum);
    await api.patch(`/ordernums/${orderNumId}`, {
      orderNum: largestNum,
    });
    setOrderNums(largestNum);
    if (orderIndex !== -1) {
      // patch data
      console.log("Duplicate Tabs");
      const id = orders._id === undefined ? orders.id : orders._id;
      const orderNum = orders.orderNum;
      await api.patch(`/orders/${id}`, {
        orderNum: orderNum,
        Summary: Summary,
      });
      prevOrders[orderIndex] = { id, orderNum, Summary };
      setOrdersTabs(prevOrders);
      return;
    }
    console.log("Unique tabs");
    const res = await createData("/orders", null, null, orderNum, Summary);
    setOrdersTabs([...prevOrders, res]);
  }

  function getDate() {
     function addZero(time) {
       if (time < 10) {
         time = "0" + time;
       }
       return time;
     }
    let date = new Date();
    let dd = String(date.getDate()).padStart(2, "0");
    let mm = String(date.getMonth() + 1).padStart(2, "0"); //January is 0!
    let yyyy = String(date.getFullYear());
    let hours = addZero(String(date.getHours()));
    let min = addZero(String(date.getMinutes()));
    const today = `${mm}/${dd}/${yyyy}  ${hours}:${min}` ;
    return today;
  }
  async function addHistoryTabs({ orderNum, Summary }) {
    const newArr = ordersTabs.filter((tab) => tab.orderNum !== orderNum);
    const order = ordersTabs.find((order) => order.orderNum === orderNum);
    if (order !== undefined) {
      const id = order._id === undefined ? order.id : order._id;
      await api.delete(`/orders/${id}`);
    }
    const largestNum = Math.max(largestOrderNums, orderNum + 1);
    setOrderNums(largestNum);
    setOrdersTabs(newArr);
    const date = getDate();
    const res = await createData(
      "/histories",
      null,
      null,
      orderNum,
      Summary,
      date
    );
    const arr = [...historyTabs, res];
    const sorted = arr.sort(function (a, b) {
      return a.orderNum - b.orderNum;
    });
    setHistoryTabs(sorted);
  }

  function switchItemMovements({ number, mode }) {
    setOrderNums(number);
    if (mode === "History") {
      const history = historyTabs.find((tab) => tab.orderNum === number);
      if (history !== undefined) setMovements(history.Summary);
    } else if (mode === "Orders") {
      const order = ordersTabs.find((tab) => tab.orderNum === number);
      if (order !== undefined) setMovements(order.Summary);
    }
  }

  function addItemsMovements({ name, price }) {
    setMovements((prevMovements) => {
      let quantity = 1;
      let total = Number(price);
      // When updating useState directly using indexs
      // useEffect can't identify the updated
      // therefore it won't render (use an newArr instead)
      const newArr = [...prevMovements];
      const movementIndex = prevMovements.findIndex(
        (movements) => movements.name === name
      );
      const movements = prevMovements.find(
        (movements) => movements.name === name
      );
      if (movementIndex !== -1) {
        quantity = prevMovements[movementIndex].quantity + 1;
        total = quantity * Number(price);
        const id = movements.id;
        newArr[movementIndex] = {
          id,
          name,
          quantity,
          price,
          total,
        };
        return newArr;
      }
      return [...prevMovements, { id: uuidv4(), name, quantity, price, total }];
    });
  }

  async function removeMenuTabs({ name }) {
    const newArr = menuTabs.filter((tab) => tab.name !== name);
    const menu = menuTabs.find((tab) => tab.name === name);
    await api.delete(`/menus/${menu._id}`);
    setMenuTabs(newArr);
  }

  function removeMovements({ name }) {
    const newArr = [...movements];
    const movementIndex = movements.findIndex(
      (movement) => movement.name === name
    );
    newArr.splice(movementIndex, 1);
    setMovements(newArr);
  }

  return (
    <TabsContext.Provider
      value={{
        editBtn,
        setEditBtn,
        removeMovements,
        removeMenuTabs,
        largestOrderNums,
        setOrderNums,
        switchItemMovements,
        incrementOrderNums,
        orderNums,
        movements,
        setMovements,
        menuTabs,
        ordersTabs,
        historyTabs,
        addMenuTabs,
        addOrdersTabs,
        addHistoryTabs,
        addItemsMovements,
      }}
    >
      {children}
    </TabsContext.Provider>
  );
};
