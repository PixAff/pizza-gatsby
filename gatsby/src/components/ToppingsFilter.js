import React from "react";
import { useStaticQuery, graphql, Link } from "gatsby";
import styled from "styled-components";

const ToppingStyles = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 4rem;
  a {
    display: grid;
    grid-template-columns: auto 1fr;
    grid-gap: 0 1rem;
    align-items: center;
    padding: 5px;
    background: var(--grey);
    border-radius: 2px;
    .count {
      background: white;
      padding: 2px 5px;
    }
    &[aria-current="page"] {
      background: var(--yellow);
    }
  }
`;

function CountPizzasInToppings(pizzas) {
  const counts = pizzas
    .map((pizza) => pizza.toppings)
    .flat()
    .reduce((acc, topping) => {
      // check if this is an existing topping
      const existingTopping = acc[topping.id];
      if (existingTopping) {
        // if it is, increment by 1
        existingTopping.count += 1;
      } else {
        // otherwise create new entry and set to 1
        acc[topping.id] = {
          id: topping.id,
          name: topping.name,
          count: 1,
        };
      }
      return acc;
    }, {});
  // sort them based on count
  const sortedToppings = Object.values(counts).sort(
    (a, b) => b.count - a.count
  );
  return sortedToppings;
}

export default function ToppingsFilter({ activeTopping }) {
  const { toppings, pizzas } = useStaticQuery(graphql`
    query {
      toppings: allSanityTopping {
        nodes {
          name
          id
          vegetarian
        }
      }
      pizzas: allSanityPizza {
        nodes {
          toppings {
            name
            id
          }
        }
      }
    }
  `);

  const toppingsWithCounts = CountPizzasInToppings(pizzas.nodes);
  const toppingTags = toppingsWithCounts.map((topping) => {
    return (
      <Link
        key={topping.id}
        to={`/topping/${topping.name}`}
        // className={topping.name === activeTopping ? "active" : ""}
      >
        <span className="name">{topping.name}</span>
        <span className="count">{topping.count}</span>
      </Link>
    );
  });

  return (
    <ToppingStyles>
      <Link to="/pizzas/">
        <span className="name">All</span>
        <span className="count">{pizzas.nodes.length}</span>
      </Link>
      {toppingTags}
    </ToppingStyles>
  );
}
