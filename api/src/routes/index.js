const { Router } = require('express');
const axios = require('axios');
const {Dog, Temperament}= require('../db');
const {API_KEY}= process.env;


const router = Router();



const getApiInfo = async () => {
    const apiUrl = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);
    const apiInfo = await apiUrl.data.map(el => {
        let temperamentArray = [];
        if (el.temperament) {//pregunto que exista el temperamento y lo devuelvo en un arreglo
            temperamentArray = el.temperament.split(", ");
        }

        let heightArray = [];
        if (el.height.metric) {
            heightArray = el.height.metric.split(" - ");
        }

        let weightArray = [];
        if (el.weight.metric) {
            weightArray = el.weight.metric.split(" - ");
        }
        return {
            id: el.id,
            name: el.name,
            height: heightArray,
            weight: weightArray,
            temperaments: temperamentArray,
            life_span: el.life_span,
            image: el.image.url,
        }
    })
    return apiInfo;
}

const getDbInfo = async ()=>{
    return await Dog.findAll({
        include:{
            model: Temperament,
            attributes: ['name'],
            through:{
                attributes:[],
            },
        }
    })
};

const getAllDogs = async ()=>{
    let apiInfo = await getApiInfo();
    let dbInfo = await getDbInfo();
    const infoTotal = apiInfo.concat(dbInfo);
    return infoTotal;
}


router.get("/dogs", async(req, res) => {//esta funcion también podra recibir un nombre por medio de query
    // const name = req.query.name;
    const { name } = req.query;
    const allDogs = await getAllDogs();
    if (name) {
        const dog = allDogs.filter(d => d.name.toLowerCase().includes(name.toLowerCase()));//si el perro existe guardame sus parametros aca.
        dog.length ? res.status(200).send(dog) : res.status(404).send("Dog not found"); 
    } else {
        res.status(200).send(allDogs);
    }
});

router.get("/dogs/:id", async(req, res) => {//traer la info de un perro por su id, del modelo raza
    const { id } = req.params;
    const allDogs = await getAllDogs();
    const dog = allDogs.filter(el => el.id == id);
    if (dog.length) {
        res.status(200).json(dog);
    }else{
        res.status(404).send("Not found");
    }
});

router.get("/temperaments", async (req, res) => {
    const apiInfo2 = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);
    const temperaments = apiInfo2.data.map(t => t.temperament);
    const temps = temperaments.toString().split(",");
    temps.forEach(el => {
        let i = el.trim()
        Temperament.findOrCreate({
             where: { name: i }
        })
    })

    const allTemp = await Temperament.findAll();    
    res.send(allTemp);
});

router.post('/dogs', async (req,res)=>{
    let{ name, height,  weight, life_span, image,createdInDb, temperament }= req.body
    let dogCreate= await Dog.create({
        name, height,  weight, life_span, image, createdInDb
    })
    let temperamentDb= await Temperament.findAll({
        where:{ name: temperament}
    })
    dogCreate.addTemperaments(temperamentDb)
    res.send('Dog creado con exito')
})


module.exports = router;
