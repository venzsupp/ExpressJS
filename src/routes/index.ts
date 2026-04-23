import { Router } from "express";
import {saveUser, getUser, getUserById} from "../controllers/userController.js";

const router = Router();

router.get("/health", (req, res) => {
  res.json({
    message: "API Index"
  });
});

router.post("/user", saveUser);
router.get("/user", getUser);
router.get("/user/:userId", getUserById);

export default router;