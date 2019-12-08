import { Router } from "express";
import { UserController } from "../controllers/UserController";

const router = Router();

router.get("/", UserController.getUsers);
router.get("/:id", UserController.getUserById);
router.post("/", UserController.createUser);

export default router;
