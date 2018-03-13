
import { Document } from "mongoose";
import { Model } from "mongoose";

interface IUser {
  email?: string;
  firstName?: string;
  lastName?: string;
}

export interface IUserModel extends IUser, Document {
  //custom methods for your model would be defined here
}


export interface IModel {
  user: Model<IUserModel>;
}