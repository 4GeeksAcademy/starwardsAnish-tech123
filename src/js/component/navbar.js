import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export const Navbar = () => {
	const { store, actions } = useContext(Context);
	const [favorites, setFavorites] = useState([]);
	// setFavorites(store.favorites);
	useEffect(() => {
		setFavorites(store.favorites);
	}, [store.favorites]);
	return (
		<nav className="navbar navbar-dark bg-dark mb-3">
			<i className="fa-solid fa-jedi" style={{ color: "#51291f" }}></i>
			<Link to="/">
				<span className="navbar-brand mb-0 h1">Home</span>
			</Link>
			<div className="ml-auto">
				<div className="dropdown ">
					<button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
						Favorites
					</button>
					<ul className="dropdown-menu dropdown-menu-dark mr-2 dropdown-menu-end">
						{favorites.map((favorite, index) => (
							<li><a className="dropdown-item" key={index}>{favorite}</a><button onClick={() => actions.removeFromFavorites(favorite)}> X </button></li>
						))}

					</ul>
				</div>
			</div>
		</nav>
	);
};