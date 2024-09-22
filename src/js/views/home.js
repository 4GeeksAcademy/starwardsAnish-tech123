import React from "react";
import rigoImage from "../../img/rigo-baby.jpg";
import { CharacterCard } from "../component/characterCard";
import { PlanetCard } from "../component/planetCard";
import { StarShipCard } from "../component/starShipCard";
import "../../styles/home.css";

export const Home = () => (
	<div data-bs-theme="dark"  className= "text-center mt-5">
		<CharacterCard />
		<PlanetCard />
		<StarShipCard />
	</div>
);