import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext";
export const PlanetDescription = () => {
    const { store, actions } = useContext(Context);
    const { id } = useParams();
    const [planet, setPlanet] = useState([]);
    console.log(id);
    useEffect(() => {
        async function fetchData() {
            const res = await fetch("https://swapi.dev/api/planets/" + id);
            const data = await res.json();
            setPlanet(data);
        }
        fetchData();
    }, []);
    return (
        <div className="container">
            <img
                src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`}
                className="card-img-left"
                alt="character"
                style={{ width: "150px", height: "auto" }}
            />
            <div className="row">{planet.name}</div>
            <div className="row">{planet.gravity}</div>
            <div className="row">{planet.climate}</div>
            <div className="row">{planet.terrain}</div>
            <div className="row">{planet.population}</div>
        </div>
    );
};