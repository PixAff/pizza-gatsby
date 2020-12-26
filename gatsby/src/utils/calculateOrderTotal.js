import calculatePizzaPrice from "../utils/calculatePizzaPrice";
import formatMoney from "../utils/formatMoney";

export default function calculateOrderTotal(order, pizzas) {
  let total = 0;
  order.forEach((item) => {
    const pizza = pizzas.find((SinglePizza) => SinglePizza.id === item.id);
    const price = calculatePizzaPrice(pizza.price, item.size);
    total += price;
  });
  return formatMoney(total);
}

// Wes Solution:
// export default function calculateOrderTotal(order, pizzas) {
//   return order.reduce((runningTotal, singleOrder) => {
//     const pizza = pizzas.find(
//       (SinglePizza) => SinglePizza.id === singleOrder.id
//     );
//     return runningTotal + calculatePizzaPrice(pizza.price, singleOrder.size);
//   }, 0);
// }
