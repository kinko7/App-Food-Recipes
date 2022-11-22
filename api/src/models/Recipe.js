const {
  DataTypes
} = require( "sequelize" );
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = ( sequelize ) => {
  // defino el modelo
  return sequelize.define(
    "recipe", {
      
      id: {
        type: DataTypes.UUID
        , allowNull: false
        , primaryKey: true
       }
      , 
      name: {
        type: DataTypes.STRING
        , allowNull: false
      }, 
      summary: {
        type: DataTypes.TEXT
        , allowNull: false
      } 
      , 
      healthiness: {
        type: DataTypes.INTEGER
      }
      , 
      image: {
        type: DataTypes.STRING
      }
      , 
      steps: {
        type: DataTypes.TEXT
      }
      , 
   },
    {
      timestamps: false
    , }
  );
};
