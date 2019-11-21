import React from "react";
import ShowCharactersAccordion from "./Design/ShowCharactersAccordion";
import CreateCharacterAccordion from "./Design/CreateCharacterAccordion";
import CCharacterCreation from "./CCharacterCreation";
import OldRandomization from "./OldRandomization";

function App() {
  return (
    <div className="App">
      {/* <OldRandomization /> */}
      <CreateCharacterAccordion />
      <ShowCharactersAccordion />
    </div>
  );
}

export default App;
