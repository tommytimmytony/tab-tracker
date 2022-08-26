import React, { useContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Movements from "../components/Menu/Movements";
const TabsContext = React.createContext();

export function useTabs() {
  return useContext(TabsContext);
}

export const TabsProvider = ({ children }) => {
  const [menuTabs, setMenuTabs] = useState([]);
  const [ordersTabs, setordersTabs] = useState([]);
  const [historyTabs, sethistoryTabs] = useState([]);
  const [movements, setMovements] = useState([]);
  function addMenuTabs({ name, price }) {
    setMenuTabs((prevTabs) => {
      if (prevTabs.find((menuTabs) => menuTabs.name === name)) {
        return prevTabs;
      }
      return [...prevTabs, { id: uuidv4(), name, price }];
    });
  }

  function addOrdersTabs({}) {}
  function addHistoryTabs({}) {}
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
      if (movementIndex !== -1) {
        quantity = prevMovements[movementIndex].quantity + 1;
        total = quantity * Number(price);
        newArr[movementIndex] = { name, quantity, price, total };
        console.log(prevMovements);
        console.log(movementIndex);
        return newArr;
      }
      console.log(prevMovements);
      console.log(movementIndex);
      return [...prevMovements, { id: uuidv4(), name, quantity, price, total }];
    });
  }

  return (
    <TabsContext.Provider
      value={{
        movements,
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
