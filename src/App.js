import React, { useState } from "react";
import "./App.css";
import Fuse from "fuse.js";

import characters from "./Data.json";

function App() {
  const [query, updateQuery] = useState("");

  const fuse = new Fuse(characters, {
    keys: ["name", "company", "species"],
    includeScore: true,
  });

  const results = fuse.search(query);
  const characterResults = query
    ? results.map((character) => character.item)
    : characters;

  function onSearch({ currentTarget }) {
    updateQuery(currentTarget.value);
  }

  return (
    <>
      <header className="App-header">
        <div className="container">
          <h1>Products</h1>
        </div>
      </header>

      <main className="container">
        <ul className="characters">
          {characterResults.map((character) => {
            const { name, imgUrl } = character;
            return (
              <li key={name} className="character">
                <span
                  className="character-thumb"
                  style={{
                    backgroundImage: `url(${imgUrl})`,
                  }}
                />
                <ul className="character-meta">
                  <li>
                    <strong>Name:</strong> {name}
                  </li>
                </ul>
              </li>
            );
          })}
        </ul>
        <aside>
          <form className="search">
            <label>Search</label>
            <input type="text" value={query} onChange={onSearch} />
          </form>
        </aside>
      </main>
    </>
  );
}

export default App;
