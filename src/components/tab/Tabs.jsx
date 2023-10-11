import { useState } from "react";
import { DefaultProductsTab } from "./alltabs/DefaultProductsTab";
import { SelectedProductsTab } from "./alltabs/SelectedProductsTab";

export const Tabs = () => {
  const [activeTab, setActiveTab] = useState("defaultProductsTab");

  //  Functions to handle Tab Switching
  const handleTab1 = () => {
    // update the state to tab1
    setActiveTab("defaultProductsTab");
  };
  const handleTab2 = () => {
    // update the state to tab2
    setActiveTab("selectedProductsTab");
  };

  return (
    <div className="Tabs">
      {/* Tab nav */}
      <ul className="nav">
        <li
          className={activeTab === "defaultProductsTab" ? "active" : ""}
          onClick={handleTab1}
        >
          <h1>Продукти</h1>
        </li>
        <li
          className={activeTab === "selectedProductsTab" ? "active" : ""}
          onClick={handleTab2}
        >
          <h1>Избрани</h1>
        </li>
      </ul>
      <div className="outlet">
        {activeTab === "defaultProductsTab" ? (
          <DefaultProductsTab />
        ) : (
          <SelectedProductsTab />
        )}
      </div>
    </div>
  );
};
