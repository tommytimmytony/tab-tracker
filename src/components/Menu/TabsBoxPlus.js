import AddTabsBoxModal from "./AddTabsBoxModal";
import {useState} from 'react';

export default function TabsBoxPlus() {
  const [showAddTabsBoxModal,setShowAddTabsBoxModal] = useState(false);
  
  return (
    <>
    <button className="tabs_box" onClick={() => setShowAddTabsBoxModal(true)}>
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
    
      <AddTabsBoxModal
    show={showAddTabsBoxModal}
    handleClose={() => setShowAddTabsBoxModal(false)}
    />
    </>
  );
}
