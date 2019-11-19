import React from "react";
import useCollapse from "react-collapsed";
import styled from "styled-components";
import ShowCharacters from "../ShowCharacters";

//Look to formik-demo & rich-editor ccss for conflicts
const Wrapper = styled.div``;
const Button = styled.button`
  display: block;
  margin: auto;
  background: lightblue;
  white-space: nowrap;
  text-align: center;

  :hover {
    background: red;
  }
`;

const ShowCharactersAccordion = npc => {
  const { getCollapseProps, getToggleProps, isOpen } = useCollapse();
  return (
    <Wrapper>
      <Button {...getToggleProps()}>
        {isOpen ? "Hide Character List" : "Show Character List"}
      </Button>
      <div {...getCollapseProps()}>
        <ShowCharacters />
      </div>
    </Wrapper>
  );
};

export default ShowCharactersAccordion;
