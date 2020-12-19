import React from "react";
import { graphql } from "gatsby";

import BeerList from "../components/BeerList";

export default function BeersPage({ data }) {
  const beers = data.beers.nodes;
  return (
    <div>
      <h2 className="center">We have {beers.length} beers available!</h2>
      <div>
        <BeerList beers={beers} />;
      </div>
    </div>
  );
}

export const query = graphql`
  query BeerQuery {
    beers: allBeer {
      nodes {
        name
        price
        image
        rating {
          reviews
          average
        }
      }
    }
  }
`;
