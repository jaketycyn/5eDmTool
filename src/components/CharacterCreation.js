import "./formik-demo.css";
import "./rich-editor.css";
import React from "react";
import { withFormik, Form, Field } from "formik";
import { EditorState } from "draft-js";
import { RichEditorExample } from "./RichEditor";
import { db } from "./Firebase";
import styled from "styled-components";
import { stateToHTML } from "draft-js-export-html";
import {
  maleDragonbornNames,
  femaleDragonbornNames,
  maleDwarfNames,
  femaleDwarfNames,
  maleElfNames,
  femaleElfNames,
  maleGnomeNames,
  femaleGnomeNames,
  maleHalfElfNames,
  femaleHalfElfNames,
  maleHalfOrcNames,
  femaleHalfOrcNames,
  maleGoblinNames
} from "../Data/names";
import { npcProfessions } from "../Data/professions";

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
    npcGender: "",
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
  handleSubmit: (values, { setSubmitting, resetForm }) => {
    // you probably want to transform draftjs state to something else, but I'll leave that to you.

    const htmlConverted = stateToHTML(values.editorState.getCurrentContent());
    db.collection("Npc").add({
      npcName: values.npcName,
      npcRace: values.npcRace,
      npcGender: values.npcGender,
      npcProfession: values.npcProfession,
      editorState: htmlConverted
    });
    alert("Character Created");
  },
  handleChange: e => {},
  displayName: "MyForm"
});

// const maleDwarfNames = [
//   "Medon Orlar",
//   "Jukel Carridin",
//   "Beragor Hamunt",
//   "Pyrdel Forras",
//   "Telinar Ero",
//   "Gerlin Iban"
// ];

