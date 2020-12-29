import { useState, useEffect } from "react";

const gql = String.raw; // fake function to make graphql queries formatable
const deets = gql`
    name
    _id
    image {
      asset {
        url
        metadata {
          lqip
        }
      }
    }`;

const url = process.env.GATSBY_GRAPHQL_ENDPOINT;

export default function useLatestData() {
  const [hotSlices, setHotSlices] = useState();
  const [slicemasters, setSlicemasters] = useState();

  useEffect(function () {
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: gql`
          query {
            StoreSettings(id: "downtown") {
              name
              slicemaster {
                ${deets}
              }
              hotSlices {
                ${deets}
              }
            }
          }
        `,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        setHotSlices(res.data.StoreSettings.hotSlices);
        setSlicemasters(res.data.StoreSettings.slicemaster);
      })
      .catch((err) => console.log(err));
  }, []);
  return { hotSlices, slicemasters };
}
