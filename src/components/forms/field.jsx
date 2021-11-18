import { Input } from "@theme-ui/components";
import React, { useState, useEffect } from "react";

const Field = ({
  formik,
  defaultValue,
  name,
  placeholder,
  type = "text",
  sx = {},
}) => {
  const [error, setError] = useState(false);

  useEffect(() => {
    if (formik.errors[name] && formik.touched[name]) {
      setError(true);
    } else {
      setError(false);
    }
  }, [formik.errors]);

  return (
    <Input
      type={type}
      defaultValue={defaultValue}
      name={name}
      onBlur={formik.handleBlur}
      onChange={formik.handleChange}
      placeholder={placeholder}
      sx={{
        variant: "forms.underlined",
        ...sx,
      }}
    />
  );
};

export default Field;
