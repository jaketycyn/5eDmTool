import React from "react";
import ShowCharactersAccordion from "./Design/ShowCharactersAccordion";
import CreateCharacterAccordion from "./Design/CreateCharacterAccordion";

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
