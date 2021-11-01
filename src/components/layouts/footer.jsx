import React from "react";
import { Grid, Box, Flex, Text } from "@theme-ui/components";
import Link from "../link/nav-link";
import { useStaticQuery, graphql } from "gatsby";

const Footer = () => {
  const {
    allMarkdownRemark: { edges },
  } = useStaticQuery(graphql`
    {
      allMarkdownRemark(sort: { fields: frontmatter___title }) {
        edges {
          node {
            frontmatter {
              slug
              title
            }
          }
        }
      }
    }
  `);

  return (
    <Box as="footer">
      <Grid
        sx={{
          display: "grid",
          gridTemplateRows: "repeat(4, 32px)",
          gridTemplateColumns: ["repeat(2, 1fr)", "repeat(4, 1fr)"],
          gridAutoFlow: "column",
          px: 4,
          py: 4,
        }}
      >
        {edges
          ? edges.map((edge, i) => {
              const {
                node: {
                  frontmatter: { slug, title },
                },
              } = edge;
              return (
                <Link
                  key={i}
                  to={slug}
                  sx={{ variant: "styles.navlink", p: 2 }}
                >
                  {title}
                </Link>
              );
            })
          : null}
      </Grid>
    </Box>
  );
};

export default Footer;
