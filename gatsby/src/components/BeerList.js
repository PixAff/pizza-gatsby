import React from "react";
import styled from "styled-components";

const BeerGridStyles = styled.div`
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
`;

const SingleBeerStyles = styled.div`
  border: 1px solid var(--grey);
  padding: 2rem;
  text-align: center;
  img {
    width: 100%;
    height: 200px;
    object-fit: contain;
    display: grid;
    align-items: center;
    font-size: 10px;
  }
`;

const BeerList = ({ beers }) => {
  // eslint-disable-next-line arrow-body-style
  const singleBeer = beers.map((beer) => {
    const rating = Math.round(beer.rating.average);
    // let showTheBeer = false;

    // function showBeer(theTruth) {
    //   showTheBeer = theTruth;
    // }

    // function testImage(URL) {
    //   const tester = new Image();
    //   // tester.onload = showBeer(true);
    //   tester.onerror = showBeer(false);
    //   tester.src = URL;
    // }

    // testImage(beer.image);

    // if (!showTheBeer) return;
    return (
      <SingleBeerStyles key={beer.name}>
        <img src={beer.image} alt={beer.name} />
        <h3>{beer.name}</h3>
        {beer.price}
        <p title={`${rating} out of 5 stars`}>
          {`⭐`.repeat(rating)}
          <span style={{ filter: `grayscale(100%)` }}>
            {`⭐`.repeat(5 - rating)}
          </span>
          <span>({beer.rating.reviews})</span>
        </p>
      </SingleBeerStyles>
    );
  });

  return <BeerGridStyles>{singleBeer}</BeerGridStyles>;
};

export default BeerList;

// const images = props.images.map((image) => {
//   return <ImageCard key={image.id} image={image}/>
// });
