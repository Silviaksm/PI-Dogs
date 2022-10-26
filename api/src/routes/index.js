const { Router } = require('express');
const axios = require('axios');
const { Dog, Temperament } = require('../db');
const { API_KEY } = process.env;


const router = Router();



const getApiInfo = async () => {
    try {
        const apiUrl = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);
        const apiInfo = apiUrl.data.map(el => {

            let temperamentArray = [];
            if (el.temperament) {//pregunto que exista el temperamento y lo devuelvo en un arreglo
                temperamentArray = el.temperament.split(", ");
            }

            return {
                id: el.id,
                name: el.name,
                height_min: el.height.metric.split(" - ")[0] && el.height.metric.split(" - ")[0],
                height_max: el.height.metric.split(" - ")[1] && el.height.metric.split(" - ")[1],
                weight_min: el.weight.metric.split(" - ")[0] && el.weight.metric.split(" - ")[0],
                weight_max: el.weight.metric.split(" - ")[1] && el.weight.metric.split(" - ")[1],
                temperaments: temperamentArray,
                life_span_min: el.life_span.split(" - ")[0] && el.life_span.split(" - ")[0],
                life_span_max: el.life_span.split(" - ")[1] && el.life_span.split(" - ")[1],
                image: el.image.url,

            }
        })

        return apiInfo;
    } catch (error) {
        console.log(error)
            ;
    }
}

const getDbInfo = async () => {
    const dbDog = await Dog.findAll({
        include: {
            model: Temperament,
            attributes: ['name'],
            through: {
                attributes: [],
            },
        }
    })
    const dogDb = dbDog.map((e) => {
        return {
            id: e.id,
            name: e.name,
            height_min: e.height_min,
            height_max: e.height_max,
            weight_min: e.weight_min,
            weight_max: e.weight_max,
            temperaments: e.temperaments.map((e) => e.name),
            life_span_min: e.life_span_min,
            life_span_max: e.life_span_max,
            image: e.image,
            createdInDb: true
        }
    })
    return dogDb
};

const getAllDogs = async () => {
    let apiInfo = await getApiInfo();
    let dbInfo = await getDbInfo();
    const infoTotal = apiInfo.concat(dbInfo);
    return infoTotal;
}


router.get("/dogs", async (req, res) => {

    const { name } = req.query;
    const allDogs = await getAllDogs();
    if (name) {
        const dog = allDogs.filter(d => d.name.toLowerCase().includes(name.toLowerCase()));
        dog.length ? res.status(200).send(dog) : res.status(404).send("Dog not found");
    } else {
        res.status(200).send(allDogs);
    }
});

router.get("/dogs/:id", async (req, res) => {
    const { id } = req.params;
    const allDogs = await getAllDogs();
    const dog = allDogs.filter(el => el.id == id);
    if (dog.length) {
        res.status(200).json(dog);
    } else {
        res.status(404).send("Not found");
    }
});

router.get("/temperaments", async (req, res) => {

    const dbTemp = await Temperament.findAll();
    const dbUtilInfo = dbTemp.map((e) => e.name);
    try {
        if (!dbTemp.length) {
            let temp = [];
            const apiData = await axios.get('https://api.thedogapi.com/v1/breeds');
            const apiTemperaments = apiData.data.map(e => e.temperament).join(', ').split(', ')
            apiTemperaments.map((e) => {
                if (!temp.includes(e) && e !== "") {
                    temp.push(e)
                }

            })
            temp.forEach((e) => {
                Temperament.findOrCreate({
                    where: { name: e },
                });
            });
            const dbTemps = await Temperament.findAll();
            const utilInfo = dbTemps.map((e) => e.name);
            res.status(200).send(utilInfo);
        } else {
            res.status(200).send(dbUtilInfo);
        }
    } catch (error) {
        res.status(400).send("Temperament error");
    }
});


router.post('/dogs', async (req, res) => {
    let { name, height_min, height_max, weight_min, weight_max, life_span_min, life_span_max, image, createdInDb, temperament } = req.body



    let dogCreate = await Dog.create({
        name, height_min, height_max, weight_min, weight_max, life_span_min, life_span_max, image, createdInDb, temperament
    })
    let temperamentDb = await Temperament.findAll({
        where: { name: temperament }
    })
    dogCreate.addTemperaments(temperamentDb)
    res.send('Dog creado con exito')
})




module.exports = router;
