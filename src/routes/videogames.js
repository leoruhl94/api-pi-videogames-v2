const { Router } = require('express');
const router = Router();
const axios = require('axios') 
const { Videogames, Genres } = require('../db')
const { API_KEY } = process.env;
const { Op } = require('sequelize');


router.get('/', (req, res, next) => {
    const { name } = req.query;
    let vgApi_1 = axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page_size=40&page=${1}`);
    let vgApi_2 = axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page_size=40&page=${2}`);
    let vgApi_3 = axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page_size=40&page=${3}`);
    let searchedApi = axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&search=${name}`);
    let videogamesDb = Videogames.findAll({include: Genres});
    let findGamesDb = Videogames.findAll({ include: Genres, where:{ name: {
        [Op.iLike]: "%" + name + "%"
    }}});

   
    if(name){
        Promise.all([searchedApi, findGamesDb])
        .then((response) => {
            let gamesFiltered = [];
            response.map(item => item.data? gamesFiltered.push(...item.data.results) : gamesFiltered.push(...item))
            gamesFiltered = gamesFiltered?.map(item => {
                return {
                    id: item.id,
                    name: item.name,
                    rating: item.rating,
                    image: item.background_image || item.image,
                    genres: item.genres?.map(x => x.name),
                    createdInDb: item.createdInDb || false,
                }
            })
            gamesFiltered = gamesFiltered.sort((a,b)=> {
                if(a.name.length < b.name.length) return -1;
                if(a.name.length > b.name.length) return 1;
                return 0;
            } )
            gamesFiltered.length ? res.json(gamesFiltered.slice(0,15))
            : res.status(200).json([{error: true, msj:`No hay resulados para: ${name}`}])
        })
        .catch((error) => {
            next(error);
        })
      
              
    } else {
        Promise.all([vgApi_1, vgApi_2, vgApi_3, videogamesDb])
        .then((response) => {
            let gamesApi = [];
            response.map(item => item.data? gamesApi.push(...item.data.results): gamesApi.push(...item))
            let videogamesFilteredApi = gamesApi.map(item=> {
                return{
                    id: item.id,
                    name: item.name,
                    rating: item.rating,
                    image: item.background_image || item.image,
                    genres: item.genres?.map(x => x.name),
                    createdInDb: item.createdInDb || false,
                }
            })

            videogamesFilteredApi = videogamesFilteredApi.sort((a,b)=> {
                return a.name.toLowerCase().localeCompare(b.name.toLowerCase())
            })
            res.json(videogamesFilteredApi)
        })
        .catch((error) => {
            next(error);
        })
    }
});


module.exports = router;
