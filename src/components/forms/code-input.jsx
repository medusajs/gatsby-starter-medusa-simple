import React from "react";
import { Flex, Input, Button, Text } from "@theme-ui/components";

const CodeInput = ({
  name,
  placeholder,
  formik,
  isApplied,
  handleRemove,
  successText,
}) => {
  const { values, submitForm, handleChange, handleBlur } = formik;

  const handleSubmit = (e) => {
    e.preventDefault();
    submitForm();
  };

  return (
    <Flex
      sx={{
        border: "1px solid",
        borderColor: "faded",
        fontSize: [2],
      }}
    >
      {!isApplied ? (
        <Flex
          as="form"
          onSubmit={handleSubmit}
          sx={{
            width: "100%",
          }}
        >
          <Input
            variant="codeInput"
            name={name}
            defaultValue={values[name]}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder={placeholder}
          />
          <Button variant="add">+</Button>
        </Flex>
      ) : (
        <Flex
          sx={{
            width: "100%",
          }}
        >
          <Text
            sx={{
              flex: "1 0 auto",
              p: 2,
            }}
          >
            {successText}
          </Text>
          <Button variant="add" onClick={handleRemove}>
            &times;
          </Button>
        </Flex>
      )}
    </Flex>
  );
};

export default CodeInput;
