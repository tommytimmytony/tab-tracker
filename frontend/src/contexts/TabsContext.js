import React, { useContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
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
  const [menuTabs, setMenuTabs] = useState([]);
  const [ordersTabs, setOrdersTabs] = useState([]);
  const [historyTabs, setHistoryTabs] = useState([]);
  const [movements, setMovements] = useState([]);
  const [orderNums, setOrderNums] = useState(1);
  const [editBtn, setEditBtn] = useState(false);
  const [largestOrderNums, setLargestOrderNums] = useState(1);

  useEffect(() => {
    for (const product in initialProducts) {
      addMenuTabs({
        name: initialProducts[product].name,
        price: initialProducts[product].price,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function addMenuTabs({ name, price }) {
    setMenuTabs((prevTabs) => {
      if (prevTabs.find((menuTabs) => menuTabs.name === name)) {
        return prevTabs;
      }
      return [...prevTabs, { id: uuidv4(), name, price }];
    });
  }

  function incrementOrderNums() {
    console.log(ordersTabs);
    setOrderNums((prevNum) => {
      const num = prevNum + 1;
      const largestNum = Math.max(largestOrderNums, num);
      setLargestOrderNums(largestNum);
      console.log(largestNum);
      return num;
    });
  }

  function addOrdersTabs({ orderNum, Summary }) {
    setOrdersTabs((prevOrders) => {
      const newArr = [...prevOrders];
      const orderIndex = prevOrders.findIndex(
        (order) => order.orderNum === orderNum
      );
      const orders = prevOrders.find((order) => order.orderNum === orderNum);
      console.log(prevOrders);
      if (orderIndex !== -1) {
        setOrderNums(largestOrderNums);
        console.log("Duplicate Tabs");
        const id = orders.id;
        const orderNum = orders.orderNum;
        newArr[orderIndex] = { id, orderNum, Summary };
        console.log(ordersTabs);
        return newArr;
      }
      console.log("Unique tabs");
      return [...prevOrders, { id: uuidv4(), orderNum, Summary }];
    });
  }

  function getDate() {
    let date = new Date();
    let dd = String(date.getDate()).padStart(2, "0");
    let mm = String(date.getMonth() + 1).padStart(2, "0"); //January is 0!
    let yyyy = String(date.getFullYear());
    const today = mm + "/" + dd + "/" + yyyy;
    return today;
  }
  function addHistoryTabs({ orderNum, Summary }) {
    const newArr = [...ordersTabs];
    const orderIndex = ordersTabs.findIndex(
      (order) => order.orderNum === orderNum
    );
    newArr.splice(orderIndex, 1);
    setOrdersTabs(newArr);
    setHistoryTabs((prevHistoryTabs) => {
      if (
        prevHistoryTabs.find((historyTabs) => historyTabs.orderNum === orderNum)
      ) {
        return prevHistoryTabs;
      }
      const date = getDate();
      return [...prevHistoryTabs, { id: uuidv4(), orderNum, date, Summary }];
    });
  }

  function switchItemMovements({ number, mode }) {
    setOrderNums(number);
    if (mode === "History") {
      const history = historyTabs.find((tab) => tab.orderNum === number);
      if (history !== undefined) setMovements(history.Summary);
    } else if (mode === "Orders") {
      const order = ordersTabs.find((tab) => tab.orderNum === number);
      console.log(order.Summary);
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
        // console.log(prevMovements);
        // console.log(movementIndex);
        return newArr;
      }
      // console.log(prevMovements);
      // console.log(movementIndex);
      return [...prevMovements, { id: uuidv4(), name, quantity, price, total }];
    });
  }

  function removeMenuTabs({ name }) {
    const newArr = [...menuTabs];
    const menuIndex = menuTabs.findIndex((tab) => tab.name === name);
    newArr.splice(menuIndex, 1);
    setMenuTabs(newArr);
  }

  function removeMovements({name}){
     const newArr = [...movements];
     const movementIndex = movements.findIndex((movement) => movement.name === name);
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
