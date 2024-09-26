import { Request, Response } from "express";
import { StatusCodes, getReasonPhrase, getStatusCode } from "http-status-codes";
import { IUser, LoginDto } from "../../types/types";
import { UserService } from "./Auth.service";
import { UserRepository } from "../../Respositories/userRepository";
import { CatchAsyncError } from "../../middlewares/errorHandler";

const userService = new UserService(new UserRepository());

export const register = CatchAsyncError(async (req: Request<{}, {}, IUser>, res: Response) => {
    const newUser = await userService.register(req.body);
    res.status(StatusCodes.CREATED).json({message: getReasonPhrase(StatusCodes.CREATED),status: getStatusCode(getReasonPhrase(StatusCodes.CREATED)),data: newUser,
    });
  });

export const login = CatchAsyncError(async (req: Request<{}, {}, LoginDto>, res: Response) => {
    const data = await userService.login(req.body);
    res.status(StatusCodes.OK).json({message: getReasonPhrase(StatusCodes.OK),status: getStatusCode(getReasonPhrase(StatusCodes.OK)),data
    });
  });
