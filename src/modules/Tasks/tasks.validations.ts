import * as yup from "yup";
import { StatusEnums, TaskDTO } from "../../types/types";

export const addTaskSchema = yup.object({
  body: yup
    .object<TaskDTO>({
      title: yup
        .string()
        .max(50, "title must be at most 50 charcters")
        .required("title is required"),
      description: yup
        .string()
        .max(500, "description must be less than 500 character")
        .required("description is required"),
      status: yup
        .string()
        .oneOf([StatusEnums.IN_PROGRESS, StatusEnums.COMPLETED])
        .required(),
      deadline: yup
        .string()
        // 
        .datetime()
        .required(),
      startingDate: yup
        .string()
        .datetime()
        .required(),
    })
    .noUnknown(true, "Unknown field: ${unknown}"),
  headers: yup.object({
    token: yup.string().required(),
  }),
  params: yup.object(),
});

export const getUserTasksSchema = yup.object({
  body: yup.object(),
  headers: yup.object({
    token: yup.string().required(),
  }),
  params: yup.object(),
});

export const updateTaskSchema = yup.object({
  body: yup
    .object({
      title: yup
        .string()
        .max(50, "title must be at most 50 charcters")
        .optional(),
      description: yup
        .string()
        .max(500, "description must be less than 500 character")
        .optional(),
      status: yup
        .string()
        .oneOf([StatusEnums.IN_PROGRESS, StatusEnums.COMPLETED])
        .optional(),
      deadline: yup
        .string()
        .matches(
          /([0-9]{1,2})-([0-9]{1,2})-([0-9]{4})/,
          "must be matching dd-mm-yyyy"
        )
        .optional(),
      startingDate: yup
        .string()
        .matches(
          /([0-9]{1,2})-([0-9]{1,2})-([0-9]{4})/,
          "must be matching dd-mm-yyyy"
        )
        .optional(),
    })
    .noUnknown(true, "Unknown field: ${unknown}"),
  headers: yup.object({
    token: yup.string().required(),
  }),
  params: yup.object({
    taskId: yup.string().required(),
  }),
});


export const deleteTaskSchema = yup.object({
  body: yup
    .object()
    .noUnknown(true, "Unknown field: ${unknown}"),
  headers: yup.object({
    token: yup.string().required(),
  }),
  params: yup.object({
    taskId: yup.string().required(),
  }),
});