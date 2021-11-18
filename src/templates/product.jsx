import React, { useEffect } from "react";
import { graphql, navigate } from "gatsby";
import { Button, Flex, Text } from "@theme-ui/components";
import ImageDisplay from "../components/product/images-display";

import styled from "@emotion/styled";
import { useProduct } from "../hooks/useProduct";
import { useCart } from "../hooks/useCart";
import { useRegion } from "../hooks/useRegion";
import { formatMoneyAmount } from "../utils/format-price";
import { toKebabCase } from "../utils/to-kebab-case";

const InformationContainer = styled(Flex)`
  flex-direction: column;
  flex: 1 0 auto;
  max-width: 50%;

  ${(props) => props.theme.bp.desktop} {
    padding-top: 20px;
    padding-left: 20px;
    padding-right: 20px;
    height: 100%;
  }

  ${(props) => props.theme.bp.largeDesktop} {
    padding-top: 40px;
    padding-left: 40px;
    padding-right: 40px;
  }

  ${(props) => props.theme.bp.hd} {
    padding-top: 80px;
    padding-left: 120px;
    padding-right: 80px;
  }
`;

const ValueContainer = styled(Flex)`
  margin: 1rem 0 1rem 0;

  button {
    margin-right: 0.5rem;
  }

  button:last-child {
    margin-right: 0;
  }
`;

const Product = ({ data, pageContext }) => {
  const { medusaProducts: product } = data;
  const { regionId, taxRate, currencyCode, handle } = pageContext;

  const {
    variant,
    options,
    quantity,
    actions: {
      updateOptions,
      increaseQuantity,
      decreaseQuantity,
      resetOptions,
    },
  } = useProduct(product);
  const {
    actions: { addItem },
  } = useCart();
  const { region } = useRegion();

  useEffect(() => {
    if (region && regionId !== region.id) {
      navigate(`/${toKebabCase(region.name)}/${handle}`);
    }
  }, [regionId, region, handle]);

  const price = variant
    ? variant.prices.find((p) => p.currency_code === currencyCode)
    : undefined;

  const handleAdd = async () => {
    await addItem({ variant_id: variant.id, quantity: quantity });
    resetOptions();
  };

  return (
    <Flex>
      <ImageDisplay images={product.images} productTitle={product.title} />
      <InformationContainer>
        <Flex
          sx={{
            flexDirection: "column",
          }}
        >
          <Text
            sx={{
              fontSize: [6],
              fontFamily: "body",
              fontWeight: 700,
              mb: 3,
            }}
          >
            {product.title}
          </Text>
          {price && (
            <Text
              variant="price"
              sx={{
                fontSize: [3, 4],
                fontWeight: 300,
              }}
            >
              {formatMoneyAmount(
                { amount: price.amount, currencyCode: price.currency_code },
                2,
                taxRate
              )}
            </Text>
          )}
        </Flex>
        <Text
          variant="description"
          sx={{
            my: 4,
          }}
        >
          {product.description}
        </Text>
        <Flex
          sx={{
            flexDirection: "column",
          }}
        >
          {product.options.map((option) => {
            return (
              <Flex
                key={option.id}
                sx={{
                  flexDirection: "column",
                  mb: 3,
                }}
              >
                <Text
                  sx={{
                    variant: "description",
                    fontWeight: "500",
                  }}
                >
                  {option.title}
                </Text>
                <ValueContainer>
                  {option.values.map((v) => {
                    return (
                      <Button
                        variant="option"
                        className={
                          options[option.id] === v.value ? "active" : ""
                        }
                        key={v.id}
                        onClick={() => updateOptions({ [option.id]: v.value })}
                      >
                        {v.value}
                      </Button>
                    );
                  })}
                </ValueContainer>
              </Flex>
            );
          })}
        </Flex>
        <Flex>
          <Flex
            sx={{
              alignItems: "center",
              border: "2px solid",
              borderColor: "royalBlue",
              borderRadius: "4px",
              height: "40px",
            }}
          >
            <Button variant="qty" onClick={decreaseQuantity}>
              –
            </Button>
            <Text
              sx={{
                width: 24,
                textAlign: "center",
              }}
            >
              {quantity}
            </Text>
            <Button variant="qty" onClick={increaseQuantity}>
              +
            </Button>
          </Flex>
          <Button
            sx={{
              ml: 2,
            }}
            onClick={handleAdd}
          >
            Add to cart
          </Button>
        </Flex>
      </InformationContainer>
    </Flex>
  );
};

export const query = graphql`
  query ($handle: String!) {
    medusaProducts(handle: { eq: $handle }) {
      title
      description
      options {
        id
        title
        values {
          id
          value
        }
      }
      variants {
        options {
          value
          option_id
          id
        }
        id
        title
        prices {
          amount
          currency_code
        }
      }
      images {
        image {
          childImageSharp {
            gatsbyImageData(placeholder: DOMINANT_COLOR)
          }
        }
      }
      thumbnail {
        childImageSharp {
          gatsbyImageData
        }
      }
    }
  }
`;

export default Product;
