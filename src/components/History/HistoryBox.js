import { useTabs } from "../../contexts/TabsContext";

export default function HistoryBox({orderNum, date, Summary}){
    const {switchItemMovements} = useTabs();
    return (
        <div className="history_box" onClick={() => {
            console.log("Hello");
            switchItemMovements({number: orderNum, mode:"History"})}}>
            <div>ORDERS # {orderNum}</div>
            <div>{date}</div>
        </div>
    );
}