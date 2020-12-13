import dotenv from "dotenv";

dotenv.config({ path: ".env" });

export default {
  siteMetadata: {
    title: "Stefans Slicks Slices",
    siteUrl: "https:pixaff.com",
    description: "Best pizza in town",
  },
  plugins: [
    "gatsby-plugin-styled-components",
    {
      resolve: "gatsby-source-sanity",
      options: {
        projectId: "mqocourb",
        dataset: "production",
        watchMode: true,
        token: process.env.SANITY_TOKEN,
      },
    },
  ],
};
