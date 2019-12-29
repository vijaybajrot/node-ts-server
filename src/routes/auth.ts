import { Router } from "express";
import { AuthController } from "../controllers/AuthController";
import validateToken from "../middlewares/validate-token";

const router = Router();

router.get("/user", validateToken, AuthController.user);
router.post("/login", AuthController.login);

export default router;
