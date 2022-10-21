import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getDetail, getClean } from '../../Actions/index';
import { useEffect } from 'react';
import style from './Detail.module.css';


export default function Detail() {
    const dispatch = useDispatch()
    let { id } = useParams();



    useEffect(() => {
        dispatch(getDetail(id))
        dispatch(getClean())
    }, [dispatch, id])


    let details = useSelector((state) => state.detail);
    console.log(details)


    return (
        <div>
            <div>
                <Link to='/home'>
                    <button>Back</button>
                </Link>

                {
                    details.length > 0 ?
                        <div>
                            <h1>{details[0].name}</h1>
                            <img src={details[0].image} alt="not found" width="300px" height="400px" />
                            <h3>Peso: {details.length ? details[0].weight_min : "Cargando"} - {details.length ? details[0].weight_max : "Cargando"} kg.</h3>
                            <h3>Altura: {details.length ? details[0].height_min : "Cargando"} - {details.length ? details[0].height_max : "Cargando"} Cm.</h3>
                            <h3>Life: {details[0].life_span}</h3>
                            <h3>Temperaments: {details[0].temperaments}</h3>
                        </div>
                        :
                        <div className={style.divLoading } >
                            <p >Loading...</p>

                        </div>
                }
            </div>
        </div>
    )
}