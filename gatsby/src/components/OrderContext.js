import React, { useState } from "react";

// create Context
const OrderContext = React.createContext();

export function OrderProvider({ children }) {
  const [order, setOrder] = useState("HAHA");
  return <OrderContext.Provider>{children}</OrderContext.Provider>;
}

export default OrderContext;
