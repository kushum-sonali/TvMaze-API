import React, {useEffect,useState} from "react";
import {  Route,Routes} from "react-router-dom";

import  Home from "./pages/Home";
import Show from "./pages/Show";


export const App = () => {


    return (
        <Routes>
        <Route  path="/" element={<Home  />} />
        <Route  path="/show/:id/:name" element={<Show />} />
        </Routes>
    );
    }

export default App;