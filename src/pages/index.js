import React, { useContext } from "react";
import { FaGithub } from "react-icons/fa";
import StoreContext from "../context/store-context";
import { graphql } from "gatsby";
import * as styles from "../styles/home.module.css";
import { Link } from "gatsby";
import { formatPrices } from "../utils/format-price";

// markup
const IndexPage = ({ data }) => {
  const { cart, products } = useContext(StoreContext);

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div className={styles.hero}>
          <h1 className={styles.title}>
            Medusa + Gatsby Starter{" "}
            <span role="img" aria-label="Rocket emoji">
              🚀
            </span>
          </h1>
          <p className={styles.description}>
            Build blazing-fast client applications on top of a modular headless
            commerce engine. Integrate seamlessly with any 3rd party tools for a
            best-in-breed commerce stack.
          </p>
          <div className={styles.tags}>
            <div className={styles.tag} style={{ background: "lightgrey" }}>
              v{data.site.siteMetadata.version}
            </div>
            <a
              href="https://www.medusa-commerce.com/"
              arget="_blank"
              rel="noreferrer"
              role="button"
            >
              <div
                className={styles.tag}
                style={{ background: "var(--logo-color-900)", color: "white" }}
              >
                Medusa
              </div>
            </a>
            <a
              href="https://www.gatsbyjs.com/docs/"
              target="_blank"
              rel="noreferrer"
              role="button"
            >
              <div
                className={styles.tag}
                style={{ background: "#5e3a94", color: "white" }}
              >
                Gatsby
              </div>
            </a>
            <a
              href="https://stripe.com/docs"
              target="_blank"
              rel="noreferrer"
              role="button"
            >
              <div
                className={styles.tag}
                style={{ background: "#4379FF", color: "white" }}
              >
                Stripe
              </div>
            </a>
          </div>
          <div className={styles.links}>
            <a
              href="https://docs.medusa-commerce.com/"
              target="_blank"
              rel="noreferrer"
              role="button"
              className={styles.btn}
            >
              Read the docs
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 24 24"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"></path>
              </svg>
            </a>
            <a
              href="https://github.com/medusajs/nextjs-starter-medusa"
              target="_blank"
              rel="noreferrer"
              role="button"
              className={styles.btn}
            >
              View on GitHub
              <FaGithub />
            </a>
          </div>
        </div>
        <div className={styles.products}>
          <h2>Demo Products</h2>
          <div className={styles.grid}>
            {products &&
              products.map((p) => {
                return (
                  <div key={p.id} className={styles.card}>
                    <Link to={`/product/${p.id}`}>
                      <div>
                        <h2>{p.title}</h2>
                        <p>{formatPrices(cart, p.variants[0])}</p>
                      </div>
                    </Link>
                  </div>
                );
              })}
          </div>
        </div>
      </main>
    </div>
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
