// const axios = require('axios');
// const {Dog, Temperament}= require('../db');
// require("dotenv").config();
// const { API_KEY } = process.env;


// const getApiInfo = async () => {
//     const apiUrl = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);
//     const apiInfo = await apiUrl.data.map(el => {
//         let temperamentArray = [];
//         if (el.temperament) {//pregunto que exista el temperamento y lo devuelvo en un arreglo
//             temperamentArray = el.temperament.split(" - ");
//         }

//         return {
//             id: el.id,
//             name: el.name,
//             height_min: el.height.metric.split(" - ")[0] && el.height.metric.split(" - ")[0],
//             height_max: el.height.metric.split(" - ")[1] && el.height.metric.split(" - ")[1],
//             weight_min: el.weight.metric.split(" - ")[0] && el.weight.metric.split(" - ")[0],
//             weight_max: el.weight.metric.split(" - ")[1] && el.weight.metric.split(" - ")[1],
//             temperaments: temperamentArray,
//             life_span_min: el.life_span.split(" - ")[0] && el.life_span.split(" - ")[0],
//             life_span_max: el.life_span.split(" - ")[1] && el.life_span.split(" - ")[1],
//             image: el.image.url,
//         }
//     })
//     return apiInfo;
// }

// const getDbInfo = async ()=>{
//     return await Dog.findAll({
//         include:{
//             model: Temperament,
//             attributes: ['name'],
//             through:{
//                 attributes:[],
//             },
//         }
//     })
// };

// const getAllDogs = async ()=>{
//     let apiInfo = await getApiInfo();
//     let dbInfo = await getDbInfo();
//     const infoTotal = apiInfo.concat(dbInfo);
//     return infoTotal;
// }


// const getDogs = async (req, res) => {
   
//     const { name } = req.query;
//     const allDogs = await getAllDogs();
//     if (name) {
//         const dog = allDogs.filter(d => d.name.toLowerCase().includes(name.toLowerCase()));
//         dog.length ? res.status(200).send(dog) : res.status(404).send("Dog not found"); 
//     } else {
//         res.status(200).send(allDogs);
//     }
// };

// const getDogsId = async(req, res) => {
//     const { id } = req.params;
//     const allDogs = await getAllDogs();
//     const dog = allDogs.filter(el => el.id == id);
//     if (dog.length) {
//         res.status(200).json(dog);
//     }else{
//         res.status(404).send("Not found");
//     }
// };



// const postDog = async (req,res)=>{
//     let{ name, min_height, max_height, min_weight, max_weight, life_span, image,createdInDb, temperament }= req.body

//     const arrayH= [];
//     const min = min_height;
//     const max = max_height;
//     arrayH.push(min,max)

//     const arrayW = []
//     const minW = min_weight;
//     const maxW = max_weight;
//     arrayW.push(minW, maxW)

//     let dogCreate= await Dog.create({
//         name, height: arrayH, weight: arrayW, life_span, image, createdInDb
//     })
//     let temperamentDb= await Temperament.findAll({
//         where:{ name: temperament}
//     })
//     dogCreate.addTemperaments(temperamentDb)
//     res.send('Dog creado con exito')
// }


// module.exports = {
//     getDogs,
//     getDogsId,
//     postDog,
// }
