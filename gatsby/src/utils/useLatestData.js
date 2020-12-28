import { useState, useEffect } from "react";

const url = process.env.GATSBY_GRAPHQL_ENDPOINT;

export default function useLatestData() {
  console.log({ url });
  const [hotSlices, setHotSlices] = useState();
  const [slicemasters, setSlicemasters] = useState();

  useEffect(function () {
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `query {
  StoreSettings(id: "downtown") {
    name
    slicemaster {
      name
    }
    hotSlices {
      name
    }
  }
}
`,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res.data);
        setHotSlices(res.data.StoreSettings.hotSlices);
        setSlicemasters(res.data.StoreSettings.slicemaster);
      });
  }, []);
  return { hotSlices, slicemasters };
}
