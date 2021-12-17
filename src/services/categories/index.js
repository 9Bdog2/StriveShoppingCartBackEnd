import express from "express";
import Category from "../../db/models/index.js";

const categoryRouter = express.Router();

categoryRouter
  .get("/", async (req, res, next) => {
    try {
      const data = await Category.findAll();
      res.send(data);
    } catch (error) {
      next(error);
    }
  })
  .post("/", async (req, res, next) => {
    try {
      const { name } = req.body;
      const data = await Category.create({ name });
      res.send(name);
    } catch (error) {
      next(error);
    }
  });

categoryRouter
  .get("/:id", async (req, res, next) => {
    try {
      const { id } = req.params;
      const data = await Category.findByPk(id);
      res.send(data);
    } catch (error) {
      next(error);
    }
  })
  .put("/:id", async (req, res, next) => {
    try {
      const { id } = req.params;
      const { name } = req.body;
      const data = await Category.update({ name }, { where: { id } });
      res.send(data);
    } catch (error) {
      next(error);
    }
  })
  .delete("/:id", async (req, res, next) => {
    try {
      const { id } = req.params;
      const data = await Category.destroy({ where: { id } });
      res.send(data);
    } catch (error) {
      next(error);
    }
  });

export default categoryRouter;
