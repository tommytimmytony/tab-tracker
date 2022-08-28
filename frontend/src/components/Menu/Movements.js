import { useTabs } from "../../contexts/TabsContext";

export default function Movements({name, quantity, price, total}){
  const {removeMovements} = useTabs();
    return (
      <>
        <div className="movements_item">{name}</div>
        <div className="movements_item">{quantity}</div>
        <div className="movements_item">{Number(price).toFixed(2)}</div>
        <div className="movements_item">{Number(total).toFixed(2)}</div>
        <button className="delete_item_btn" onClick={() => removeMovements({name: name})}>X</button>
      </>
    );
}