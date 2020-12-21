import React from "react";
import { graphql } from "gatsby";
import Img from "gatsby-image";

import SEO from "../components/SEO";

export default function SingleMasterPage({ data: { master } }) {
  return (
    <div>
      <SEO title={master.name} image={master.image?.asset?.fluid?.src} />
      <div className="center">
        <Img fluid={master.image.asset.fluid} />
        <h2>
          <span className="mark">{master.name}</span>
        </h2>
        <p>{master.description}</p>
      </div>
    </div>
  );
}

export const query = graphql`
  query($slug: String!) {
    master: sanityPerson(slug: { current: { eq: $slug } }) {
      name
      id
      description
      image {
        asset {
          fluid(maxWidth: 1000, maxHeight: 750) {
            ...GatsbySanityImageFluid
          }
        }
      }
    }
  }
`;
