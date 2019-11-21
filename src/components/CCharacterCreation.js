import React from "react";
import { Formik, Form, Field, FieldArray } from "formik";

const CCharacterCreation = () => (
  <div>
    <h1>My Form</h1>
    <Formik
      initialValues={{
        charName: "Geldrem",
        charRace: "",
        charProfession: ""
      }}
      onSubmit={(data, { setSubmitting, resetForm }) => {
        setSubmitting(true);
        // make async call

        console.log("submit:", data);
        setSubmitting(false);
      }}
    >
      {({
        values,
        isSubmitting,
        resetForm,
        handleChange,
        handleBlur,
        handleSubmit
      }) => (
        <Form>
          {/* May need to add TextField from material ui or make your own to add to Field as={TextField}
            This will allow handleChange handleBlur, etc to be passed to the Fields. */}
          <Field name="charName" type="input" />
          <Field name="charRace" type="input" />
          <Field name="charProfession" type="input" />

          <button disabled={isSubmitting} type="submit">
            submit
          </button>
          <pre>{JSON.stringify(values, null, 2)}</pre>
        </Form>
      )}
    </Formik>
  </div>
);

export default CCharacterCreation;
