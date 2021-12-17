import sequelize from "../index.js";
import s from "sequelize";

const { DataTypes } = s;

const ArticleCategory = sequelize.define(
  "article_category",
  {},
  {
    timestamps: false,
  }
);

export default ArticleCategory;
