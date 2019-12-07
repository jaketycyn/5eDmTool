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

const formikEnhancer = withFormik({
  mapPropsToValues: props => ({
    editorState: new EditorState.createEmpty(),
    npcFirstName: "",
    npcLastName: "",
    npcRace: "",
    npcGender: "",
    npcProfession: ""
  }),
  validationSchema: Yup.object({
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
      npcFirstName: values.npcFirstName,
      npcLastName: values.npcLastName,
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
        <option value="" label="Select a Race" />
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

      {/* <select
      id='npcSubRace'
      name='npcSubRace'
      type='input'
      onChange={handleChange}
      value={values.npcSubRace}
      >
        <option value='' label='subraces'/>


      </select> */}
      <label htmlFor="npcName">Name:</label>
      <Button
        id="npcName"
        name="npcName"
        type="button"
        onClick={e => {
          //find gender then race
          // *** MALE ***
          if (values.npcGender === "male") {
            if (values.npcRace === "dragonborn") {
              let randomFirstName =
                nameData.dragonborn.maleFirst[
                  Math.floor(
                    Math.random() * nameData.dragonborn.maleFirst.length
                  )
                ];

              let randomLastName =
                nameData.dragonborn.lastName[
                  Math.floor(
                    Math.random() * nameData.dragonborn.lastName.length
                  )
                ];

              setFieldValue("npcFirstName", randomFirstName);
              setFieldValue("npcLastName", randomLastName);
            } else if (values.npcRace === "dwarf") {
              if (values.npcRace === "dwarf") {
                let randomFirstName =
                  nameData.dwarf.maleFirst[
                    Math.floor(Math.random() * nameData.dwarf.maleFirst.length)
                  ];

                let randomLastName =
                  nameData.dwarf.lastName[
                    Math.floor(Math.random() * nameData.dwarf.lastName.length)
                  ];
                setFieldValue("npcFirstName", randomFirstName);
                setFieldValue("npcLastName", randomLastName);
              }
            } else if (values.npcRace === "elf") {
              if (values.npcRace === "elf") {
                let randomFirstName =
                  nameData.elf.maleFirst[
                    Math.floor(Math.random() * nameData.elf.maleFirst.length)
                  ];

                let randomLastName =
                  nameData.elf.lastName[
                    Math.floor(Math.random() * nameData.elf.lastName.length)
                  ];
                setFieldValue("npcFirstName", randomFirstName);
                setFieldValue("npcLastName", randomLastName);
              }
            } else if (values.npcRace === "gnome") {
              if (values.npcRace === "gnome") {
                let randomFirstName =
                  nameData.gnome.maleFirst[
                    Math.floor(Math.random() * nameData.gnome.maleFirst.length)
                  ];

                let randomLastName =
                  nameData.gnome.lastName[
                    Math.floor(Math.random() * nameData.gnome.lastName.length)
                  ];
                setFieldValue("npcFirstName", randomFirstName);
                setFieldValue("npcLastName", randomLastName);
              }
            } else if (values.npcRace === "goblin") {
              if (values.npcRace === "goblin") {
                let randomFirstName =
                  nameData.goblin.maleFirst[
                    Math.floor(Math.random() * nameData.goblin.maleFirst.length)
                  ];

                let randomLastName =
                  nameData.goblin.lastName[
                    Math.floor(Math.random() * nameData.goblin.lastName.length)
                  ];
                setFieldValue("npcFirstName", randomFirstName);
                setFieldValue("npcLastName", randomLastName);
              }
            } else if (values.npcRace === "halfElf") {
              if (values.npcRace === "halfElf") {
                let randomFirstName =
                  nameData.halfElf.maleFirst[
                    Math.floor(
                      Math.random() * nameData.halfElf.maleFirst.length
                    )
                  ];

                let randomLastName =
                  nameData.halfElf.lastName[
                    Math.floor(Math.random() * nameData.halfElf.lastName.length)
                  ];
                setFieldValue("npcFirstName", randomFirstName);
                setFieldValue("npcLastName", randomLastName);
              }
            } else if (values.npcRace === "halfling") {
              if (values.npcRace === "halfling") {
                let randomFirstName =
                  nameData.halfling.maleFirst[
                    Math.floor(
                      Math.random() * nameData.halfling.maleFirst.length
                    )
                  ];

                let randomLastName =
                  nameData.halfling.lastName.prefix[
                    Math.floor(
                      Math.random() * nameData.halfling.lastName.prefix.length
                    )
                  ] +
                  "" +
                  nameData.halfling.lastName.suffix[
                    Math.floor(
                      Math.random() * nameData.halfling.lastName.suffix.length
                    )
                  ];
                setFieldValue("npcFirstName", randomFirstName);
                setFieldValue("npcLastName", randomLastName);
              }
            } else if (values.npcRace === "halfOrc") {
              if (values.npcRace === "halfOrc") {
                let randomFirstName =
                  nameData.halfOrc.maleFirst[
                    Math.floor(
                      Math.random() * nameData.halfOrc.maleFirst.length
                    )
                  ];

                let randomLastName =
                  nameData.halfOrc.lastName[
                    Math.floor(Math.random() * nameData.halfOrc.lastName.length)
                  ];
                setFieldValue("npcFirstName", randomFirstName);
                setFieldValue("npcLastName", randomLastName);
              }
            } else if (values.npcRace === "human") {
              if (values.npcRace === "human") {
                let randomFirstName =
                  nameData.human.maleFirst[
                    Math.floor(Math.random() * nameData.human.maleFirst.length)
                  ];

                let randomLastName =
                  nameData.human.lastName[
                    Math.floor(Math.random() * nameData.human.lastName.length)
                  ];
                setFieldValue("npcFirstName", randomFirstName);
                setFieldValue("npcLastName", randomLastName);
              }
            } else if (values.npcRace === "orc") {
              if (values.npcRace === "orc") {
                let randomFirstName =
                  nameData.orc.maleFirst.prefix[
                    Math.floor(
                      Math.random() * nameData.orc.maleFirst.prefix.length
                    )
                  ] +
                  "'" +
                  nameData.orc.suffix[
                    Math.floor(Math.random() * nameData.orc.suffix.length)
                  ];

                let randomLastName =
                  nameData.orc.lastName[
                    Math.floor(Math.random() * nameData.orc.lastName.length)
                  ];
                setFieldValue("npcFirstName", randomFirstName);
                setFieldValue("npcLastName", randomLastName);
              }
            } else if (values.npcRace === "tiefling") {
              if (values.npcRace === "tiefling") {
                let randomFirstName =
                  nameData.tiefling.maleFirst[
                    Math.floor(
                      Math.random() * nameData.tiefling.maleFirst.length
                    )
                  ];

                let randomLastName =
                  nameData.tiefling.lastName[
                    Math.floor(
                      Math.random() * nameData.tiefling.lastName.length
                    )
                  ];
                setFieldValue("npcFirstName", randomFirstName);
                setFieldValue("npcLastName", randomLastName);
              }
            }
          }
          // *** FEMALE ***
          else if (values.npcGender === "female") {
            if (values.npcRace === "dragonborn") {
              let randomFirstName =
                nameData.dragonborn.femaleFirst[
                  Math.floor(
                    Math.random() * nameData.dragonborn.femaleFirst.length
                  )
                ];

              let randomLastName =
                nameData.dragonborn.lastName[
                  Math.floor(
                    Math.random() * nameData.dragonborn.lastName.length
                  )
                ];

              setFieldValue("npcFirstName", randomFirstName);
              setFieldValue("npcLastName", randomLastName);
            } else if (values.npcRace === "dwarf") {
              if (values.npcRace === "dwarf") {
                let randomFirstName =
                  nameData.dwarf.femaleFirst[
                    Math.floor(
                      Math.random() * nameData.dwarf.femaleFirst.length
                    )
                  ];

                let randomLastName =
                  nameData.dwarf.lastName[
                    Math.floor(Math.random() * nameData.dwarf.lastName.length)
                  ];
                setFieldValue("npcFirstName", randomFirstName);
                setFieldValue("npcLastName", randomLastName);
              }
            } else if (values.npcRace === "elf") {
              if (values.npcRace === "elf") {
                let randomFirstName =
                  nameData.elf.femaleFirst[
                    Math.floor(Math.random() * nameData.elf.femaleFirst.length)
                  ];

                let randomLastName =
                  nameData.elf.lastName[
                    Math.floor(Math.random() * nameData.elf.lastName.length)
                  ];
                setFieldValue("npcFirstName", randomFirstName);
                setFieldValue("npcLastName", randomLastName);
              }
            } else if (values.npcRace === "gnome") {
              if (values.npcRace === "gnome") {
                let randomFirstName =
                  nameData.gnome.femaleFirst[
                    Math.floor(
                      Math.random() * nameData.gnome.femaleFirst.length
                    )
                  ];

                let randomLastName =
                  nameData.gnome.lastName[
                    Math.floor(Math.random() * nameData.gnome.lastName.length)
                  ];
                setFieldValue("npcFirstName", randomFirstName);
                setFieldValue("npcLastName", randomLastName);
              }
            } else if (values.npcRace === "goblin") {
              if (values.npcRace === "goblin") {
                let randomFirstName =
                  nameData.goblin.femaleFirst[
                    Math.floor(
                      Math.random() * nameData.goblin.femaleFirst.length
                    )
                  ];

                let randomLastName =
                  nameData.goblin.lastName[
                    Math.floor(Math.random() * nameData.goblin.lastName.length)
                  ];
                setFieldValue("npcFirstName", randomFirstName);
                setFieldValue("npcLastName", randomLastName);
              }
            } else if (values.npcRace === "halfElf") {
              if (values.npcRace === "halfElf") {
                let randomFirstName =
                  nameData.halfElf.femaleFirst[
                    Math.floor(
                      Math.random() * nameData.halfElf.femaleFirst.length
                    )
                  ];

                let randomLastName =
                  nameData.halfElf.lastName[
                    Math.floor(Math.random() * nameData.halfElf.lastName.length)
                  ];
                setFieldValue("npcFirstName", randomFirstName);
                setFieldValue("npcLastName", randomLastName);
              }
            } else if (values.npcRace === "halfling") {
              if (values.npcRace === "halfling") {
                let randomFirstName =
                  nameData.halfling.femaleFirst[
                    Math.floor(
                      Math.random() * nameData.halfling.femaleFirst.length
                    )
                  ];

                let randomLastName =
                  nameData.halfling.lastName.prefix[
                    Math.floor(
                      Math.random() * nameData.halfling.lastName.prefix.length
                    )
                  ] +
                  "" +
                  nameData.halfling.lastName.suffix[
                    Math.floor(
                      Math.random() * nameData.halfling.lastName.suffix.length
                    )
                  ];
                setFieldValue("npcFirstName", randomFirstName);
                setFieldValue("npcLastName", randomLastName);
              }
            } else if (values.npcRace === "halfOrc") {
              if (values.npcRace === "halfOrc") {
                let randomFirstName =
                  nameData.halfOrc.femaleFirst[
                    Math.floor(
                      Math.random() * nameData.halfOrc.femaleFirst.length
                    )
                  ];

                let randomLastName =
                  nameData.halfOrc.lastName[
                    Math.floor(Math.random() * nameData.halfOrc.lastName.length)
                  ];
                setFieldValue("npcFirstName", randomFirstName);
                setFieldValue("npcLastName", randomLastName);
              }
            } else if (values.npcRace === "human") {
              if (values.npcRace === "human") {
                let randomFirstName =
                  nameData.human.femaleFirst[
                    Math.floor(
                      Math.random() * nameData.human.femaleFirst.length
                    )
                  ];

                let randomLastName =
                  nameData.human.lastName[
                    Math.floor(Math.random() * nameData.human.lastName.length)
                  ];
                setFieldValue("npcFirstName", randomFirstName);
                setFieldValue("npcLastName", randomLastName);
              }
            } else if (values.npcRace === "orc") {
              if (values.npcRace === "orc") {
                let randomFirstName =
                  nameData.orc.femaleFirst.prefix[
                    Math.floor(
                      Math.random() * nameData.orc.femaleFirst.prefix.length
                    )
                  ] +
                  "'" +
                  nameData.orc.suffix[
                    Math.floor(Math.random() * nameData.orc.suffix.length)
                  ];

                let randomLastName =
                  nameData.orc.lastName[
                    Math.floor(Math.random() * nameData.orc.lastName.length)
                  ];
                setFieldValue("npcFirstName", randomFirstName);
                setFieldValue("npcLastName", randomLastName);
              }
            } else if (values.npcRace === "tiefling") {
              if (values.npcRace === "tiefling") {
                let randomFirstName =
                  nameData.tiefling.femaleFirst[
                    Math.floor(
                      Math.random() * nameData.tiefling.femaleFirst.length
                    )
                  ];

                let randomLastName =
                  nameData.tiefling.lastName[
                    Math.floor(
                      Math.random() * nameData.tiefling.lastName.length
                    )
                  ];
                setFieldValue("npcFirstName", randomFirstName);
                setFieldValue("npcLastName", randomLastName);
              }
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
      </Button>
      <label htmlFor="npcFirstName">First</label>
      {touched.npcFirstName && errors.npcFirstName ? (
        <StyledErrorDiv>{errors.npcFirstName}</StyledErrorDiv>
      ) : null}
      <Field
        id="npcFirstName"
        name="npcFirstName"
        type="input"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.npcFirstName}
        locked={false}
        placeholder="First Name"
      />
      <label htmlFor="npcLastName">Last/Clan</label>
      {touched.npcLastName && errors.npcLastName ? (
        <StyledErrorDiv>{errors.npcLastName}</StyledErrorDiv>
      ) : null}
      <Field
        id="npcLastName"
        name="npcLastName"
        type="input"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.npcLastName}
        locked={false}
        placeholder="Last Name/ Clan Name"
      />
      {/* <Field
        id="npcNameMeaning"
        name="npcNameMeaning"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.npcNameMeaning}
      /> */}

      <label htmlFor="npcProfession">Profession</label>
      {touched.npcProfession && errors.npcProfession ? (
        <StyledErrorDiv>{errors.npcProfession}</StyledErrorDiv>
      ) : null}

      <Button
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
      </Button>
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
      <Button
        type="button"
        className="outline"
        onClick={handleReset}
        disabled={!dirty || isSubmitting}
      >
        Reset
      </Button>
      <Button type="submit" disabled={isSubmitting}>
        Submit
      </Button>
    </Form>
  );
};
const CharacterCreation = formikEnhancer(CharacterCreationForm);

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

const Button = styled.button`
  display: flex;
  background: #ffffff;
  color: #494949 !important;
  margin: 10px auto;
  padding: 10px;
  border: 4px solid #494949 !important;
  text-transform: uppercase;
  text-decoration: none;

  transition: all 0.4s ease 0s;

  :hover {
    background: #179940;
    color: #ffffff !important;
    border-color: #179940 !important;
    transition: all 0.4s ease 0s;
  }
`;
export default CharacterCreation;
