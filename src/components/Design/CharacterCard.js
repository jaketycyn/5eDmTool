import React from "react";
import styled from "styled-components";
import CharacterBackgroundAccordion from "./CharacterBackgroundAccordion";
import { db } from "../Firebase";

//Look to formik-demo & rich-editor ccss for conflicts
const Main = styled.div`
  background: black;
  width: auto;
  height: 100%;
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

  console.log(characterID);
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
