export default function History() {
  return (
    <div className="">
      <button className="tabs_box">
        <div className="tabs_itemName">Coconut</div>
        <div className="tabs_itemPrice">3.00</div>
      </button>
      <button className="tabs_box">
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
    </div>
  );
}
