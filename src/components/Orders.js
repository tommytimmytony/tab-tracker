import TabsBox from "./TabsBox";
import TabsBoxPlus from "./TabsBoxPlus";

export default function Orders() {
  return (
    <div className="">
      <TabsBox itemName={"Banana"} itemPrice={3.0} />
      <TabsBoxPlus />
    </div>
  );
}
