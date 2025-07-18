'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class mapData extends Model {
    static associate(models) {
      // define association here
    }
  }

  mapData.init({
    id: {
      type: DataTypes.UUID, 
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    userId:{
      type:DataTypes.UUID,
      allowNull:false
    },
    start_location: {
      type: DataTypes.STRING,
      allowNull: false
    },
    destination: {
      type: DataTypes.STRING,
      allowNull: false
    },
    vehicle:{
      type:DataTypes.STRING,
      allowNull:false
    }
  }, {
    sequelize, 
    tableName: 'mapData',
  });

  return mapData; 
};
