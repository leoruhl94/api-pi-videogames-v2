const { Genres } = require("../db");
const { Platforms } = require("../db");
const axios = require("axios");
const { API_KEY } = process.env;

// const getGenresApi = async () => {
//   let genresApi = await axios
//     .get(`https://api.rawg.io/api/genres?key=${API_KEY}`)
//     .then((response) => {
//       let genres = response.data.results.map((item) => {
//         return {
//           id: item.id,
//           name: item.name,
//         };
//       });
//       return genres;
//     });
//   genresApi.map((item) => {
//     let { id, name } = item;
//     Genres.findOrCreate({
//       where: {
//         id,
//         name,
//       },
//     }).catch((error) => {
//       console.error(error);
//     });
//   });
// };

const getPlatformsApi = async () => {
  let platformsApi = await axios
    .get(`https://api.rawg.io/api/platforms?key=${API_KEY}`)
    .then((response) => {
      let platforms = response.data.results.map((item) => {
        return {
          id: item.id,
          name: item.name,
        };
      });
      return platforms;
    });
  platformsApi.length &&
    platformsApi.map(async (item) => {
      let { id, name } = item;
      await Platforms.findOrCreate({
        where: {
          id,
          name,
        },
      }).catch((error) => {
        console.error(error);
      });
    });
};

// const getGenresApi = async () => {
//   try {
//     let genresApi = await axios.get(
//       `https://api.rawg.io/api/genres?key=${API_KEY}`
//     );
//     genresApi.data.results.map(async (item) => {
//       console.log(item);
//       await Genres.findOrCreate({
//         where: { id: item.id, name: item.name },
//       });
//     });
//   } catch (error) {
//     console.error(error);
//   }
// };

const getGenresApi = async () => {
  try {
    let genresApi = await axios.get(
      `https://api.rawg.io/api/genres?key=${API_KEY}`
    );
    for (const genre of genresApi.data.results) {
      await Genres.findOrCreate({
        where: { id: genre.id, name: genre.name },
      });
    }
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  getGenresApi,
  getPlatformsApi,
};
