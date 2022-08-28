import AddTabsBoxModal from "./AddTabsBoxModal";
import {useState} from 'react';
import { useTabs } from "../../contexts/TabsContext";

export default function TabsBoxPlus() {
  const [showAddTabsBoxModal,setShowAddTabsBoxModal] = useState(false);
  const {setEditBtn, editBtn} = useTabs();
  return (
    <>
      <button className="tabs_box" onClick={() => setShowAddTabsBoxModal(true)}>
        <div
          className="tabs_itemName"
          style={{
            textAlign: "center",
          }}
        >
          <div
            className="delete_tab_btn"
            onClick={(e) => {
              e.stopPropagation();
              setEditBtn(!editBtn);
              console.log("Hello");
            }}
          >
            Edit
          </div>
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
