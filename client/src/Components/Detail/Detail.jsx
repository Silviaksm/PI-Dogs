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
        <div className={style.uno}>
            <div >
                <Link to='/home'>
                    <button className={style.b}>Back</button>
                </Link>

                {
                    details.length > 0 ?
                        <div className={style.div}>
                            <h1 className={style.name}>{details[0].name}</h1>
                            <img className={style.img} src={details[0].image} alt="not found" width="600px" height="400px" />
                            <h3 className={style.h3}>Weigth: {details.length ? details[0].weight_min : "Loading"} - {details.length ? details[0].weight_max : "Loading"} kg.</h3>
                            <h3 className={style.h3}>Heigth: {details.length ? details[0].height_min : "Loading"} - {details.length ? details[0].height_max : "Loading"} Cm.</h3>
                            <h3 className={style.h3} >Life Span: {details.length ? details[0].life_span_min : "Loading"} - {details.length ? details[0].life_span_max :"loading"} </h3>
                            <h3>Temperaments:  {details[0].temperaments? details[0].temperaments.join(" - "): "Loading"}</h3>
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