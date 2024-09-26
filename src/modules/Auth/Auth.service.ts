import { AppError } from "../../middlewares/errorHandler";
import { UserRepository } from "../../Respositories/userRepository";
import { IUser, LoginDto } from "../../types/types";
import { StatusCodes } from "http-status-codes";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export class UserService {
  constructor(private userRepository: UserRepository) {}

  async register(user: IUser): Promise<IUser> {
    const userExist = await this.userRepository.findByEmail(user.email);

    if (userExist)throw new AppError("Email already exist", StatusCodes.CONFLICT);

    return this.userRepository.addUser(user);
  }

  async login(user: LoginDto) {
    const userExist = await this.userRepository.findByEmail(user.email);

    if (!userExist)
      throw new AppError("Incorrect Email", StatusCodes.NOT_FOUND);

    const isMatch = await bcrypt.compare(user.password, userExist.password);

    if (!isMatch)
      throw new AppError("Invalid Credentials", StatusCodes.NOT_FOUND);

    const { _id, name, email, gender } = userExist;

    const token = jwt.sign(
      { _id, name, email, gender },
      process.env.TOKEN_SECRET_KEY!
    );

    return { token, user: { _id, name, email, gender } };
  }



}
