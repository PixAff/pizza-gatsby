import React from "react";
import Img from "gatsby-image";
import calculatePizzaPrice from "../utils/calculatePizzaPrice";
import formatMoney from "../utils/formatMoney";

import MenuItemStyles from "../styles/MenuItemStyles";

export default function PizzaOrder({ order, pizzas, removeFromOrder }) {
  return (
    <div>
      {order.map((item, index) => {
        const pizza = pizzas.find((SinglePizza) => SinglePizza.id === item.id);
        return (
          <MenuItemStyles key={index}>
            <Img fluid={pizza.image.asset.fluid} />
            <h2>{pizza.name}</h2>
            <p>
              {formatMoney(calculatePizzaPrice(pizza.price, item.size))}{" "}
              <button
                type="button"
                className="remove"
                title={`Remove ${item.size} ${pizza.name} from Order`}
                onClick={() => removeFromOrder(index)}
              >
                &times;
              </button>
            </p>
          </MenuItemStyles>
        );
      })}
    </div>
  );
}
