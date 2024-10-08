import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const PlanetCard = () => {
    const { store, actions } = useContext(Context);
    const [planets, setPlanets] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const res = await fetch("https://swapi.dev/api/planets/");
            const data = await res.json();
            const planetsWithIds = data.results.map(planet => ({
                ...planet,
                id: getIdFromUrl(planet.url)
            }));
            setPlanets(planetsWithIds);  // Set the state with planetsWithIds
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
            {planets.map((planet, index) => (
                <div className="card" style={{ minWidth: "200px" }} key={planet.id}>
                    <img
                        src={`https://starwars-visualguide.com/assets/img/planets/${planet.id}.jpg`}
                        className="card-img-top"
                        alt={planet.name}
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = 'https://starwars-visualguide.com/assets/img/placeholder.jpg'
                        }}
                    />
                    <div className="card-body">
                        <h5 className="card-title text-dark">{planet.name}</h5>
                        <button className="btn btn-primary" onClick={() => handleFavorites(planet.name)}>
                            <i className="far fa-heart"></i>
                        </button>
                        <Link to={`planetDescription/${planet.id}`} className="btn btn-primary">Learn More</Link>
                    </div>
                </div>
            ))}
        </div>
    );
};