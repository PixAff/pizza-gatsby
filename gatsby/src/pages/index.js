import React from "react";

import useLatestData from "../utils/useLatestData";
import { HomePageGrid } from "../styles/Grids";

function CurrentlySlicing(slicemasters) {
  return (
    <div>
      <p></p>
    </div>
  );
}

function HotSlices(hotSlices) {
  return (
    <div>
      <p></p>
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
