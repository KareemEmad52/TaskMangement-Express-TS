import { Router } from "express";
import userRouter from "../modules/Auth/Auth.routes";
import taskRouter from "../modules/Tasks/tasks.routes"

const router = Router()

router.use('/users' , userRouter)
router.use('/tasks' , taskRouter)


export default router;