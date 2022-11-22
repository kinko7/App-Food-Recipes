require( "dotenv" )
.config( );
const {
  API_KEY
} = process.env;
const {
  v4: uuidv4
} = require( "uuid" );
const axios = require( "axios" );
const {
  Op
  , Model
} = require( "sequelize" );
const {
  Recipe
  , Diet,
  Recipe_Diet
} = require( "../db" );



const getApiInfo = async ( ) => {

  const apiUrl = await axios.get( `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100` )

  const apiFood = await apiUrl.data.results.map( recipe => {

    return {
      id: recipe.id
      , name: recipe.title
      , diets: recipe.diets
      , healthiness: recipe.healthScore
      , summary: recipe.summary.replace( /<[^>]*>?/g, "" )
      , image: recipe.image
      , steps: recipe.analyzedInstructions
      .map( ( e ) => e.steps.map( ( s ) => s.step ) )
      .flat( 2 )
      .join( "" )
    , };
  } );

  return apiFood; 

}

const getDbInfo = async ( ) => {
  return await Recipe.findAll( {
    include: {
      model: Diet
      , attributes: [ 'name' ]
      , through: {
        attributes: [ ]
      , }
    , }
  } )
}

const getAllInfo = async ( ) => {
  const apiInfo = await getApiInfo( );
  const dbInfo = await getDbInfo( );
  const infoTotal = await apiInfo.concat( dbInfo );
  return infoTotal

}
async function getAllRecipes( req, res ) {
  let recipesApi = await getAllInfo( );
  const {
    name
  } = req.query

  if ( name ) {
    let recipeName =await recipesApi.filter((e) => e.name.toLowerCase().includes(name.toLowerCase()));
      console.log("DD",recipesApi)
    return res.send(recipeName)

  } else {
   return res.send( recipesApi )
  }
}
async function getRecipeById( req, res ) {
  try {
    const { id } = req.params;
    if (id.includes("-")) {
      const dbData = await Recipe.findByPk(id, {
        include: {
          model: Diet,
          attributes: ["name"],
          through: {
            attributes: [],
          },
        },
      });
      return res.json(dbData);
    } else {
      let apiData = await axios.get(
        `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`
      );
      const {
        title,
        image,
        summary,
        healthScore,
        diets,
        analyzedInstructions,
      } = apiData.data;

      apiData = {
        name: title,
        image: image,
        summary: summary.replace(/<[^>]*>?/g, ""),
        healthiness: healthScore,
        diets: diets,
        steps: analyzedInstructions
          .map((e) => e.steps.map((s) => s.step))
          .flat(2)
          .join(""),
      };
      res.json(apiData);
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};



module.exports = {
  getRecipeById
  , getAllRecipes,

};
