import React from "react";
import useCollapse from "react-collapsed";
import styled from "styled-components";
import CharacterCreation from "../CharacterCreation";

//Look to formik-demo & rich-editor ccss for conflicts
const Wrapper = styled.div``;
const Button = styled.button`
  display: block;
  margin: 10px auto;
  background: lightblue;
  white-space: nowrap;
  text-align: center;

  :hover {
    background: red;
  }
`;

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

export default CreateCharacterAccordion;
