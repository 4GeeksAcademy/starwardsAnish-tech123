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
            setCharacters(data.results);
        }
        fetchData();
    }, []);
    
	return (
		<div className="container d-flex col-10 overflow-auto mt-5 mx-auto">
			{characters?.map((character, index) => (
                <div className="card" style={{minWidth:"200px"}} key={index}>
                    {console.log(character.name)}
                <img src="..." className="card-img-top" alt="..."/>
                <div className="card-body">
                <h5 className="card-title text-dark">{character.name}</h5>
                  
                  <a href="#" className="btn btn-primary">Learn More</a>
                </div>
              </div>
            )) }
		</div>
	);
};
