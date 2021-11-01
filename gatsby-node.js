const toKebabCase = (str) =>
  str &&
  str
    .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    .map((x) => x.toLowerCase())
    .join("-");

exports.createPages = async function ({ actions, graphql }) {
  const { data } = await graphql(`
    query {
      allMedusaRegions {
        edges {
          node {
            name
            currency_code
            id
            tax_rate
          }
        }
      }
      allMedusaProducts {
        edges {
          node {
            handle
          }
        }
      }
    }
  `);

  data.allMedusaRegions.edges.forEach((edge) => {
    const { id, name, currency_code, tax_rate } = edge.node;
    const kebabCasedName = toKebabCase(name);

    data.allMedusaProducts.edges.forEach((edge) => {
      const handle = edge.node.handle;
      actions.createPage({
        path: `${kebabCasedName}/${handle}`,
        component: require.resolve(`./src/templates/product.jsx`),
        context: {
          handle: handle,
          regionId: id,
          currencyCode: currency_code,
          taxRate: tax_rate,
        },
      });
    });
  });
};
