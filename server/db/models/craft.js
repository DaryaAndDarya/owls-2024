// eslint-disable-next-line lines-around-directive
'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Craft extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User }) {
      this.belongsTo(User, { foreignKey: 'userId' });
    }
  }
  Craft.init(
    {
      title: DataTypes.STRING,
      desc: DataTypes.TEXT,
      url: DataTypes.STRING,
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Craft',
    },
  );
  return Craft;
};
