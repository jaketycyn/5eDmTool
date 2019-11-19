import "./formik-demo.css";
import "./rich-editor.css";
import React from "react";
import { withFormik, Form } from "formik";
import { EditorState } from "draft-js";
import { RichEditorExample } from "./RichEditor";
import { db } from "./Firebase";
import styled from "styled-components";
import { stateToHTML } from "draft-js-export-html";

// *** addd yup if validation is requierd ***
import * as Yup from "yup";

const StyledErrorDiv = styled.div`
  color: red;
  transition: all 0.1s;
  padding: 0rem 2rem
  font-size: 1.2rem;
  font-weight: 500;
  bottom: 0;
  left: 0;
  positon: absolute;
`;

const formikEnhancer = withFormik({
  mapPropsToValues: props => ({
    editorState: new EditorState.createEmpty(),
    npcName: "",
    npcRace: "",
    npcProfession: ""
  }),
  validationSchema: Yup.object({
    npcName: Yup.string()
      .max(30, "Must be 30 characters or less")
      .required("Required"),
    npcRace: Yup.string()
      .max(20, "Must be 20 characters or less")
      .required("Required"),
    npcProfession: Yup.string()
      .max(30, "Must be 30 characters or less")
      .required("Required")
  }),
  handleSubmit: (values, { setSubmitting }) => {
    // you probably want to transform draftjs state to something else, but I'll leave that to you.
    const htmlConverted = stateToHTML(values.editorState.getCurrentContent());
    db.collection("Npc").add({
      npcName: values.npcName,
      npcRace: values.npcRace,
      npcProfession: values.npcProfession,
      editorState: htmlConverted
    });
    resetForm({});
  },
  handleChange: e => {
    console.log(e.target.value);
  },
  displayName: "MyForm"
});

const CharacterCreationForm = ({
  values,
  touched,
  dirty,
  errors,
  handleChange,
  handleBlur,
  handleSubmit,
  handleReset,
  setFieldValue,
  isSubmitting,
  setFieldTouched
}) => (
  <Form onSubmit={handleSubmit}>
    <label htmlFor="npcName">Name</label>
    <input
      id="npcName"
      name="npcName"
      type="text"
      onChange={handleChange}
      onBlur={handleBlur}
      value={values.npcName}
    />
    {touched.npcName && errors.npcName ? (
      <StyledErrorDiv>{errors.npcName}</StyledErrorDiv>
    ) : null}
    <label htmlFor="npcRace">Race</label>
    <input
      id="npcRace"
      name="npcRace"
      type="text"
      onChange={handleChange}
      onBlur={handleBlur}
      value={values.npcRace.value}
    />
    {touched.npcRace && errors.npcRace ? (
      <StyledErrorDiv>{errors.npcRace}</StyledErrorDiv>
    ) : null}
    <label htmlFor="npcProfession">Profession</label>
    <input
      id="npcProfession"
      name="npcProfession"
      type="text"
      onChange={handleChange}
      onBlur={handleBlur}
      value={values.npcProfession}
    />
    {touched.npcProfession && errors.npcProfession ? (
      <StyledErrorDiv>{errors.npcProfession}</StyledErrorDiv>
    ) : null}
    <label style={{ display: "block", marginTop: ".5rem" }}>
      Character Info
    </label>
    <RichEditorExample
      editorState={values.editorState}
      onChange={setFieldValue}
      onBlur={handleBlur}
    />
    <button
      type="button"
      className="outline"
      onClick={handleReset}
      disabled={!dirty || isSubmitting}
    >
      Reset
    </button>
    <button type="submit" disabled={isSubmitting}>
      Submit
    </button>
  </Form>
);

const CharacterCreation = formikEnhancer(CharacterCreationForm);

export default CharacterCreation;
