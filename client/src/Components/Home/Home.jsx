import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllDogs, orderByName, orderByWeight, filterBreed, filterTemper, getTemperaments } from "../../Actions";
import { Link } from "react-router-dom";
import Card from "../Card/Card";
import SearchBar from "../SearchBar/SearchBar";
import Paginated from "../Paginated/Paginated";
import style from "./Home.module.css";

export default function Home() {


    const dispatch = useDispatch();

    const allDogs = useSelector((state) => state.dogs);
    const allTemperaments= useSelector((state)=> state.temperaments);
    
    const [, setOrder] = useState('');

    const [currentPage, setCurrentPage] = useState(1);
    const [dogsPerPage] = useState(8);
    const lastDog = currentPage * dogsPerPage;
    const firstDog = lastDog - dogsPerPage;
    const currentDogs = allDogs.slice(firstDog, lastDog);

    const paginated = (pageNumbers) => { setCurrentPage(pageNumbers); }
   
    useEffect(() => {
        dispatch(getAllDogs())
        dispatch(getTemperaments())
    }, [dispatch]);

    function handleClick(e) {
        e.preventDefault();
        dispatch(getAllDogs());
        setCurrentPage(1)
    }

    function handleSort(e) {
        e.preventDefault();
        dispatch(orderByName(e.target.value))
        setCurrentPage(1)
        setOrder(`Order ${e.target.value}`)
    }

    function handleByWeight(e) {
        e.preventDefault();
        dispatch(orderByWeight(e.target.value))
        setCurrentPage(1)
        setOrder(`Order ${e.target.value}`)
    }

    function handleFilterBreed(e){
        e.preventDefault();
        dispatch(filterBreed(e.target.value))
        setCurrentPage(1)
    }

    function handleFilterTemps(e){
        e.preventDefault();
        dispatch(filterTemper(e.target.value))
        setCurrentPage(1)
    }
    


    return (
        <div className={style.divOne}>
            <Link to="/dogs" className={style.act}>Create New Dog</Link>
            
            <button className={style.select} onClick={e => { handleClick(e) }}>Reset</button>
            <div className={style.selects}>
                <select className={style.select} onChange={e => handleSort(e)}>
                    <option  disabled selected defaultValue> Name</option>
                    <option value="acs">A-Z</option>
                    <option value="desc">Z-A</option>
                </select>
                <select className={style.select} onChange={e => handleByWeight(e)}>
                <option value='all'>Weight</option>
                <option value="max_weight">Max</option>
                <option value="min_weight">Min</option>
                </select>
                <select className={style.select}onChange={e => handleFilterBreed(e)}>
                    <option disabled selected defaultValue>Breed</option>
                    <option value="all">All</option>
                    <option value="created">Created</option>
                </select>
                <select className={style.select} onChange={e => handleFilterTemps(e)}>
                <option value hidden >Tempers</option>
                  
                  {
                    allTemperaments?.map(e => (
                        <option value={e}  key={e}>{e}</option>
                    ))
                  }
                </select>
            </div>
            <SearchBar 
            setCurrentPage={setCurrentPage}/>

            <Paginated
            dogsPerPage={dogsPerPage}
            setCurrentPage={setCurrentPage}
            allDogs={allDogs.length}
            paginated={paginated}
            currentPage={currentPage}
            />

            {
                currentDogs?.map((el) =>{
                    return(
                        <div className={style.divCards} key={el.id}>
                            <Card
                            name={el.name}
                            temperaments={el.temperaments}
                            weight_min={el.weight_min}
                            weight_max={el.weight_max}
                            image={el.image}
                            id={el.id}
                            createInDb={el.createInDb}/>
                        </div>
                       
                    )
                })
                
            }


        </div>
    )



}