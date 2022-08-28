import OrdersBox from "./OrdersBox";
import { useTabs } from "../../contexts/TabsContext";

export default function Orders() {
  const { ordersTabs} = useTabs();
  return (
    <div className="">
      {ordersTabs.map((tab) => {
        console.log(ordersTabs);
        return <OrdersBox key={tab.id} orderNum={tab.orderNum} />
      })}
    </div>
  );
}
