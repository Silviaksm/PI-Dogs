import React from "react";
import { Link } from "react-router-dom";
import style from "./LandingPage.module.css";

export default function LandingPage(){
    return(
        <div className={style.divInit}>
            <div  className={style.divLetraBtn}>
            <h1 className={style.texto}>Welcome to my PI Dogs</h1>
            <Link to="/home">
                <button className={style.botonA}>Start</button>
            </Link>
            </div>
        </div>
    )
}