import React from "react";
import {useState} from "react";
import { useDispatch } from "react-redux";
import { getByName } from "../../Actions";
// import {Link} from "react-router-dom";
import style from "./SearchBar.module.css";



export default function SearchBar({setCurrentPage}){
    const dispatch=useDispatch()
    const [name, setName]=useState("")

    function handlerChange(e) {
        e.preventDefault();
        setName(e.target.value);
        console.log(name);
        
    }

    function handlerSubmit(e) {
        e.preventDefault();
        dispatch(getByName(name));
        setCurrentPage(1)
        setName("");
       
    }

    return(
        <div className='p'>

        {/* <div className='p'>
            <Link to='/home' className={style.uno}>DOGS</Link>
            
        </div> */}
        <form onSubmit={(e) => handlerSubmit(e)}>
            <input
                type="text"
                placeholder="look for your dog..."
                value={name}
                onChange={(e) => handlerChange(e)}
                className={style.tres}
            />

            <button type="submit" className={style.dos}>Search</button>
        </form>

    </div>
    )
}