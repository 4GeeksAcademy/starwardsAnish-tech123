import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext";
export const CharacterDescription = () => {
    const { store, actions } = useContext(Context);
    const { id } = useParams();
    const [character, setCharacter] = useState([]);
    console.log(id);
    useEffect(() => {
        async function fetchData() {
            const res = await fetch("https://swapi.dev/api/people/" + id);
            const data = await res.json();
            setCharacter(data);
        }
        fetchData();
    }, []);
    return (
        <div className="container">
            <div className="card d-flex flex-row" style={{ width: "100%" }}>
                <img
                    src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`}
                    className="card-img-left"
                    alt="character"
                    style={{ width: "150px", height: "auto" }}
                />

                <div className="card-body">
                    <p className="card-text">
                        Some quick example text to build on the card title and make up the bulk of the card's content.
                    </p>
                    <div className="row">
                        <p> <strong>Name:</strong> {character.name} </p>
                    </div>
                    <div className="row">
                        <p><strong>Height:</strong> {character.height}</p>
                    </div>
                    <div className="row">
                        <strong>Hair Color:</strong> {character.hair_color}
                    </div>
                    <div className="row">
                        <strong>Eye Color:</strong> {character.eye_color}
                    </div>
                    <div className="row">
                        <strong>Gender:</strong> {character.gender}
                    </div>
                </div>
            </div>
        </div>
    );
};