import { Schema } from "mongoose";

export var userSchema: Schema = new Schema({
  //createdAt: Date,
  name: String,
  password: String,
  // lastName: String
});