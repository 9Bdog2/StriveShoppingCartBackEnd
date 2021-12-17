import Express from "express";
import models from "../../db/models/index.js";
import  Op  from "sequelize";

const { Product, Review, User } = models;

const router = Express.Router();

router
  .route("/")
  .get(async (req, res, next) => {
    try {
      const products = await Product.findAll({
        include: [
          {
            model: models.Category,
            through: { attributes: [] },
            attributes: { exclude: ["createdAt", "updatedAt"] },

            where: {
              ...(req.query.category && {
                name: {
                  [Op.in]: req.category.name.split(","),
                },
              }),
            },
          },
          {
            model: Review,
            include: User,
          },
        ],
        where: {
          ...(req.query.search && {
            [Op.or]: [
              { title: { [Op.like]: `%${req.query.search}%` } },
              { description: { [Op.like]: `%${req.query.search}%` } },
            ],
          }),
        },
      });
      res.send(products);
    } catch (error) {
      console.log(error);
      next(error);
    }
  })
  .post(async (req, res, next) => {
    try {
      const data = await Product.create(req.body);
      res.send(data);
    } catch (error) {
      console.log(error);
      next(error);
    }
  });

router
  .route("/:id")
  .get(async (req, res, next) => {
    try {
      const author = await Product.findByPk(req.params.id);
      res.send(author);
    } catch (error) {
      console.log(error);
      next(error);
    }
  })
  .put(async (req, res, next) => {
    try {
      delete req.body.email;
      delete req.body.id;
      const newProduct = await Product.update(
        { ...req.body },
        {
          where: {
            id: req.params.id,
          },
          returning: true,
        }
      );
      res.send(newProduct[1][0]);
    } catch (error) {
      console.log(error);
      next(error);
    }
  })
  .delete(async (req, res, next) => {
    try {
      const rows = await Product.destroy({
        where: {
          id: req.params.id,
        },
      });
      res.send({ rows });
    } catch (error) {
      console.log(error);
      next(error);
    }
  });

export default router;
