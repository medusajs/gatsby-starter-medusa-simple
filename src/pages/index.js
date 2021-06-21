import React, { useContext } from "react";
import { FaGithub } from "react-icons/fa";
import ItemDisplay from "../components/frontpage/ItemCard";
import Layout from "../components/layout/layout";
import StoreContext from "../context/store-context";
import { graphql } from "gatsby";

// markup
const IndexPage = ({ data }) => {
  const { products } = useContext(StoreContext);

  return (
    <Layout>
      <div>
        <div className="jumbotron flex-column justify-center align-center">
          <h1 className="big-heading">
            Medusa + Gatsby Starter{" "}
            <span role="img" aria-label="Rocket emoji">
              🚀
            </span>
          </h1>
          <span className="version-tag my-1">
            v{data.site.siteMetadata.version}
          </span>
          <div className="jumbotron-links">
            <a
              href="https://docs.medusa-commerce.com/"
              target="_blank"
              rel="noreferrer"
            >
              Documentation
            </a>
            <a
              href="https://github.com/medusajs/gatsby-starter-medusa"
              target="_blank"
              rel="noreferrer"
            >
              <span>
                GitHub
                <FaGithub />
              </span>
            </a>
          </div>
          <div className="product-section">
            <h2>Demo Products</h2>
            <div className="demo-products">
              {products &&
                products.map((p) => {
                  return (
                    <div key={p.id}>
                      <ItemDisplay {...p} />
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export const query = graphql`
  query VersionQuery {
    site {
      siteMetadata {
        version
      }
    }
  }
`;

export default IndexPage;
