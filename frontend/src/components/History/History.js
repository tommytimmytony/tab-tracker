import React from "react";
import HistoryBox from "./HistoryBox";
import { useTabs } from "../../contexts/TabsContext";

export default function History() {
  const { historyTabs } = useTabs();
  return (
    <div>
      {historyTabs.map((tab) => {
        return (
          <HistoryBox
            key={tab.id}
            orderNum={tab.orderNum}
            date={tab.date}
            Summary={tab.Summary}
          />
        );
      })}
      ;
    </div>
  );
}
