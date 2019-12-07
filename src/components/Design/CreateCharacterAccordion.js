import React from "react";
import useCollapse from "react-collapsed";
import styled from "styled-components";
import CharacterCreation from "../CharacterCreation";

//Look to formik-demo & rich-editor ccss for conflicts

const CreateCharacterAccordion = npc => {
  const { getCollapseProps, getToggleProps, isOpen } = useCollapse();
  return (
    <Wrapper>
      <Button {...getToggleProps()}>
        {isOpen ? "Collapse" : "Create New Character"}
      </Button>
      <div {...getCollapseProps()}>
        <CharacterCreation />
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div``;
const Button = styled.button`
  display: block;
  background: #ffffff;
  color: #494949 !important;
  font-size: 1em;
  font-weight: 700;
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

export default CreateCharacterAccordion;
