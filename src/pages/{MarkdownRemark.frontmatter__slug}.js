import { Box, Flex, Heading } from "@theme-ui/components";
import { graphql } from "gatsby";
import * as React from "react";

export default function PostTemplate({ data: { markdownRemark } }) {
  const { frontmatter, html } = markdownRemark;
  return (
    <Flex
      as="main"
      sx={{
        minHeight: "calc(100vh - 100px)",
        justifyContent: "center",
        pt: 5,
      }}
    >
      <Flex
        sx={{
          flexDirection: "column",
          maxWidth: "500px",
        }}
      >
        <Heading as="h1">{frontmatter.title}</Heading>
        <Box
          sx={{
            lineHeight: "body",
          }}
          className="post-body"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </Flex>
    </Flex>
  );
}

export const pageQuery = graphql`
  query ($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
      }
    }
  }
`;
