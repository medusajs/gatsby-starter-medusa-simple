import { Input } from "@theme-ui/components";
import React, { useState, useEffect } from "react";

const Field = ({
  formik,
  defaultValue,
  name,
  placeholder,
  type = "text",
  readOnly = false,
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
      readOnly={readOnly}
      sx={{
        borderColor: error
          ? "pinkSalmon"
          : readOnly
          ? "medusaGreen"
          : "royalBlue",
        transition: "all .2s linear",
        borderRadius: "8px",
        minHeight: "40px",
        ...sx,
      }}
    />
  );
};

export default Field;
