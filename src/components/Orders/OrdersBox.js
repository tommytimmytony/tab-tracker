import { useTabs } from "../../contexts/TabsContext"

export default function OrdersBox({orderNum}){

    const {switchItemMovements} = useTabs();
    return (
      <button className="tabs_box" onClick={() => switchItemMovements({number: orderNum, mode:"Orders" })}>
        <div className="tabs_itemName">
          Order #{orderNum}
        </div>
        <div className="tabs_itemPrice"></div>
      </button>
    );
}