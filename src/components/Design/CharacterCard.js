import React from "react";
import styled from "styled-components";
import CharacterBackgroundAccordion from "./CharacterBackgroundAccordion";
import { db } from "../Firebase";

//Look to formik-demo & rich-editor ccss for conflicts
const Main = styled.div`
  background: black;
  width: auto;
  height: 100%;
  margin: 12px 0px;
  border-radius: 14px;
  box-shadow: 0px 0px 8px #ccc;
  padding: 4px 16px 20px 16px;
`;

const TitleInfo = styled.h2`
  color: green;
  font-weight: 600;
  margin: 10px 20px;
  text-align: center;
  justify-content: space-between;
`;

const BackgroundInfo = styled.div`
  color: white;
  font-weight: 400;
  margin: 10px 20px;
  text-align: center;
`;

const DeleteButton = styled.button`
  background: red;
`;
const deleteCharacter = e => {
  const characterID = e.target.parentElement.parentElement.id;
  // db.collection("Npc")
  //   .doc(characterID)
  //   .delete()
  //   .then(function() {
  //     console.log("Document successfully deleted!");
  //   })
  //   .catch(function(error) {
  //     console.error("Error removing document: ", error);
  //   });
  window.confirm("Do you wish to permanetly delete this item?")
    ? db
        .collection("Npc")
        .doc(characterID)
        .delete()
    : null;
};

const CharacterCard = npc => (
  <Main id={npc.id}>
    <TitleInfo>
      {npc.npcName} ({npc.npcRace} {"  "}
      {npc.npcProfession})
      <DeleteButton onClick={deleteCharacter}>X</DeleteButton>
    </TitleInfo>
    <BackgroundInfo>
      <CharacterBackgroundAccordion {...npc} />
    </BackgroundInfo>
  </Main>
);

export default CharacterCard;
