import { useState, useContext } from "react";
import OrderContext from "../components/OrderContext";

export default function usePizza({ pizzas, inputs }) {
  // we got rid of (local) us state and moved it to the provider
  // const [order, setOrder] = useState([]);
  // instead we make use of the custom provider here:
  const [order, setOrder] = useContext(OrderContext);

  function addToOrder(orderedPizza) {
    setOrder([...order, orderedPizza]);
  }

  function removeFromOrder(index) {
    setOrder([...order.slice(0, index), ...order.slice(index + 1)]);
  }
  return {
    order,
    addToOrder,
    removeFromOrder,
  };
}
