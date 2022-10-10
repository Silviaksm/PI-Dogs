require("dotenv").config();
const { Router } = require('express');
const axios = require('axios');
 const { API_KEY } = process.env;
const { Dog, Temperament } = require('../db');
const { getAllDogs } = require('../Controllers/controllers');
const router = Router();



router.get("/", async(req, res) => {//esta funcion también podra recibir un nombre por medio de query
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


// router.get("/:id", async (req, res) => {
//     if (id) {
//         let dog = await Dog.findOne({
//             where: {
//                 id
//             },
//             include: {
//                 model: Temperament,
//                 attributes: ["name"],
//                 through: {
//                     attributes: []
//                 },
//             }
//         });
//         if (dog) {
//             return res.send(dog)
//         } else {
//             return res.status(404).send("Not Found");
//         }
//     }
// })





module.exports = router;
