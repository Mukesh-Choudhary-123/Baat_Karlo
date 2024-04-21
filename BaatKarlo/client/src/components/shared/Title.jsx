import React from "react";
import { Helmet } from "react-helmet-async";

const Title = ({
  title = "BaatKarlo",
  description = "This is the chat App called BaatKarlo",
}) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
    </Helmet>
  );
};

export default Title;
