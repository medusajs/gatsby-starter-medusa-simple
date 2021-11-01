import { Box, Select } from "@theme-ui/components";
import { useStaticQuery, graphql } from "gatsby";
import React from "react";
import { useRegion } from "../../../hooks/useRegion";

const RegionSelector = (props) => {
  const {
    allMedusaRegions: { edges },
  } = useStaticQuery(graphql`
    {
      allMedusaRegions {
        edges {
          node {
            id
            name
            countries {
              iso_2
              display_name
            }
          }
        }
      }
    }
  `);

  const { region, updateRegion } = useRegion();

  const handleChange = (e) => {
    const { node } = edges.find((edge) => edge.node.id === e.target.value);
    updateRegion(node);
  };

  return (
    <Box
      {...props}
      sx={{
        "& select": {
          mr: "2rem",
        },
        ...props.sx,
      }}
    >
      <Select
        value={region?.id}
        onChange={handleChange}
        sx={{
          border: "none",
          textAlign: "right",
        }}
      >
        {edges.map((edge) => {
          return (
            <option value={edge.node.id} key={edge.node.id}>
              {edge.node.name}
            </option>
          );
        })}
      </Select>
    </Box>
  );
};

export default RegionSelector;
