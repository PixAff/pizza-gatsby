import React from "react";
import { ItemsGrid, ItemStyles } from "../styles/Grids";

export default function ItemGrid({ item }) {
  return (
    <ItemsGrid>
      {item.map((singleItem) => (
        <ItemStyles key={singleItem.name}>
          <p>
            <span className="mark">{singleItem.name}</span>
          </p>
          <img
            width="500"
            height="400"
            src={`${singleItem.image.asset.url}?&w=500&h=400&fit=crop`}
            alt={singleItem.name}
            style={{
              background: `url${singleItem.image.asset.metadata.lqip}`,
              backgroundSize: "cover",
            }}
          />
        </ItemStyles>
      ))}
    </ItemsGrid>
  );
}
