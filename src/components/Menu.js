import TabsBox from './TabsBox' 
import TabsBoxPlus from './TabsBoxPlus';

export default function Menu() {
  return (
    <div className="">
       
        <TabsBox itemName={"Mango"} itemPrice={2.00}/>
        <TabsBoxPlus/>
    </div>
  );
}
