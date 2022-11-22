const {
  Diet
  , Recipe
  , Recipe_Diet
} = require( "../db" );
const {
  v4: uuidv4
} = require( "uuid" );
const {
  Op
} = require( 'sequelize' )


async function addRecipe( req, res) {
  let { 
      name
      , summary
      , score
      , diets
      , healthiness
      , image
      , steps   

} = req.body

let recipeCreated = await Recipe.create({
    id:uuidv4(),
    name
    , summary
    , score
    , healthiness
    , steps
    ,image
    : image
    ? image
    :  "https://d320djwtwnl5uo.cloudfront.net/recetas/cover/lengu_ZD3bVmkQ8iTdnfGLw41PSOheWt0sHB.png"
   
});
let typeDietDb = await Diet.findAll({
    where : { name:diets }
})     

recipeCreated.addDiet(typeDietDb);
return res.send('RC')
}

module.exports = {
  addRecipe,

}
