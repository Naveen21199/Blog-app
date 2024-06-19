import { Router } from "express";
import {
  getAllUser,
  userLogin,
  userRegister,
} from "../controllers/user.controllers.js";
const router = Router();

//get all users
router.get("/all-users", getAllUser);
router.post("/register", userRegister);

router.post("/login", userLogin);

export default router;
