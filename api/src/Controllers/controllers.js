
const axios = require('axios');
const { API_KEY } = process.env;
const {Dog, Temperament}= require('../db');


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





module.exports = {

    getApiInfo: getApiInfo,
    getDbInfo : getDbInfo,
    getAllDogs: getAllDogs

}