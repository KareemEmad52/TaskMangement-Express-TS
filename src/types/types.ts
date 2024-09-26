import { Document, Types } from "mongoose";

export enum UserGender {
    MALE = "male",
    FEMALE = "female",
}

export interface IUser extends Document {
    email: string;
    password: string;
    name: string,
    gender: UserGender;
}

export interface Task extends Document {
    title:string;
    description: string;
    status:string;
    createdBy: Types.ObjectId;
    deadline: string;
    startingDate: string
}

export interface TaskDTO {
    title:string;
    description: string;
    status:string;
    deadline: Date;
    createdBy: string;
    startingTime: Date
}

export interface LoginDto {
    email: string;
    password: string;
}

export enum StatusEnums {
    COMPLETED = 'completed',
    IN_PROGRESS = 'in-progress'
}