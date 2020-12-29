import React from "react";

import useLatestData from "../utils/useLatestData";
import LoadingGrid from "../components/LoadingGrid";
import ItemGrid from "../components/ItemGrid";
import { HomePageGrid } from "../styles/Grids";

function CurrentlySlicing({ slicemasters }) {
  return (
    <div>
      <h2 className="center">
        <span className="mark tilt">Slicemasters ON:</span>
      </h2>
      <p>Standing by to slice you up!</p>
      {!slicemasters && <LoadingGrid count={4} />}
      {slicemasters && !slicemasters?.length && (
        <p>No one is working right now</p>
      )}
      {slicemasters?.length && <ItemGrid item={slicemasters} />}
    </div>
  );
}

function HotSlices({ hotSlices }) {
  return (
    <div>
      <h2 className="center">
        <span className="mark tilt">Pizzas in the oven:</span>
      </h2>
      <p>Come on by, buy the slice!</p>
      {!hotSlices && <LoadingGrid count={4} />}
      {hotSlices && !hotSlices?.length && <p>Nothing in the Pizza oven...</p>}
      {hotSlices?.length && <ItemGrid item={hotSlices} />}
    </div>
  );
}

export default function HomePage() {
  const { slicemasters, hotSlices } = useLatestData();
  return (
    <div className="center">
      <h2>Best Pizza Downtown!</h2>
      <p>Open 11am to 11pm every single day!</p>
      <HomePageGrid>
        <CurrentlySlicing slicemasters={slicemasters} />
        <HotSlices hotSlices={hotSlices} />
      </HomePageGrid>
    </div>
  );
}
