import { model, Schema } from "mongoose";
import { StatusEnums, Task } from "../../types/types";
import { string } from "yup";

const schema = new Schema<Task>({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: StatusEnums,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  startingDate: {
    type: String,
    required: true,
  },
  deadline: {
    type: String,
    required: true,
  },
});

export const taskModel = model<Task>("task", schema);
