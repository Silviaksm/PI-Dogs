import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { postDog, getAllDogs, getTemperaments } from '../../Actions';
import style from './DogCreate.module.css';

function validate(input) {
    let errors = {}
    if (!input.name) {
        errors.name = 'Please, write a breed name'
    }
    else if (!input.height_min) {
        errors.height_min = 'please complete this field'
    }
    else if (!input.height_max) {
        errors.height_max = 'please complete this field'
    }
    else if (!input.weight_min) {
        errors.weight_max  = 'please complete this field'
    }
    else if (!input.weight_max) {
        errors.weight_max = 'please complete this field'
    }
    else if (!input.life_span_min) {
        errors.life_span_min = 'please complete this field'
    }
    else if (!input.life_span_max) {
        errors.life_span_max = 'please complete this field'
    }
    else if (!input.image){
        errors.image = 'Agrefar imagen'
    }

    return errors
}


export default function DogCreate() {
    const dispatch = useDispatch();
    const history = useHistory();
    const tempers = useSelector((state) => state.temperaments);
    const [errors, setErrors] = useState({});

    const [input, setInput] = useState({
        name: "",
        height_min: "",
        height_max: "",
        weight_min: "",
        weight_max: "",
        life_span_min: "",
        life_span_max: "",
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
        if (!input.temperament.includes(e.target.value)) {
            setInput({
                ...input,
                temperament: [...input.temperament, e.target.value]
            })
        }

    }

    function handleSubmit(e) {
        e.preventDefault();
        const recotraError = validate(input)
        if (!input.name || !input.height_min || !input.height_max || !input.weight_min || !input.weight_max || !input.life_span_min || !input.life_span_max) {
            return alert("Please complete all fields")
        } else if (Object.values(recotraError).length !== 0 || !input.temperament.length) {
            alert("Please complete all fields")
        } else {
            dispatch(postDog(input))
            alert('Dog created succesfully')
            setInput({
                name: "",
                height_min: "",
                height_max: "",
                weight_min: "",
                weight_max: "",
                life_span_min: "",
                life_span_max: "",
                image: "",
                temperament: [],
            })
            history.push('/home')
        }
    }

    function handleDelete(t) {
        setInput({
            ...input,
            temperament: input.temperament.filter(e => e !== t)
        })

    }



    useEffect(() => {
        dispatch(getAllDogs())
        dispatch(getTemperaments())
        return()=> console.log("hola")
    }, [dispatch])

    return (
        <div className={style.divOne}>
            <form className={style.create} onSubmit={(e) => handleSubmit(e)}>
                <div>
                    <Link to='/home'><button className={style.divButtonOne}>Back</button></Link>
                    <button className={style.divButtontwo} type='submit'>Create Dog</button>
                </div>
                <h1 className='{styles.title}'>Create Dogs</h1>
                <div>
                    <label className={style.in}>Name: </label>
                    <input type='text' value={input.name} name='name' placeholder="ej. pug" className={style.name} onChange={(e) => handleChange(e)} />
                    {errors.name && (<p className='pendiente'>{errors.name}</p>)}
                </div>
                <div>
                    <label className={style.in}>Image: </label>
                    <input type="text" value={input.image} name="image" placeholder="Img URL" className={style.name} onChange={(e) => handleChange(e)} />
                    {errors.image && (<p className='pendiente'>{errors.image}</p>)}
                </div>
                <div>
                    <label className={style.in}> Min Height: </label>
                    <input type="text" value={input.min_height} name="height_min" placeholder="ej. 20" className={style.name} onChange={(e) => handleChange(e)} />
                    {errors.height_min && (<p className='pendiente'>{errors.height_min}</p>)}
                </div>
                <div>
                    <label className={style.in}>Max Height: </label>
                    <input type="text" value={input.max_height} name="height_max" placeholder="ej. 10" className={style.name} onChange={(e) => handleChange(e)} />
                    {errors.height_max && (<p className='pendiente'>{errors.height_max}</p>)}
                </div>
                <div>
                    <label className={style.in}>Min Weight: </label>
                    <input type="text" value={input.min_weight} name="weight_min" placeholder="ej. 20" className={style.name} onChange={(e) => handleChange(e)} />
                    {errors.weight_min && (<p className='pendiente'>{errors.weight_min}</p>)}
                </div>
                <div>
                    <label className={style.in}>Max Weight: </label>
                    <input type="text" value={input.max_weight} name="weight_max" placeholder="ej. 50" className={style.name} onChange={(e) => handleChange(e)} />
                    {errors.weight_max && (<p className='pendiente'>{errors.weight_max}</p>)}
                </div>
                <div>
                    <label className={style.in}>Life Span min: </label>
                    <input type="text" value={input.life_span_min} name="life_span_min" placeholder="ej. 10" className={style.name} onChange={(e) => handleChange(e)} />
                    {errors.life_span_min && (<p className='pendiente'>{errors.life_span_min}</p>)}
                </div>
                <div>
                    <label className={style.in}>Life Span max: </label>
                    <input type="text" value={input.life_span_max} name="life_span_max" placeholder="ej. 10" className={style.name} onChange={(e) => handleChange(e)} />
                    {errors.life_span_max && (<p className='pendiente'>{errors.life_span_max}</p>)}
                </div>





                <div>
                    <option disabled selected>Temperaments</option>
                    <select className={style.tem} onChange={(e) => handleSelect(e)}>


                        {tempers.map((e) => (
                            <option value={e} key={e}>{e}</option>


                        ))}

                    </select>
                    {/* <ul><li>{input.temperament.map(el => el+ ' ,')}</li></ul> */}

                </div>

                {
                    input.temperament.map(t =>
                        <div key={t}>
                            <p className='pendiente'>{t}</p>
                            <button className='pendiente'  onClick={() => handleDelete(t)}>x</button>
                        </div>)
                }


            </form>
            <div className={style.ima}>
                <img src="https://besthqwallpapers.com/Uploads/18-2-2019/80921/thumb2-french-bulldog-small-black-puppy-pets-cute-animals-dogs.jpg" alt="no" width="700px" height="400px" />
            </div>
        </div>
    )
}