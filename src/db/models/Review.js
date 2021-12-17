import sequelize from "../index.js";
import x from "sequelize";

const { DataTypes } = x;

const Review = sequelize.define("review", {
  id: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    autoIncrement: true,
  },
  text: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  username: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  productId: {
    type: DataTypes.INTEGER,
    references: {
      model: "products",
      key: "id",
    },
  },
});

export default Review
