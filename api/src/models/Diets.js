const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define( 'diet', { 
  
  name: {
      type: DataTypes.STRING,
      allowNull: false,
  },
}, 
{ timestamps: false })
}
 
 