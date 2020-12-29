import { useState, useContext } from "react";
import OrderContext from "../components/OrderContext";
import calculateOrderTotal from "./calculateOrderTotal";
import attachNamesAndPrices from "./attachNamesAndPrices";

export default function usePizza({ pizzas, values }) {
  // we got rid of (local) us state and moved it to the provider
  // const [order, setOrder] = useState([]);
  // instead we make use of the custom provider here:
  const [order, setOrder] = useContext(OrderContext);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  function addToOrder(orderedPizza) {
    setOrder([...order, orderedPizza]);
  }

  function removeFromOrder(index) {
    setOrder([...order.slice(0, index), ...order.slice(index + 1)]);
  }

  async function submitOrder(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    const body = {
      order: attachNamesAndPrices(order, pizzas),
      total: calculateOrderTotal(order, pizzas),
      name: values.name,
      email: values.email,
      mapleSyrup: values.mapleSyrup,
    };
    const res = await fetch(
      `${process.env.GATSBY_SERVERLESS_BASE}/placeOrder`,
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );
    const text = JSON.parse(await res.text());
    if (res.status >= 400 && res.status < 600) {
      setLoading(false);
      setError(text.message);
    } else {
      setLoading(false);
      setMessage("Success! Come and grab your pizza in 10!");
      setOrder([]);
    }
  }
  return {
    order,
    addToOrder,
    removeFromOrder,
    error,
    loading,
    message,
    submitOrder,
  };
}
