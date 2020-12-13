import React from "react";
import { Link } from "gatsby";
import Img from "gatsby-image";

const PizzaList = ({ pizzas }) => {
  console.log(pizzas[0].name);

  // eslint-disable-next-line arrow-body-style
  const singlePizza = pizzas.map((pizza) => {
    return (
      <div key={pizza.id}>
        <Link to={`/pizza/${pizza.slug.current}`}>
          <h2>
            <span className="mark">{pizza.name}</span>
          </h2>
          <p>{pizza.toppings.map((topping) => topping.name).join(", ")}</p>
          <Img fluid={pizza.image.asset.fluid} alt={pizza.name} />
        </Link>
      </div>
    );
  });

  return <div>{singlePizza}</div>;
};

export default PizzaList;

// const images = props.images.map((image) => {
//   return <ImageCard key={image.id} image={image}/>
// });