//learn context so you can send this all down for easier callbacks
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
  isSubmitting
  // *** check those two later and add them/remove ***
  // resetForm,
  // setFieldTouched
}) => {
  return (
    <Form onSubmit={handleSubmit}>
      <label htmlFor="npcGender">Gender</label>
      {touched.npcGender && errors.npcGender ? (
        <StyledErrorDiv>{errors.npcGender}</StyledErrorDiv>
      ) : null}
      <select
        id="npcGender"
        name="npcGender"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.npcGender}
      >
        <option value="" label="Select a Gender" />
        <option value="Female" label="Female" />
        <option value="Male" label="Male" />
      </select>
      <label htmlFor="npcRace">Race</label>
      {touched.npcRace && errors.npcRace ? (
        <StyledErrorDiv>{errors.npcRace}</StyledErrorDiv>
      ) : null}
      <select
        id="npcRace"
        name="npcRace"
        type="input"
        onChange={handleChange}
        value={values.npcRace}
        // style={{ display: "block" }}
      >
        <option value="" label="Select a color" />
        <option value="Dragonborn" label="Dragonborn" />
        <option value="Dwarf" label="Dwarf" />
        <option value="Elf" label="Elf" />
        <option value="Gnome" label="Gnome" />
        <option value="Goblin" label="Goblin" />
        <option value="Half-Elf" label="Half-Elf" />
        <option value="Halfling" label="Halfling" />
        <option value="Half-Orc" label="Half-Orc" />
        <option value="Human" label="Human" />
        <option value="Orc" label="Orc" />
        <option value="Tiefling" label="Tiefling" />
      </select>
      <label htmlFor="npcName">Name</label>
      {touched.npcName && errors.npcName ? (
        <StyledErrorDiv>{errors.npcName}</StyledErrorDiv>
      ) : null}
      <button
        id="npcName"
        name="npcName"
        type="button"
        value={values.npcName}
        onClick={e => {
          //find gender then race
          // *** MALE ***
          if (values.npcGender === "Male") {
            if (values.npcRace === "Dragonborn") {
              let randomName =
                maleDragonbornNames[
                  Math.floor(Math.random() * maleDragonbornNames.length)
                ];
              setFieldValue("npcName", randomName);
            } else if (values.npcRace === "Dwarf") {
              let randomName =
                maleDwarfNames[
                  Math.floor(Math.random() * maleDwarfNames.length)
                ];
              setFieldValue("npcName", randomName);
            } else if (values.npcRace === "Elf") {
              let randomName =
                maleElfNames[Math.floor(Math.random() * maleElfNames.length)];
              setFieldValue("npcName", randomName);
            } else if (values.npcRace === "Gnome") {
              let randomName =
                maleGnomeNames[
                  Math.floor(Math.random() * maleGnomeNames.length)
                ];
              setFieldValue("npcName", randomName);
            } else if (values.npcRace === "Goblin") {
              let randomName =
                maleGoblinNames[
                  Math.floor(Math.random() * maleGoblinNames.length)
                ];
              setFieldValue("npcName", randomName);
            } else if (values.npcRace === "Half-Elf") {
              let randomName =
                maleHalfElfNames[
                  Math.floor(Math.random() * maleHalfElfNames.length)
                ];
              setFieldValue("npcName", randomName);
            } else if (values.npcRace === "Elf") {
              let randomName =
                maleElfNames[Math.floor(Math.random() * maleElfNames.length)];
              setFieldValue("npcName", randomName);
            } else if (values.npcRace === "Elf") {
              let randomName =
                maleElfNames[Math.floor(Math.random() * maleElfNames.length)];
              setFieldValue("npcName", randomName);
            } else if (values.npcRace === "Elf") {
              let randomName =
                maleElfNames[Math.floor(Math.random() * maleElfNames.length)];
              setFieldValue("npcName", randomName);
            }
          }
          // *** FEMALE ***
          else if (values.npcGender === "Female") {
            if (values.npcRace === "Dwarf") {
              let randomName =
                femaleDwarfNames[
                  Math.floor(Math.random() * femaleDwarfNames.length)
                ];
              setFieldValue("npcName", randomName);
            } else if (values.npcRace === "Elf") {
              let randomName =
                femaleElfNames[
                  Math.floor(Math.random() * femaleElfNames.length)
                ];
              setFieldValue("npcName", randomName);
            }
          } else {
            setFieldValue(
              "npcName",
              "Choose a race and gender to get an appropriate name"
            );
          }

          // } else {
          //   let randomName =
          //     femaleDwarfNames[
          //       Math.floor(Math.random() * femaleDwarfNames.length)
          //     ];
          //   setFieldValue("npcName", randomName);
          // }
          // //Elf
          // if (values.npcRace === "Elf" && values.npcGender === "Male") {
          //   let randomName =
          //     maleElfNames[Math.floor(Math.random() * maleElfNames.length)];
          //   setFieldValue("npcName", randomName);
          // } else {
          //   let randomName =
          //     femaleElfNames[Math.floor(Math.random() * femaleElfNames.length)];
          //   setFieldValue("npcName", randomName);
          // }
        }}
        //
        onBlur={handleBlur}
      >
        Random
      </button>
      <Field
        id="npcName"
        name="npcName"
        type="input"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.npcName}
      />

      <label htmlFor="npcProfession">Profession</label>
      {touched.npcProfession && errors.npcProfession ? (
        <StyledErrorDiv>{errors.npcProfession}</StyledErrorDiv>
      ) : null}

      <button
        id="npcProfession"
        name="npcProfession"
        type="button"
        value={values.Profession}
        onClick={e => {
          const randomProfession =
            npcProfessions[Math.floor(Math.random() * npcProfessions.length)];

          setFieldValue("npcProfession", randomProfession);
        }}
        onBlur={handleBlur}
      >
        Random
      </button>
      <Field
        id="npcProfession"
        name="npcProfession"
        type="input"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.npcProfession}
      />
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
};
const CharacterCreation = formikEnhancer(CharacterCreationForm);

export default CharacterCreation;
