import path from "path";
import fetch from "isomorphic-fetch";

async function turnPizzasIntoPages({ graphql, actions }) {
  const pizzaTemplate = path.resolve("src/templates/Pizza.js");

  const { data } = await graphql(`
    query {
      pizzas: allSanityPizza {
        nodes {
          name
          slug {
            current
          }
        }
      }
    }
  `);

  data.pizzas.nodes.forEach((pizza) => {
    actions.createPage({
      path: `pizza/${pizza.slug.current}`,
      component: pizzaTemplate,
      context: {
        slug: pizza.slug.current,
      },
    });
  });
}

async function turnToppingsIntoPages({ graphql, actions }) {
  const toppingTemplate = path.resolve("src/pages/pizzas.js");

  const { data } = await graphql(`
    query {
      toppings: allSanityTopping {
        nodes {
          name
          id
        }
      }
    }
  `);

  data.toppings.nodes.forEach((topping) => {
    actions.createPage({
      path: `topping/${topping.name}`,
      component: toppingTemplate,
      context: {
        topping: topping.name,
      },
    });
  });
}

async function fetchBeersandTurnIntoNodes({
  actions,
  createNodeId,
  createContentDigest,
}) {
  const res = await fetch("https://sampleapis.com/beers/api/ale");
  const beers = await res.json();
  beers.forEach((beer) => {
    const nodeMeta = {
      id: createNodeId(`beer-${beer.name}`),
      parent: null,
      children: [],
      internal: {
        type: "Beer",
        mediaType: "application/json",
        contentDigest: createContentDigest(beer),
      },
    };
    actions.createNode({
      ...beer,
      ...nodeMeta,
    });
  });
  // console.log("turn beers into nodes");
}

async function turnSliceMastersIntoPages({ graphql, actions }) {
  // 1. query all masters
  const { data } = await graphql(`
    query {
      masters: allSanityPerson {
        totalCount
        nodes {
          name
          id
          slug {
            current
          }
        }
      }
    }
  `);
  data.masters.nodes.forEach((master) => {
    actions.createPage({
      path: `/slicemaster/${master.slug.current}`,
      component: path.resolve("src/templates/Slicemaster.js"),
      context: {
        slug: master.slug.current,
      },
    });
  });

  const pageSize = parseInt(process.env.GATSBY_PAGE_SIZE);
  const pageCount = Math.ceil(data.masters.totalCount / pageSize);

  Array.from({ length: pageCount }).forEach((_, i) => {
    actions.createPage({
      path: `/slicemasters/${i + 1}`,
      component: path.resolve(`./src/pages/slicemasters.js`),
      context: {
        skip: i * pageSize,
        currentPage: i + 1,
        pageSize,
      },
    });
  });
}

export async function sourceNodes(params) {
  await Promise.all[fetchBeersandTurnIntoNodes(params)];
}

export async function createPages(params) {
  await Promise.all([
    turnPizzasIntoPages(params),
    turnToppingsIntoPages(params),
    turnSliceMastersIntoPages(params),
  ]);
}
