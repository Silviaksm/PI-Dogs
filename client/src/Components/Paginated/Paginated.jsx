import React from "react";
import style from "./Paginated.module.css";

export default function Paginated({dogsPerPage, setCurrentPage, allDogs, paginated, currentPage}){
    const pageNumbers = []
    let numberPage=Math.ceil(allDogs / dogsPerPage);

    for (let i = 1; i <= Math.ceil(allDogs / dogsPerPage); i++){
        pageNumbers.push(i)
    }

    return (

        <div>
            <ul>
                <button disabled={currentPage === 1} className={style.Button} onClick={() => { 
                     setCurrentPage(currentPage === 1 ?
                        currentPage :
                        currentPage - 1
                        ) }
                    } >
                    Prev
                </button>
                {pageNumbers && pageNumbers.map((n) => (
                    <button disabled={currentPage === n}className={style.Btn} key={n} onClick={() => paginated(n)}> {n}</button>
                ))}
                <button disabled={currentPage === pageNumbers.length} className={style.Button} onClick={() =>
                     setCurrentPage(currentPage === numberPage ?
                        currentPage :
                        currentPage + 1
                        ) } >
                    Next
                </button>
            </ul>
        </div>
    )
}