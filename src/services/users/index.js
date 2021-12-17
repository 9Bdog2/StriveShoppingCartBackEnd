import express from "express";
import User from "../../db/models/User.js";

const usersRouter = express.Router();

usersRouter
  .get("/", async (req, res, next) => {
    try {
      const data = await User.findAll();
      res.send(data);
    } catch (error) {
      next(error);
    }
  })
  .post("/", async (req, res, next) => {
    try {
      const { name, lastName, email, age, country } = req.body;
      const data = await User.create({ name, lastName, email, age, country });
      res.send(data);
    } catch (error) {
      next(error);
    }
  });

usersRouter
  .get("/:id", async (req, res, next) => {
    try {
      const { id } = req.params;
      const data = await User.findByPk(id);
      res.send(data);
    } catch (error) {
      next(error);
    }
  })
  .put("/:id", async (req, res, next) => {
    try {
      const { id } = req.params;
      const { name, lastName, email, age, country } = req.body;
      const data = await User.update(
        { name, lastName, email, age, country },
        { where: { id } }
      );
      res.send(data);
    } catch (error) {
      next(error);
    }
  })
  .delete("/:id", async (req, res, next) => {
    try {
      const { id } = req.params;
      const data = await User.destroy({ where: { id } });
      res.send(data);
    } catch (error) {
      next(error);
    }
  });

export default usersRouter;
