import React, { useEffect, useState } from "react";
import Medusa from "../../services/medusa";
import Layout from "../../components/layout/layout";
import { navigate } from "gatsby-link";
import ProductLayout from "../../components/product/productLayout";

const Item = ({ location }) => {
  const [product, setProduct] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const url = location.pathname.split("/");
    setLoading(true);
    if (url) {
      Medusa.products
        .retrieve(url[url.length - 1])
        .then(({ data }) => {
          setProduct(data.product);
          setLoading(false);
        })
        .catch((_e) => {
          setLoading(false);
          navigate("/404");
        });
    }
  }, [location.pathname]);

  return !loading && product ? (
    <Layout>
      <ProductLayout {...product} />
    </Layout>
  ) : null;
};

export default Item;
