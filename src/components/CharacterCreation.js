import "./formik-demo.css";
import "./rich-editor.css";
import React from "react";
import { withFormik, Form, Field } from "formik";
import { EditorState } from "draft-js";
import { RichEditorExample } from "./RichEditor";
import { db } from "./Firebase";
import styled from "styled-components";
import { stateToHTML } from "draft-js-export-html";
import { nameData } from "../Data/names";
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
        <option value="female" label="Female" />
        <option value="male" label="Male" />
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
        <option value="dragonborn" label="Dragonborn" />
        <option value="dwarf" label="Dwarf" />
        <option value="elf" label="Elf" />
        <option value="gnome" label="Gnome" />
        <option value="goblin" label="Goblin" />
        <option value="halfElf" label="Half-Elf" />
        <option value="halfling" label="Halfling" />
        <option value="halfOrc" label="Half-Orc" />
        <option value="human" label="Human" />
        <option value="orc" label="Orc" />
        <option value="tiefling" label="Tiefling" />
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
          if (values.npcGender === "male") {
            if (values.npcRace === "dragonborn") {
              let randomName =
                nameData.dragonborn.maleFirst[
                  Math.floor(
                    Math.random() * nameData.dragonborn.maleFirst.length
                  )
                ] +
                " " +
                nameData.dragonborn.lastName[
                  Math.floor(
                    Math.random() * nameData.dragonborn.lastName.length
                  )
                ];
              setFieldValue("npcName", randomName);
            } else if (values.npcRace === "dwarf") {
              let randomName =
                nameData.dwarf.maleFirst[
                  Math.floor(Math.random() * nameData.dwarf.maleFirst.length)
                ] +
                " " +
                nameData.dwarf.lastName[
                  Math.floor(Math.random() * nameData.dwarf.lastName.length)
                ];
              setFieldValue("npcName", randomName);
            } else if (values.npcRace === "elf") {
              let randomName =
                nameData.elf.maleFirst[
                  Math.floor(Math.random() * nameData.elf.maleFirst.length)
                ] +
                " " +
                nameData.elf.lastName[
                  Math.floor(Math.random() * nameData.elf.lastName.length)
                ];
              setFieldValue("npcName", randomName);
            } else if (values.npcRace === "gnome") {
              let randomName =
                nameData.gnome.maleFirst[
                  Math.floor(Math.random() * nameData.gnome.maleFirst.length)
                ] +
                " " +
                nameData.gnome.lastName[
                  Math.floor(Math.random() * nameData.gnome.lastName.length)
                ];
              setFieldValue("npcName", randomName);
            } else if (values.npcRace === "goblin") {
              let randomName =
                nameData.goblin.maleFirst[
                  Math.floor(Math.random() * nameData.goblin.maleFirst.length)
                ] +
                " " +
                nameData.goblin.lastName[
                  Math.floor(Math.random() * nameData.goblin.lastName.length)
                ];
              setFieldValue("npcName", randomName);
            } else if (values.npcRace === "halfElf") {
              let randomName =
                nameData.halfElf.maleFirst[
                  Math.floor(Math.random() * nameData.halfElf.maleFirst.length)
                ] +
                " " +
                nameData.halfElf.lastName[
                  Math.floor(Math.random() * nameData.halfElf.lastName.length)
                ];
              setFieldValue("npcName", randomName);
            } else if (values.npcRace === "halfling") {
              let randomName =
                nameData.halfling.maleFirst[
                  Math.floor(Math.random() * nameData.halfling.maleFirst.length)
                ] +
                " " +
                nameData.halfling.lastName[
                  Math.floor(Math.random() * nameData.halfling.lastName.length)
                ];
              setFieldValue("npcName", randomName);
            } else if (values.npcRace === "halfOrc") {
              let randomName =
                nameData.halfOrc.maleFirst[
                  Math.floor(Math.random() * nameData.halfOrc.maleFirst.length)
                ] +
                " " +
                nameData.halfOrc.lastName[
                  Math.floor(Math.random() * nameData.halfOrc.lastName.length)
                ];
              setFieldValue("npcName", randomName);
            } else if (values.npcRace === "human") {
              let randomName =
                nameData.human.maleFirst[
                  Math.floor(Math.random() * nameData.human.maleFirst.length)
                ] +
                " " +
                nameData.human.lastName[
                  Math.floor(Math.random() * nameData.human.lastName.length)
                ];
              setFieldValue("npcName", randomName);
            } else if (values.npcRace === "orc") {
              let randomName =
                nameData.orc.maleFirst[
                  Math.floor(Math.random() * nameData.orc.maleFirst.length)
                ] +
                " " +
                nameData.orc.lastName[
                  Math.floor(Math.random() * nameData.orc.lastName.length)
                ];
              setFieldValue("npcName", randomName);
            } else if (values.npcRace === "tiefling") {
              let randomName =
                nameData.tiefling.maleFirst[
                  Math.floor(Math.random() * nameData.tiefling.maleFirst.length)
                ] +
                " " +
                nameData.tiefling.lastName[
                  Math.floor(Math.random() * nameData.tiefling.lastName.length)
                ];
              setFieldValue("npcName", randomName);
            }
          }

          // *** FEMALE ***
          else if (values.npcGender === "female") {
            if (values.npcRace === "dragonborn") {
              let randomName =
                nameData.dragonborn.femaleFirst[
                  Math.floor(
                    Math.random() * nameData.dragonborn.femaleFirst.length
                  )
                ] +
                " " +
                nameData.dragonborn.lastName[
                  Math.floor(
                    Math.random() * nameData.dragonborn.lastName.length
                  )
                ];
              setFieldValue("npcName", randomName);
            } else if (values.npcRace === "dwarf") {
              let randomName =
                nameData.dwarf.femaleFirst[
                  Math.floor(Math.random() * nameData.dwarf.femaleFirst.length)
                ] +
                " " +
                nameData.dwarf.lastName[
                  Math.floor(Math.random() * nameData.dwarf.lastName.length)
                ];
              setFieldValue("npcName", randomName);
            } else if (values.npcRace === "elf") {
              let randomName =
                nameData.elf.femaleFirst[
                  Math.floor(Math.random() * nameData.elf.femaleFirst.length)
                ] +
                " " +
                nameData.elf.lastName[
                  Math.floor(Math.random() * nameData.elf.lastName.length)
                ];
              setFieldValue("npcName", randomName);
            } else if (values.npcRace === "gnome") {
              let randomName =
                nameData.gnome.femaleFirst[
                  Math.floor(Math.random() * nameData.gnome.femaleFirst.length)
                ] +
                " " +
                nameData.gnome.lastName[
                  Math.floor(Math.random() * nameData.gnome.lastName.length)
                ];
              setFieldValue("npcName", randomName);
            } else if (values.npcRace === "goblin") {
              let randomName =
                nameData.goblin.femaleFirst[
                  Math.floor(Math.random() * nameData.goblin.femaleFirst.length)
                ] +
                " " +
                nameData.goblin.lastName[
                  Math.floor(Math.random() * nameData.goblin.lastName.length)
                ];
              setFieldValue("npcName", randomName);
            } else if (values.npcRace === "halfElf") {
              let randomName =
                nameData.halfElf.femaleFirst[
                  Math.floor(
                    Math.random() * nameData.halfElf.femaleFirst.length
                  )
                ] +
                " " +
                nameData.halfElf.lastName[
                  Math.floor(Math.random() * nameData.halfElf.lastName.length)
                ];
              setFieldValue("npcName", randomName);
            } else if (values.npcRace === "halfling") {
              let randomName =
                nameData.halfling.femaleFirst[
                  Math.floor(
                    Math.random() * nameData.halfling.femaleFirst.length
                  )
                ] +
                " " +
                nameData.halfling.lastName[
                  Math.floor(Math.random() * nameData.halfling.lastName.length)
                ];
              setFieldValue("npcName", randomName);
            } else if (values.npcRace === "halfOrc") {
              let randomName =
                nameData.halfOrc.femaleFirst[
                  Math.floor(
                    Math.random() * nameData.halfOrc.femaleFirst.length
                  )
                ] +
                " " +
                nameData.halfOrc.lastName[
                  Math.floor(Math.random() * nameData.halfOrc.lastName.length)
                ];
              setFieldValue("npcName", randomName);
            } else if (values.npcRace === "human") {
              let randomName =
                nameData.human.femaleFirst[
                  Math.floor(Math.random() * nameData.human.femaleFirst.length)
                ] +
                " " +
                nameData.human.lastName[
                  Math.floor(Math.random() * nameData.human.lastName.length)
                ];
              setFieldValue("npcName", randomName);
            } else if (values.npcRace === "orc") {
              let randomName =
                nameData.orc.femaleFirst[
                  Math.floor(Math.random() * nameData.orc.femaleFirst.length)
                ] +
                " " +
                nameData.orc.lastName[
                  Math.floor(Math.random() * nameData.orc.lastName.length)
                ];
              setFieldValue("npcName", randomName);
            } else if (values.npcRace === "tiefling") {
              let randomName =
                nameData.tiefling.femaleFirst[
                  Math.floor(
                    Math.random() * nameData.tiefling.femaleFirst.length
                  )
                ] +
                " " +
                nameData.tiefling.lastName[
                  Math.floor(Math.random() * nameData.tiefling.lastName.length)
                ];
              setFieldValue("npcName", randomName);
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
          }
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
