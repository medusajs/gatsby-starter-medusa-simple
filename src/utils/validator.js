import * as Yup from "yup";

const InformationSchema = Yup.object({
  email: Yup.string().email().required(),
  first_name: Yup.string().required(),
  last_name: Yup.string().required(),
  address_1: Yup.string().required(),
  address_2: Yup.string().optional(),
  city: Yup.string().required(),
  postal_code: Yup.string().required(),
  country_code: Yup.string().required(),
  province: Yup.string().optional(),
  phone: Yup.string().required(),
});

const ShippingSchema = Yup.object({
  option_id: Yup.string().required(),
});

const NewPasswordSchema = Yup.object({
  new_password: Yup.string().required(),
  confirm_password: Yup.string()
    .oneOf([Yup.ref("new_password"), null], "Passwords don't match")
    .required(),
});

const OrderRetrievalSchema = Yup.object({
  display_id: Yup.string().required(),
  email: Yup.string().email().required(),
});

export const Validator = {
  checkout: {
    InformationSchema,
    ShippingSchema,
  },
  returns: {
    OrderRetrievalSchema,
  },
  account: {
    NewPasswordSchema,
  },
};
