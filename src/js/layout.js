import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";

import { Home } from "./views/home";
import { Demo } from "./views/demo";
import { Single } from "./views/single";
import { CharacterDescription } from "./views/characterDescription";
import { PlanetDescription } from "./views/planetDescription";
import { StarShipDescription } from "./views/starShipDescription";
import injectContext from "./store/appContext";

import { Navbar } from "./component/navbar";
					