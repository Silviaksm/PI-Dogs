// const axios = require('axios');
// const {Temperament}= require('../db');
// const { API_KEY } = process.env;




// const getTemperaments= async (req, res) => {

//     const dbTemp = await Temperament.findAll();
//     const dbUtilInfo = dbTemp.map((e) => e.name);
//     try {
//       if (!dbTemp.length) {
//         let temp = [];
//         const apiData = await axios.get('https://api.thedogapi.com/v1/breeds');
//         const apiTemperaments = apiData.data.map(e => e.temperament).join(', ').split(', ')
//         apiTemperaments.map((e) => {
//             if (!temp.includes(e) && e !== "") {
//                 temp.push(e)
//             }
          
//         })
//         temp.forEach((e) => {
//           Temperament.findOrCreate({
//             where: { name: e },
//           });
//         });
//         const dbTemps = await Temperament.findAll();
//         const utilInfo = dbTemps.map((e) => e.name);
//         res.status(200).send(utilInfo);
//       } else {
//         res.status(200).send(dbUtilInfo);
//       }
//     } catch (error) {
//       res.status(400).send("Temperament error");
//     }
//     };


//     module.exports={
//         getTemperaments,
//     } 
    