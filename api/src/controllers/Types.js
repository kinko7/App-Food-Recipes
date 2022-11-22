const {
  Diet
} = require("../db");
const axios = require("axios");
const { API_KEY } = process.env;




let allDiets = [
  {name: "gluten free"},
  {name: "dairy free"},
  {name: "lacto ovo vegetarian"},
  {name: "vegan"},
  {name: "paleolithic"},
  {name: "primal"},
  {name: "pescatarian"},
  {name: "fodmap friendly"},
  {name: "whole 30"},
]

// const apiInfo = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`)

  // const recipesDiet = diets.map( el => el.diets);
  // const dietflat = recipesDiet.flat(Infinity); // aplano los arrays que tenga dentro
  // const dietfilter = new Set(dietflat) // lo filtro para que no se repitan
  // const dietsapi = dietfilter
  
  // dietsapi.forEach(el=>{
    //  await Diet.findOrCreate({
      //        where : {name : el}
      //    }) //los guardo en la base de datos
      
      // ;
      // const allDiets = await Diet.findAll();
      // res.send(allDiets);
      async function getTypes(req, res) {
        try {
          const response = await Diet.findAll();
          if (response.length > 0) return res.json(response);
          else {
            try {
              const dietDb = await Diet.bulkCreate(allDiets);
              return res.json(dietDb);
            } catch (err) {
              console.log(err);
            }
          }
        } catch (err) {
          console.log(err);
        }
      }






module.exports = {
  getTypes,
}

