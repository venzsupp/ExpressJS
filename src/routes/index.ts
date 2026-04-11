import { Router } from "express";
import {saveUser, getUser} from "../controllers/userController.js";

const router = Router();

router.get("/health", (req, res) => {
  res.json({
    message: "API Index"
  });
});

router.post("/user", saveUser);
router.get("/user", getUser);

export default router;