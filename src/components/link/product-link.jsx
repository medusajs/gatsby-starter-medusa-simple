/** @jsx jsx */
import { jsx } from "theme-ui";
import { Link } from "gatsby";
import { useRegion } from "../../hooks/useRegion";
import { toKebabCase } from "../../utils/to-kebab-case";

const ProductLink = ({ handle, ...rest }) => {
  const { region } = useRegion();
  const regionSlug = region ? `${toKebabCase(region.name)}/` : "";
  return <Link {...rest} to={`/${regionSlug}${handle}`} />;
};

export default ProductLink;
