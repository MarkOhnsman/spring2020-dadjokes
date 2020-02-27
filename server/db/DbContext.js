import mongoose from "mongoose";
import ValueSchema from "../models/Value";
import ProfileSchema from "../models/Profile";
import JokeSchema from "../models/Joke";

class DbContext {
  Values = mongoose.model("Value", ValueSchema);
  Profile = mongoose.model("Profile", ProfileSchema);
  Joke = mongoose.model("Joke", JokeSchema);
}

export const dbContext = new DbContext();
