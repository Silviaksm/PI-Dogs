import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { postDog, getAllDogs } from '../../Actions';
import style from './DogCreate.module.css';

function validate(input){
    let errors={}
    if (!input.name) {
        errors.name = 'Please, write a breed name'
    }
    else if(!input.min_height){
        errors.min_height = 'Please, complete'
    }
    else if(!input.max_height){
        errors.max_height = 'Please, complete'
    }
    else if(!input.min_weight){
        errors.min_weight = 'Please, complete'
    }
    else if(!input.max_weight){
        errors.max_weight ='Pease, complete'
    }
    else if(!input.life_span){
        errors.life_span = 'Please, complete'
    }
    else if(!input.image){
        errors.image = 'Please add a picture'
    }
    else if(!input.temperament){
        errors.temperament = 'Add a temperament'
    }
    return errors
}


export default function DogCreate() {
    const dispatch = useDispatch();
    const history = useHistory();
    const temperaments = useSelector((state) => state.temperaments);
    const [errors, setErrors] = useState({});

    const [input, setInput] = useState({
        name: "",
        min_height: "",
        max_height: "",
        min_weight: "",
        max_weight: "",
        life_span: "",
        image: "",
        temperament: [],
    })

    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
    }

    function handleSelect(e) {
        setInput({
            ...input,
            temperaments: [...input.temperament, e.target.value]
        })
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
    }

    function handleSubmit(e) {
        e.preventDefault();
        if(!input.name || !input.min_height || !input.max_height || !input.min_weight || !input.max_weight || !input.life_span || !input.image || !input.temperament){
            return alert("Complete")
        }else{
        dispatch(postDog(input))
        alert('Dog created succesfully')
        setInput({
            name: "",
            min_height: "",
            max_height: "",
            min_weight: "",
            max_weight: "",
            life_span: "",
            image: "",
            temperament: [],
        })
        history.push('/home')
    }
}

    function handleDelete(t) {
        setInput({
            ...input,
            temperaments: input.temperament.filter(e => e !== t)
        })
        
    }



    useEffect(() => {
        dispatch(getAllDogs())
    }, [dispatch])

    return (
        <div className={style.divOne}>
            <form className={style.create} onSubmit={(e) => handleSubmit(e)}>
                <div>
                    <Link to='/home'><button className='pendiente'>Back</button></Link>
                    <button className='pendiente' type='submit'>Create Dog</button>
                </div>
                <h1 className='{styles.title}'>Create Dogs</h1>
                <div>
                    <label className='{styles.Op}'>Name: </label>
                    <input type='text' value={input.name} name='name'placeholder="ej. pug" onChange={(e) => handleChange(e)} />
                    {errors.name && (<p className='pendiente'>{errors.name}</p>)}
                </div>
                <div>
                    <label className='p'> Min Height: </label>
                    <input type="text" value={input.min_height} name="min_height" placeholder="ej. 20"onChange={(e) => handleChange(e)} />
                    {errors.min_height && (<p className='pendiente'>{errors.min_height}</p>)}
                </div>
                <div>
                    <label className='p'>Max Heigth: </label>
                    <input type="text" value={input.max_height} name="max_height" placeholder="ej. 10"onChange={(e) => handleChange(e)} />
                    {errors.max_height && (<p className='pendiente'>{errors.max_height}</p>)}
                </div>
                <div>
                    <label className='p'>Min Weigth: </label>
                    <input type="text" value={input.min_weight} name="min_weight"placeholder="ej. 20" onChange={(e) => handleChange(e)} />
                    {errors.min_weight && (<p className='pendiente'>{errors.min_weight}</p>)}
                </div>
                <div>
                    <label className='p'>Max Wheigth: </label>
                    <input type="text" value={input.max_weight} name="max_weight" placeholder="ej. 50"onChange={(e) => handleChange(e)} />
                    {errors.max_weight && (<p className='pendiente'>{errors.max_weight}</p>)}
                </div>
                <div>
                    <label className='p'>Life Span: </label>
                    <input type="text" value={input.life_span} name="life_span" placeholder="ej. 10-20" onChange={(e) => handleChange(e)} />
                    {errors.life_span && (<p className='pendiente'>{errors.life_span}</p>)}
                </div>
                <div>
                    <label className='p'>Image: </label>
                    <input type="text" value={input.image} name="image" placeholder="Img URL" onChange={(e) => handleChange(e)} />
                    {errors.image && (<p className='pendiente'>{errors.image}</p>)}
                </div>


                {
                    input.temperament.map(t =>
                        <div>
                            <p className='pendiente'>{t}</p>
                            <button className='pendiente' key={t} onClick={() => handleDelete(t)}>x</button>
                        </div>)
                }

                <div>
                    <select className='p' onChange={handleSelect}>
                        <option disabled selected>Temperaments</option>
                        {temperaments.map((e)=> (
                            <option value={e} key={e}>{e}</option> 
                    
                           
                        ))}
                      
                    </select>
                    
                </div>


            </form>
            <div className={style.ima}>
                <img src="https://besthqwallpapers.com/Uploads/18-2-2019/80921/thumb2-french-bulldog-small-black-puppy-pets-cute-animals-dogs.jpg" alt="no" width="700px" height="400px" />
            </div>
        </div>
    )
}