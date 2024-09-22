import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { Context } from "../store/appContext";

export const CharacterCard = () => {
  const { store, actions } = useContext(Context);
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("https://swapi.dev/api/people/");
      const data = await res.json();
      // Add ID to each character
      const charactersWithIds = data.results.map(character => ({
        ...character,
        id: getIdFromUrl(character.url)
      }));
      setCharacters(charactersWithIds);
    }
    fetchData();
  }, []);

  // Function to extract ID from URL
  const getIdFromUrl = (url) => {
    const matches = url.match(/\/(\d+)\/$/);
    return matches ? matches[1] : null;
  };

  function handleFavorites(name) {
    store.favorites.includes(name) ? actions.removeFromFavorites(name) : actions.addToFavorites(name);
  }

  return (
    <div className="container d-flex col-10 overflow-auto mt-5 mx-auto">
      {characters?.map((character, index) => (
        <div className="card" style={{ minWidth: "200px" }} key={index}>
          <img
            src={`https://starwars-visualguide.com/assets/img/characters/${character.id}.jpg`}
            className="card-img-top"
            alt={character.name}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://starwars-visualguide.com/assets/img/placeholder.jpg'
            }}
          />
          <div className="card-body">
            <h5 className="card-title text-dark">{character.name}</h5>
            <button className="btn btn-primary" onClick={() => handleFavorites(character.name)}>
              <i className="far fa-heart"></i>
            </button>
            <Link to={`characterDescription/${character.id}`} className="btn btn-primary">Learn More</Link>
          </div>
        </div>
      ))}
    </div>
  );
};