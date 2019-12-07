import React from "react";
import styled from "styled-components";
import CharacterBackgroundAccordion from "./CharacterBackgroundAccordion";
import { db } from "../Firebase";

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
    <NPCNameInfo>
      {npc.npcFirstName} {npc.npcLastName}
      <DeleteButton onClick={deleteCharacter}>X</DeleteButton>
    </NPCNameInfo>
    <NPCInfo>
      {npc.npcRace} {" - "}
      {npc.npcProfession}
    </NPCInfo>
    <NPCProfession />
    <BackgroundInfo />
    <CharacterBackgroundAccordion {...npc} />
  </Main>
);

//Look to formik-demo & rich-editor ccss for conflicts
const Main = styled.div`
  margin: 3em auto;
  background: black;

  width: 70%;
  height: 100%;

  border-radius: 14px;
  box-shadow: 0px 0px 8px #ccc;
  padding: 4px 16px 20px 16px;
`;

const NPCNameInfo = styled.h2`
  color: white;
  font-weight: 600;
  margin: 10px 20px;
  text-align: center;
  justify-content: space-between;
`;

const NPCInfo = styled.p`
  color: white;
  font-weight: 600;
  margin: 10px 20px;
  text-align: center;
  text-transform: capitalize;
`;

const NPCProfession = styled.p`
  color: white;
  font-weight: 400;
  margin: 10px 20px;
  text-align: center;
`;

const BackgroundInfo = styled.div`
  display: flex;
  color: white;
  font-weight: 400;
  margin: 10px 20px;
  text-align: center;
  justify-content: center;
`;

const DeleteButton = styled.button`
  background: white;
  border: 2px solid #494949 !important;

  transition: all 0.4s ease 0s;

  :hover {
    background: #b80202;
    border-color: #b80202;
    transition: all 0.4s ease 0s;
  }
`;

export default CharacterCard;
