import { graphql, useStaticQuery } from "gatsby";

export const useGetAllCountries = () => {
  const {
    allMedusaRegions: { edges },
  } = useStaticQuery(graphql`
    {
      allMedusaRegions {
        edges {
          node {
            countries {
              id
              display_name
              iso_2
              name
              region_id
            }
          }
        }
      }
    }
  `);

  const nodes = edges.map((edge) => edge.node.countries);
  const countries = [].concat(...nodes);

  return countries;
};
