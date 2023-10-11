import { useContext, useEffect, useState } from "react";
import { GLOBAL_CONTEXT } from "../contexts/GlobalStore";
import { supabase } from "./../config/supabaseClient";

export const SelectedProducts = () => {
  const { context, setContext } = useContext(GLOBAL_CONTEXT);
  const [selectedProducts, setSelectedProducts] = useState([]);

  async function getSelectedProducts() {
    const user = JSON.parse(localStorage.getItem("user"));
    let { data, error } = await supabase
      .from("buyproducts")
      .select()
      .eq("user_id", user.id);

    if (error) {
      console.warn(error);
    } else if (data) {
      setSelectedProducts(data);
    }
  }

  useEffect(() => {
    getSelectedProducts();
  }, []);

  const handleEmptyBasket = () => {
    setContext({
      selectedProducts: [],
    });

    localStorage.setItem("selectedProducts", JSON.stringify([]));

    try {
      supabase
        .from("buyproducts")
        .delete()
        .eq("user_id", JSON.parse(localStorage.getItem("user")).id)
        .then(() => {
          setSelectedProducts([]);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteSelectedProduct = async (product) => {
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

    try {
      await supabase.from("buyproducts").delete().eq("id", product.id);
      await getSelectedProducts();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {selectedProducts &&
        selectedProducts.map((product) => {
          return (
            <div key={product.id}>
              <h3>
                {product.product_name} ({product.quantity}){" "}
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
