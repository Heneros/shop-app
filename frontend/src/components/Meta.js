const { Helmet } = require("react-helmet-async");


const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keyword" content={keywords} />
    </Helmet>
  );
};

Meta.defaultProps = {
    title: "Shop Project",
    description: "Site created on MERN about ecommerce.",
    keywords: "Shop, MERN, React, ecommerce"
}

export default Meta;