import React, { useState } from "react";

export const defaultProducts = [
  {
    id: 1,
    name: "Хляб",
  },
  {
    id: 2,
    name: "Прясно Мляко",
  },
  {
    id: 3,
    name: "Яйца",
  },
  {
    id: 4,
    name: "Кисело Мляко",
  },
  {
    id: 5,
    name: "Бисквити Милка",
  },
];

export const GLOBAL_CONTEXT = React.createContext({
  defaultProducts: defaultProducts,
});

const GlobalStore = (props) => {
  const { children } = props;

  const [context, setContext] = useState({
    defaultProducts: defaultProducts,
    selectedProducts: [],
  });

  const updateStore = (state = {}) => {
    setContext({
      ...context,
      ...state,
    });
  };

  return (
    <GLOBAL_CONTEXT.Provider
      value={{
        context,
        setContext: updateStore,
      }}
    >
      {children}
    </GLOBAL_CONTEXT.Provider>
  );
};

export default GlobalStore;
