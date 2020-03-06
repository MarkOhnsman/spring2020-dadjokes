import express from "express";
import BaseController from "../utils/BaseController";
import { jokesService } from "../services/JokesService";
import auth0Provider from "@bcwdev/auth0provider";

export class JokesController extends BaseController {
  constructor() {
    super("api/jokes");
    this.router = express
      .Router()
      .get("", this.getAll)
      // NOTE: Beyond this point all routes require Authorization tokens (the user must be logged in)
      .use(auth0Provider.getAuthorizedUserInfo)
      .post("", this.create)
      .put("/:id", this.edit)
      .delete("/:id", this.delete);
  }
  async getAll(req, res, next) {
    try {
      let jokes = await jokesService.findAll();
      res.send(jokes);
    } catch (error) {
      next(error);
    }
  }
  async create(req, res, next) {
    try {
      // NOTE NEVER TRUST THE CLIENT TO ADD THE CREATOR ID
      req.body.creatorEmail = req.userInfo.email;
      let joke = await jokesService.create(req.body);
      res.send(joke);
    } catch (error) {
      next(error);
    }
  }

  async edit(req, res, next) {
    try {
      // NOTE NEVER TRUST THE CLIENT TO ADD THE CREATOR ID
      let joke = await jokesService.edit(
        req.params.id,
        req.body,
        req.userInfo.email
      );
      res.send(joke);
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      // NOTE NEVER TRUST THE CLIENT TO ADD THE CREATOR ID
      await jokesService.delete(req.params.id, req.userInfo.email);
      res.send("delorted");
    } catch (error) {
      next(error);
    }
  }
}
