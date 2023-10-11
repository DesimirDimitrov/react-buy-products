import { useContext } from "react";
import { GLOBAL_CONTEXT } from "../contexts/GlobalStore";

export const SelectedProducts = () => {
  const { context, setContext } = useContext(GLOBAL_CONTEXT);
  const selectedProducts = getSelectedProducts();
  function getSelectedProducts() {
    if (!localStorage.getItem("selectedProducts")) {
      return [];
    }

    const products = localStorage.getItem("selectedProducts");
    return products ? JSON.parse(products) : [];
  }

  const handleEmptyBasket = () => {
    setContext({
      selectedProducts: [],
    });

    localStorage.setItem("selectedProducts", JSON.stringify([]));
  };

  const handleDeleteSelectedProduct = (product) => {
    const newSelectedProducts = selectedProducts.filter(
      (productItem) => productItem.id !== product.id
    );

    setContext({
      selectedProducts: newSelectedProducts,
    });

    localStorage.setItem(
      "selectedProducts",
      JSON.stringify(newSelectedProducts)
    );
  };

  return (
    <div>
      {selectedProducts &&
        selectedProducts.map((product) => {
          return (
            <div key={product.id}>
              <h3>
                {product.name} ({product.quantity}){" "}
                <button
                  onClick={() => {
                    handleDeleteSelectedProduct(product);
                  }}
                >
                  Изтрий
                </button>
              </h3>
            </div>
          );
        })}
      <button
        style={{ margin: "10px", padding: "5px" }}
        onClick={handleEmptyBasket}
      >
        Изпразни кошницата
      </button>
    </div>
  );
};
