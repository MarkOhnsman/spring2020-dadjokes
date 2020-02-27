import { dbContext } from "../db/DbContext";
import { BadRequest, UnAuthorized } from "../utils/Errors";

class JokesService {
  async findAll() {
    let jokes = await dbContext.Joke.find({}).populate(
      "creator",
      "name picture"
    );
    return jokes;
  }

  async create(body, email) {
    return await dbContext.Joke.create(body);
  }

  async edit(id, update, email) {
    let joke = await dbContext.Joke.findById(id);
    if (joke.creator != email) {
      throw new UnAuthorized();
    }
    // @ts-ignore
    joke.body = update.body;
    await joke.save();
    return joke;
  }

  async delete(id, email) {
    let joke = await dbContext.Joke.findById(id);
    if (joke.creator != email) {
      throw new UnAuthorized();
    }
    await dbContext.Joke.findByIdAndDelete(joke.id);
  }
}

export const jokesService = new JokesService();
