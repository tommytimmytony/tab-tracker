import TabsBox from "./TabsBox";

export default function TabsBoxPlus() {
  return (
    <button className="tabs_box" onClick={() => console.log("Plus")}>
      <div
        className="tabs_itemName"
        style={{
          textAlign: "center",
        }}
      >
        <br></br>
        <br></br>
        &#43;
      </div>
      <div className="tabs_itemPrice"></div>
    </button>
  );
}
