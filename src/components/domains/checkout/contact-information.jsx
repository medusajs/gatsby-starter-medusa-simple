import React from "react"
import Field from "../forms/field"

const ContactInformation = ({ controller }) => {
  return (
    <div>
      <h2>Contact information</h2>
      <Field
        label="Email"
        type="email"
        className="mt-4"
        autocomplete="email"
        name="email"
        formik={controller}
        defaultValue={controller.values.email}
      />
    </div>
  )
}

export default ContactInformation
