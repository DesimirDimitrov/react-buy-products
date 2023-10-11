import { useContext } from "react";
import { GLOBAL_CONTEXT } from "../contexts/GlobalStore";
import { supabase } from "./../config/supabaseClient";

export const DefaultProducts = () => {
  const { context, setContext } = useContext(GLOBAL_CONTEXT);
  const defaultProducts =
    context && context.defaultProducts ? context.defaultProducts : [];

  const handleProductSelect = async (product) => {
    const productAlreadySelected = productExists(product);

    if (productAlreadySelected) {
      const selectedProduct = context.selectedProducts.find(
        (selectedProduct) => selectedProduct.id === product.id
      );
      selectedProduct.quantity += 1;
      setContext({
        selectedProducts: [...context.selectedProducts],
      });

      localStorage.setItem(
        "selectedProducts",
        JSON.stringify([...context.selectedProducts])
      );

      // supabase update quantity in database
      try {
        await supabase
          .from("buyproducts")
          .update({ quantity: selectedProduct.quantity })
          .eq("user_id", JSON.parse(localStorage.getItem("user")).id)
          .eq("product_id", product.id);
      } catch (error) {
        console.log(error);
      }
    } else {
      const selectedProduct = {
        id: product.id,
        name: product.name,
        quantity: 1,
      };

      setContext({
        selectedProducts: [...context.selectedProducts, selectedProduct],
      });

      localStorage.setItem(
        "selectedProducts",
        JSON.stringify([...context.selectedProducts, selectedProduct])
      );

      const user = localStorage.getItem("user");
      const dbData = {
        product_id: product.id,
        product_name: product.name,
        user_id: user ? JSON.parse(user).id : null,
        quantity: 1,
      };

      try {
        await supabase.from("buyproducts").insert([dbData]);
      } catch (error) {
        console.log(error);
      }
    }
  };

  function productExists(product) {
    return context.selectedProducts.some((selectedProduct) => {
      if (selectedProduct.id === product.id) {
        return selectedProduct;
      } else {
        return false;
      }
    });
  }

  return (
    <ul>
      {defaultProducts &&
        defaultProducts.map((product) => {
          return (
            <li key={product.id}>
              <button
                style={{ margin: "10px", padding: "5px" }}
                onClick={() => handleProductSelect(product)}
              >
                {product.name}
              </button>
            </li>
          );
        })}
    </ul>
  );
};
