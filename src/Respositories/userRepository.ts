import { UserModel } from "../DB/models/user.model";
import { IUser } from "../types/types";

export class UserRepository {
  async findByEmail(email: string) {
    return UserModel.findOne({ email });
  }

  async addUser(user: IUser): Promise<IUser> {
    const newUser = new UserModel(user);
    return await newUser.save();
  }

  async findUserById (_id :string){
    return UserModel.findOne({ _id });
  }

  async findUserByCredentials(email: string, password: string) {   
    return await UserModel.findOne({ email, password });
  }
}
