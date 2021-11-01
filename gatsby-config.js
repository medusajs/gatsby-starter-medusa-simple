module.exports = {
  siteMetadata: {
    title: "gatsby-starter-medusa",
    version: "1.0.0",
  },
  plugins: [
    "gatsby-plugin-image",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: "./src/images/",
      },
      __key: "images",
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `blog`,
        path: `${__dirname}/src/markdown-pages`,
      },
    },
    `gatsby-transformer-remark`,
    {
      resolve: "gatsby-source-medusa",
      options: {
        storeUrl: "http://localhost:9000",
      },
    },
    "gatsby-plugin-theme-ui",
  ],
};
