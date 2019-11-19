import React from "react";
import CharacterCreation from "./CharacterCreation";
import ShowCharactersAccordion from "./Design/ShowCharactersAccordion";
import CreateCharacterAccordion from "./Design/CreateCharacterAccordion";

function App() {
  return (
    <div className="App">
      <CreateCharacterAccordion />
      <ShowCharactersAccordion />
    </div>
  );
}

export default App;
