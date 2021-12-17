import Product from "./Product.js";
import Review from "./Review.js";
import Category from "./Category.js";
import ArticleCategory from "./ArticleCategory.js";
import User from "./User.js";

//Product and Review as one to many relationship
Product.hasMany(Review, { onDelete: "CASCADE" });
Review.belongsTo(Product, { onDelete: "CASCADE" });

// Category and Product as many-to-many.
Category.belongsToMany(Product, {
  through: ArticleCategory,
  onDelete: "CASCADE",
});
Product.belongsToMany(Category, {
  through: ArticleCategory,
  onDelete: "CASCADE",
});
// User and Review as one-to-many.
User.hasMany(Review, { onDelete: "CASCADE" });
Review.belongsTo(User, { onDelete: "CASCADE" });

export default { Product, Review, Category, ArticleCategory, User };
