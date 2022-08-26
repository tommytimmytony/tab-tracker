import { useTabs } from "../../contexts/TabsContext";

export default function TabsBox({itemName, itemPrice}){
    const { addItemsMovements, movements, setMovements } = useTabs();

    return (
      <button className="tabs_box"onClick={() => addItemsMovements({name: itemName, price: itemPrice})}>
        <div className="tabs_itemName">
          <div className="delete_tab_btn">X</div>
          {itemName}
        </div>
        <div className="tabs_itemPrice">{Number(itemPrice).toFixed(2)}</div>
      </button>
    );
}