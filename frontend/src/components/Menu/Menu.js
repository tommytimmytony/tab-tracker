import TabsBox from './TabsBox' 
import TabsBoxPlus from './TabsBoxPlus';
import { useTabs } from '../../contexts/TabsContext';

export default function Menu() {
  const {menuTabs} = useTabs();
  return (
    <>
      <div className="">
        {menuTabs.map((tab) => {
          return <TabsBox key={tab.id} itemName={tab.name} itemPrice={tab.price} />;
        })}

        <TabsBoxPlus />
      </div>
    </>
  );
}
