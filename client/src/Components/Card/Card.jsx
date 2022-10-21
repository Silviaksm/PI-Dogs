import React from "react";
import { Link } from "react-router-dom";
import style from "./Card.module.css";

export default function Card({image, name, temperaments, weight_min,weight_max, id}){
    return(
        <div className={style.container}>
            <div className={style.card}>
                <h3 className={style.text}>{name}</h3>
                <img src={image} alt="not found" whidth="180px" height="220px"/>
                <h4 className={style.text}>Temps: {temperaments}</h4>
                <h4 className={style.text}>Weight min: {weight_min} kg</h4>
                <h4 className={style.text}>Weight max: {weight_max} kg</h4>
                
                <Link to={"/dogs/"+ id}>
                    <p>Info</p>
                </Link>
            </div>
        </div>
    );
}