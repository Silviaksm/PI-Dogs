import React from "react";
import { Link } from "react-router-dom";
import style from "./Card.module.css";

export default function Card({ image, name, temperaments, weight_min, weight_max, id }) {
    console.log({ temperaments })
    const temperament = temperaments.join(" - ")
    return (
        <div className={style.container}>
            <div className={style.card}>
                <h3 className={style.text}>{name}</h3>
                <img className={style.img} src={image} alt="not found" whidth="180px" height="220px" />
                <h4 className={style.temp}>Temperaments :  {temperament}</h4>
                <h4 className={style.h}>Weigth- Min : {weight_min} kg Max : {weight_max} kg</h4>
                

                <Link to={"/dogs/" + id} className={style.l} >
                    <button className={style.info}>More Info</button>
                </Link>
                <br></br>
            </div>
        </div>
    );
}