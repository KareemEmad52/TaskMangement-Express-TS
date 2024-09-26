import { model, Schema } from "mongoose";
import { IUser, UserGender } from "../../types/types";
import bcrypt from "bcrypt";

const schema = new Schema<IUser>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique:true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    enum: UserGender,
    required: true,
  },
});

schema.pre("save", function (next) {
  const user = this;
  let newPass: string = "";

  if (!user.isModified("password")) return next();

  if (user.isModified("password")) {
    newPass = bcrypt.hashSync(user.password, 5);
  }

  user.password = newPass;
  next();
});

export const UserModel = model<IUser>("user", schema);
