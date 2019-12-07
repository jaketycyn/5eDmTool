import React from "react";
import useCollapse from "react-collapsed";
import styled from "styled-components";

//Look to formik-demo & rich-editor ccss for conflicts

const CharacterBackgroundAccordion = npc => {
  const { getCollapseProps, getToggleProps, isOpen } = useCollapse();
  return (
    <Wrapper>
      <Button {...getToggleProps()}>{isOpen ? "Collapse" : "Expand"}</Button>
      <div {...getCollapseProps()}>
        <HiddenContent dangerouslySetInnerHTML={{ __html: npc.editorState }} />
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: purple;
`;

const Button = styled.button`
  display: flex;
  position: static;
  background: #ffffff;
  color: #494949 !important;
  font-size: 0.8em;
  font-weight: 700;
  margin: 10px auto;
  padding: 0.5em;
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

const HiddenContent = styled.div`
  background: pink;
`;

export default CharacterBackgroundAccordion;
