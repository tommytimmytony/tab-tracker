
export default function TabsBox({itemName, itemPrice}){
    return (
      <button className="tabs_box" onClick={() => console.log("Hello")}>
        <div className="tabs_itemName">{itemName}</div>
        <div className="tabs_itemPrice">{itemPrice.toFixed(2)}</div>
      </button>
    );
}