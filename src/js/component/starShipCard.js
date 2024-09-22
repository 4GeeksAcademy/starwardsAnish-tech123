import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const StarShipCard = () => {
    const { store, actions } = useContext(Context);
    const [starShips, setStarShips] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const res = await fetch("https://swapi.dev/api/starships/");
            const data = await res.json();
            const starShipsWithIds = data.results.map(starShip => ({
                ...starShip,
                id: getIdFromUrl(starShip.url)
            }));
            setStarShips(starShipsWithIds);
        }
        fetchData();
    }, []);

    function handleFavorites(name) {
        store.favorites.includes(name) ? actions.removeFromFavorites(name) : actions.addToFavorites(name);
    }

    // Function to extract ID from URL
    const getIdFromUrl = (url) => {
        const matches = url.match(/\/(\d+)\/$/);
        return matches ? matches[1] : null;
    };

    return (
        <div className="container d-flex col-10 overflow-auto mt-5 mx-auto">
            {starShips?.map((starShip) => (
                <div className="card" style={{ minWidth: "200px" }} key={starShip.id}>
                    <img
                        src={`https://starwars-visualguide.com/assets/img/starships/${starShip.id}.jpg`}
                        className="card-img-top"
                        alt={starShip.name}
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = 'https://starwars-visualguide.com/assets/img/placeholder.jpg'
                        }}
                    />
                    <div className="card-body">
                        <h5 className="card-title text-dark">{starShip.name}</h5>
                        <button className="btn btn-primary" onClick={() => handleFavorites(starShip.name)}>
                            <i className="far fa-heart"></i>
                        </button>
                        <Link to={`starShipDescription/${starShip.id}`} className="btn btn-primary">Learn More</Link>
                    </div>
                </div>
            ))}
        </div>
    );
};