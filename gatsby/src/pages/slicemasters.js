import React from "react";
import { graphql, Link } from "gatsby";
import Img from "gatsby-image";
import styled from "styled-components";

const MasterGridStyles = styled.div`
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
`;

const MasterSyles = styled.div`
  a {
    text-decoration: none;
  }
  .gatsby-image-wrapper {
    height: 400px;
  }
  h2 {
    transform: rotate(-2deg);
    text-align: center;
    font-size: 4rem;
    margin-bottom: -2rem;
    position: relative;
    z-index: 2;
  }
  .description {
    background: var(--yellow);
    padding: 1rem;
    margin: 2rem;
    margin-top: -6rem;
    position: relative;
    z-index: 2;
    transform: rotate(1deg);
    text-align: center;
  }
`;

export default function SliceMastersPage({ data, pageContext }) {
  const masters = data.persons.nodes;
  console.log(masters);

  return (
    <MasterGridStyles>
      {masters.map((master) => (
        <MasterSyles key={master.id}>
          <Link to={`/slicemaster/${master.slug.current}`}>
            <h2>
              <span className="mark">{master.name}</span>
            </h2>
          </Link>
          <Img fluid={master.image.asset.fluid} alt={master.name} />
          <p className="description">{master.description}</p>
        </MasterSyles>
      ))}
    </MasterGridStyles>
  );
}

export const query = graphql`
  query SliceMasterQuery($skip: Int = 0, $pageSize: Int = 4) {
    persons: allSanityPerson(limit: $pageSize, skip: $skip) {
      totalCount
      nodes {
        name
        slug {
          current
        }
        id
        description
        image {
          asset {
            fluid(maxWidth: 400) {
              ...GatsbySanityImageFluid
            }
          }
        }
      }
    }
  }
`;
